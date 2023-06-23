// Compile and execute Java code

// importing packages
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const javaCompiler = async (req, res) => {
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

		// Save the code to a Java file
		const filename = 'Main.java';
		fs.writeFileSync(`${tempDir}/${filename}`, code);

		// Compile the Java code
		exec(`javac ${tempDir}/${filename}`, (compileError, compileStdout, compileStderr) => {
			if (compileError) {
				console.error(compileError);
				res.status(400).json({ output: compileStderr });
			} else {
				// Execute the compiled Java code
				exec(`java -cp ${tempDir} ${filename.substring(0, filename.lastIndexOf('.'))}`, (executeError, executeStdout, executeStderr) => {
					if (executeError) {
						console.error(executeError);
						res.status(500).json({ error: 'An error occurred while executing the code.' });
					} else {
						const output = executeStderr || executeStdout;
						res.json({ output });
					}

					// Remove the Java file
					fs.unlink(`${tempDir}/${filename}`, (error) => {
						if (error) throw new Error('Error while removing the Java file:', error);
					});
				});
			}
		});
	} catch (error) {
		console.error('Error while processing the request:', error);
		res.status(500).json({ error: 'An error occurred while processing the request.' });
	}
};

export default javaCompiler;
