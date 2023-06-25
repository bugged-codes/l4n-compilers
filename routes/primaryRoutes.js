// importing packages
import { Router } from 'express';
import codeExecutionController from '../controller/codeExecution.js';
import { codeExec1 } from '../controller/codeExec1.js';
import javaCompiler from '../controller/javaCompiler.js';
import JsCompiler from '../controller/JsCompiler.js';
import cppCompiler from '../controller/cppCompiler.js';
import phpCompiler from '../controller/phpCompiler.js';

// instantiating
const primaryRoutes = Router();

// primary routes of server
primaryRoutes.get('/home', (req, res) => {
	return res.send('<h1>This is server Home page.</h1>');
});

primaryRoutes.post('/compiler/python', codeExecutionController);
primaryRoutes.post('/compiler/python-1', codeExec1);
primaryRoutes.post('/compiler/java', javaCompiler);
primaryRoutes.post('/compiler/js', JsCompiler);
primaryRoutes.post('/compiler/c', JsCompiler);
primaryRoutes.post('/compiler/cpp', cppCompiler);
primaryRoutes.post('/compiler/php', phpCompiler);
primaryRoutes.post('/compiler/csharp', phpCompiler);

export default primaryRoutes;
