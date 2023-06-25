// Compile and execute C++ code

// importing packages
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const cppCompiler = async (req, res) => {
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

		// Sanitize the code input
		const sanitizedCode = code.trim();
		// console.log('sanitized code is: ', sanitizedCode);

		if (!sanitizedCode) {
			return res.status(400).json({ error: 'No code provided' });
		}

		const tempDir = path.join(__dirname, 'temp');
		// check for temp folder, if not available then create it
		if (!fs.existsSync(tempDir)) {
			fs.mkdir(tempDir, { recursive: true });
		}

		console.log('tempDir', tempDir);

		// Generate a random file name for the C++ program
		const fileName = `program_${Date.now()}.cpp`;
		console.log('fileName', fileName);
		const filePath = path.join(tempDir, fileName);
		console.log('filePath', filePath);

		// Save the C++ code to a file
		fs.writeFileSync(filePath, sanitizedCode, (writeErr) => {
			if (writeErr) {
				console.error(`Error writing code to file: ${writeErr}`);
				return res.status(500).json({ error: 'Error saving code' });
			}
		});

		// Compile the program using the C++ compiler (e.g., g++)
		exec(`g++ ${filePath} -o ${filePath}.exe`, (compileErr) => {
			if (compileErr) {
				console.error(`Compilation error: ${compileErr}`);
				return res.status(500).json({ error: 'Compilation error' });
			}
			// Execute the compiled program and capture the output
			exec(`${filePath}.exe`, (execErr, stdout, stderr) => {
				if (execErr) {
					console.error(`Execution error: ${execErr}`);
					return res.status(500).json({ error: 'Execution error' });
				}

				console.log(`Program output: ${stdout}`);
				res.json({ output: stdout });
			});

			// Delete the temporary files
			fs.unlinkSync(filePath, (unlinkErr) => {
				if (unlinkErr) {
					console.error(`Error deleting file: ${unlinkErr}`);
				}
			});
			fs.unlinkSync(`${filePath}.exe`, (unlinkErr) => {
				if (unlinkErr) {
					console.error(`Error deleting file: ${unlinkErr}`);
				}
			});
		});
	} catch (error) {
		console.error('Error while processing the request:', error);
		res.status(500).json({ error: 'An error occurred while processing the request.' });
	}
};

export default cppCompiler;
