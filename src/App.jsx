import JavaCompiler from './pages/JavaCompiler';
import PythonCompiler from './pages/PythonCompiler';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './styles/app.css';
import CPlusPlusCompiler from './pages/CPlusPlusCompiler';
import CCompiler from './pages/CCompiler';
import CSharpCompiler from './pages/CsharpCompiler';
import JSCompiler from './pages/JSCompiler';
import HtmlCompiler from './pages/HtmlCompiler';
// import NewCompiler from './pages/NewCompiler';

function App() {
	return (
		<>
			<BrowserRouter>
				<h1>App</h1>
				<div>
					Click on following buttons for specific compiler
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
					</div>
					{/* <NewCompiler title={'test'} language={'java'} /> */}
				</div>
				<Routes>
					<Route path="/compiler/python" element={<PythonCompiler />} />
					<Route path="/compiler/java" element={<JavaCompiler />} />
					<Route path="/compiler/cpp" element={<CPlusPlusCompiler />} />
					<Route path="/compiler/c" element={<CCompiler />} />
					<Route path="/compiler/csharp" element={<CSharpCompiler />} />
					<Route path="/compiler/js" element={<JSCompiler />} />
					<Route path="/compiler/html" element={<HtmlCompiler />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
