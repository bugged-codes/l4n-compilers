// * controller for executing code

// importing packages
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const codeExecutionController = async (req, res) => {
	try {
		const tempDir = path.join(__dirname, 'temp');
		if (!fs.existsSync(tempDir)) {
			fs.mkdirSync(tempDir, { recursive: true });
		}

		const { code, args, language } = req.body;
		let codeArgs;

		if (!code || !language) {
			res.status(400).json({ error: 'Code or language cannot be empty.' });
		}
		if (!args) {
			codeArgs = [];
		} else {
			codeArgs = [...args];
		}

		// Save the code to a Python file
		const filename = 'code.py';
		const pythonCode = Buffer.from(code).toString('utf-8');
		// console.log('python code is: ', pythonCode);
		fs.writeFileSync(`${tempDir}/${filename}`, pythonCode);

		// Execute the Python code
		exec(`python -m py_compile ${tempDir}/${filename}`, (syntaxError, stdout, stderr) => {
			if (syntaxError) {
				console.error(syntaxError);
				res.status(400).json({ error: 'Syntax error in the code.' });
			} else {
				exec(`python ${tempDir}/${filename}`, (executeError, executeStdout, executeStderr) => {
					if (executeError) {
						console.error(executeError);
						res.status(500).json({ error: 'An error occurred while executing the code.' });
					} else {
						const output = executeStderr || executeStdout;
						console.log('output is: ', output);
						res.status(200).json({ output });
					}

					// Remove the Python file
					fs.unlinkSync(`${tempDir}/${filename}`, (err) => {
						if (err) throw new Error('Error while removing python file.');
					});
				});
			}
		});
	} catch (error) {
		console.error('Error while processing the request:', error);
		res.status(500).json({ error: 'An error occurred while processing the request.' });
	}
};

export default codeExecutionController;
