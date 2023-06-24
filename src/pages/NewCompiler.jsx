import { useState, useEffect } from 'react';
import axios from 'axios';
import pt from 'prop-types';

const NewCompiler = ({ title, language }) => {
	const [code, setCode] = useState('');
	const [response, setResponse] = useState({ output: '' });
	const [toggle, setToggle] = useState(false);

	title === undefined ? (title = 'Online') : (title = language);

	const handleCodeChange = (event) => {
		setCode(event.target.value);
		// console.log('code is: ', code);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setToggle(true);
	};

	const handleReset = (e) => {
		e.preventDefault();
		setCode('');
		setResponse({ output: '' });
	};
	useEffect(() => {
		if (toggle) {
			const handleRunCode = async () => {
				// Send the code to the backend for execution
				console.log('code when in handleRunCode: ', code);
				try {
					const axiosRes = await axios.post(`http://127.0.0.1:4040/compiler/${language}`, { code: code.toString(), language: 'python' });
					console.log(axiosRes);
					if (axiosRes.status === 200) {
						setResponse(axiosRes.data);
					}
				} catch (error) {
					console.log(error);
				}
			};
			handleRunCode();
			setToggle(false);
		}
	}, [toggle]);

	return (
		<div>
			<h1>{title} Compiler</h1>
			<div>
				<h2>Editor</h2>
				<form name="code-form">
					<textarea value={code} onChange={handleCodeChange} maxLength={2000} rows={10} cols={100} />
					<br />
					<br />
					<div style={{ width: '20rem', display: 'flex', justifyContent: 'space-around' }}>
						<button type="reset" onClick={handleReset}>
							Reset
						</button>
						<button onClick={handleSubmit} type="submit">
							Run Code
						</button>
					</div>
					{/* {console.log(response)} */}
				</form>
			</div>
			<div>
				<h2>Output</h2>
				<pre className="output-box">{response.output}</pre>
			</div>
		</div>
	);
};

NewCompiler.propTypes = {
	url: pt.string,
	title: pt.string,
	language: pt.string,
};

export default NewCompiler;
