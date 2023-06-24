import { useState } from 'react';

const HtmlCompiler = () => {
	const [code, setCode] = useState('');
	const [parsedHtml, setParsedHtml] = useState('');

	const handleCodeChange = (event) => {
		setCode(event.target.value);
		// console.log('code is: ', code);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Create a temporary element to parse the HTML
		const tempElement = document.createElement('div');
		tempElement.innerHTML = code;

		// Get the parsed HTML
		const parsedHtml = tempElement.innerHTML;
		setParsedHtml(parsedHtml);
	};

	const handleReset = (e) => {
		e.preventDefault();
		setCode('');
		setParsedHtml('');
	};

	return (
		<div>
			<h1>HTML Compiler</h1>
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
				<div className="output-box">
					<div dangerouslySetInnerHTML={{ __html: parsedHtml }} />
				</div>
			</div>
		</div>
	);
};
export default HtmlCompiler;
