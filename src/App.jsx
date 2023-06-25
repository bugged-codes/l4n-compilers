import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './styles/app.css';

// import JavaCompiler from './pages/JavaCompiler';
// import PythonCompiler from './pages/PythonCompiler';
// import CPlusPlusCompiler from './pages/CPlusPlusCompiler';
// import CCompiler from './pages/CCompiler';
// import CSharpCompiler from './pages/CsharpCompiler';
// import JSCompiler from './pages/JSCompiler';
// import HtmlCompiler from './pages/HtmlCompiler';
// import PHPCompiler from './pages/PHPCompiler';
import NewCompiler from './pages/NewCompiler';

function App() {
	return (
		<>
			<BrowserRouter>
				<div className="link-container">
					<NavLink className="link" to={'/compiler/python'}>
						Python Compiler
					</NavLink>
					<NavLink className="link" to={'/compiler/c'}>
						C Compiler
					</NavLink>
					<NavLink className="link" to={'/compiler/cpp'}>
						C++ Compiler
					</NavLink>
					<NavLink className="link" to={'/compiler/csharp'}>
						C# Compiler
					</NavLink>
					<NavLink className="link" to={'/compiler/java'}>
						Java Compiler
					</NavLink>
					<NavLink className="link" to={'/compiler/js'}>
						JavaScript Compiler
					</NavLink>
					<NavLink className="link" to={'/compiler/html'}>
						HTML Compiler
					</NavLink>
					<NavLink className="link" to={'/compiler/php'}>
						PHP Compiler
					</NavLink>
				</div>
				<Routes>
					<Route path="/" element={<h2>Click on above buttons for specific compiler</h2>} />
					<Route path="/compiler/python" element={<NewCompiler language={'python'} title={'python'} />} />
					<Route path="/compiler/cpp" element={<NewCompiler language={'cpp'} title={'c++'} />} />
					<Route path="/compiler/c" element={<NewCompiler language={'c'} title={'c'} />} />
					<Route path="/compiler/js" element={<NewCompiler language={'js'} title={'javascript'} />} />
					<Route path="/compiler/java" element={<NewCompiler language={'java'} title={'java'} />} />
					<Route path="/compiler/csharp" element={<NewCompiler language={'csharp'} title={'c#'} />} />
					<Route path="/compiler/html" element={<NewCompiler language={'html'} title={'HTML'} />} />
					<Route path="/compiler/php" element={<NewCompiler language={'php'} title={'PHP'} />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
