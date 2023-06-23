const pythonHelper = async (code) => {
	try {
		// Save the code to a Python file
		const filename = 'code.py';
		const pythonCode = Buffer.from(code).toString('utf-8');
		await fs.writeFile(`${tempDir}/${filename}`, pythonCode);

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
						res.json({ output });
					}

					// Remove the Python file
					fs.unlink(`${tempDir}/${filename}`).catch((error) => {
						console.error('Error while removing the Python file:', error);
					});
				});
			}
		});
	} catch (error) {
		console.error('Error while processing the request:', error);
		res.status(500).json({ error: 'An error occurred while processing the request.' });
	}
};

export { pythonHelper };
