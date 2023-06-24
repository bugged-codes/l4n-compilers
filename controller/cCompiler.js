// Compile and execute C++ code

// imports
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const cCompiler = async (req, res) => {
	// Queue to handle compilation tasks
	const compilationQueue = [];

	// Function to process the compilation task
	const processCompilationTask = () => {
		if (compilationQueue.length === 0) {
			return;
		}

		const { code, filePath, resolve, reject } = compilationQueue[0];
		console.log(code);

		// Compile the program using the C compiler (e.g., gcc)
		exec(`gcc ${filePath} -o ${filePath}.out`, (compileErr) => {
			if (compileErr) {
				console.error(`Compilation error: ${compileErr}`);
				reject(new Error('Compilation error'));
				removeCurrentTask();
				processCompilationTask();
				return;
			}

			// Execute the compiled program and capture the output
			exec(`${filePath}.out`, (execErr, stdout, stderr) => {
				if (execErr) {
					console.error(`Execution error: ${execErr}`);
					reject(new Error('Execution error'));
					removeCurrentTask();
					processCompilationTask();
					return;
				}

				// Delete the temporary files
				fs.unlink(filePath, (unlinkErr) => {
					if (unlinkErr) {
						console.error(`Error deleting file: ${unlinkErr}`);
					}
				});
				fs.unlink(`${filePath}.out`, (unlinkErr) => {
					if (unlinkErr) {
						console.error(`Error deleting file: ${unlinkErr}`);
					}
				});

				console.log(`Program output: ${stdout}`);
				resolve(stdout);
				removeCurrentTask();
				processCompilationTask();
			});
		});
	};

	// Function to remove the current task from the queue
	const removeCurrentTask = () => {
		compilationQueue.shift();
	};

	// Function to enqueue a compilation task
	const enqueueCompilationTask = (code, filePath) => {
		return new Promise((resolve, reject) => {
			const task = { code, filePath, resolve, reject };
			compilationQueue.push(task);

			if (compilationQueue.length === 1) {
				// Process the task immediately if it's the only one in the queue
				processCompilationTask();
			}
		});
	};

	app.post('/api/compile/c', async (req, res) => {
		const { code } = req.body;

		// Sanitize the code input
		const sanitizedCode = code.trim();

		if (!sanitizedCode) {
			return res.status(400).json({ error: 'No code provided' });
		}

		// Generate a random file name for the C program
		const fileName = `program_${Date.now()}.c`;
		const filePath = `./temp/${fileName}`;

		// Save the C code to a file
		fs.writeFile(filePath, sanitizedCode, async (writeErr) => {
			if (writeErr) {
				console.error(`Error writing code to file: ${writeErr}`);
				return res.status(500).json({ error: 'Error saving code' });
			}

			try {
				const output = await enqueueCompilationTask(sanitizedCode, filePath);
				res.json({ output });
			} catch (error) {
				console.error(`Compilation or execution error: ${error}`);
				res.status(500).json({ error: 'Compilation or execution error' });
			}
		});
	});
};

export default cCompiler;
