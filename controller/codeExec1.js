// * controller for executing code

// importing packages
import fs from 'fs';
import path from 'path';
import { PythonShell } from 'python-shell';
import { exec, spawn } from 'child_process';

// setting pathnames for ES Scope (because type is set to module in package.json)
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const codeExec1 = async (req, res) => {
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

		// Create a temporary Python script file
		const scriptPath = path.join(__dirname, '../temp2.py');
		console.log('script path is: ', scriptPath);
		if (!fs.existsSync(scriptPath)) {
			fs.writeFileSync(scriptPath, code);
		}

		// Configure PythonShell options
		const options = {
			mode: 'text',
			pythonPath: 'python',
			pythonOptions: ['-u'],
			// scriptPath: './', // Set the script path to the current directory
			args: codeArgs, // Any additional arguments to pass to the Python script
		};

		PythonShell.run(scriptPath, options)
			.then((results) => {
				console.log('result: ', results);
				res.status(200).json({ output: results });
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json({ error: err });
			})
			.finally(() => {
				// fs.writeFile(scriptPath, '', function () {
				// 	console.log('file cleared');
				// });
				fs.unlinkSync(scriptPath, () => console.log('file removed'));
			});
	} catch (error) {
		console.log('error while execution', error);
	}
};

export { codeExec1 };
