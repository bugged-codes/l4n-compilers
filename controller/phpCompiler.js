// Compile and execute Java code

// importing packages
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const phpCompiler = async (req, res) => {
	try {
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

		// check for temp folder, if not available then create it
		const tempDir = path.join(__dirname, 'temp');
		if (!fs.existsSync(tempDir)) {
			fs.mkdir(tempDir, { recursive: true });
		}

		// Save the code to a PHP file

		const fileName = path.join(tempDir, 'temp.php');
		console.log('fileName is: ', fileName);
		fs.writeFileSync(fileName, code);

		// Compile the PHP code
		exec(`php ${fileName}`, (executionErr, stdOut, stdErr) => {
			if (executionErr) {
				console.error('error while execution', executionErr);
				res.status(400).json({ output: executionErr });
			} else {
				let output;
				stdOut ? (output = stdOut) : (output = stdErr);
				res.status(200).json({ output });
			}

			// Delete the temporary file
			fs.unlinkSync(fileName, (err) => {
				if (err) throw new Error('Error while removing the php file:', err);
			});
		});

		// // Return the output or error message
		// if (exitCode === 0) {
		// 	console.log('output is: ', stdout);
		// 	res.status(200).send({ output: stdout });
		// } else {
		// 	res.status(500).send({ error: stderr });
		// }
	} catch (error) {
		console.error('Error while processing the request:', error);
		res.status(500).json({ error: 'An error occurred while processing the request.' });
	}
};

export default phpCompiler;
