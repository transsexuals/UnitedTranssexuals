import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';
// import * as postgres from './libs/db/postgres';

/**
 * Express.js server.
 */
const app = express();
// note adjust __dirname '../public' depending on webpack build
app.use(express.static(path.join(__dirname, '/public'), {index: 'index.html', extensions: ['html']}));
console.log(path.join(__dirname, '../public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Routes - post, get, put, delete...
 */
app.use('/', indexRouter);
// Handle 404 errors
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/public', '/error.html'));
});

/**
 * Server Shutdown handler
 */
process.on('SIGINT', () => {
    // const shutdown = () => server.close(async () => {
    //     await postgres.shutdown();
    //     await process.exit(0);
    // });
    // shutdown().catch((error) => {
    //     console.log('shutdown error: ', error);
    // });
});

export default app;
