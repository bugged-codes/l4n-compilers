// * Backend Server entry file

// importing packages
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import primaryRoutes from './routes/primaryRoutes.js';

// instantiating
const app = express();

// variables
const _port = process.env._PORT;

// server middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(primaryRoutes);

// server listening event
app.listen(_port, () => console.log('Server listening on: ', _port));
