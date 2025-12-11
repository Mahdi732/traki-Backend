import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import authRouter from './routes/auth.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
import DBConnection from './database/connection.js';

class App {
    #serverRunning;
    #server;

    constructor() {
        this.#serverRunning = false;
        this.#server = express();

        this.#server.use(helmet());
        this.#server.use(express.json());
        this.#server.use(cookieParser());
        this.#server.set('trust proxy', 1);

        this.#server.use(cors({
            origin: process.env.CLIENT_ORIGIN || '*', credentials: true 
        }));
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, max: 200 
        });
        this.#server.use(limiter);


        this.routesConfiguration();

        this.#server.use(errorMiddleware);
    }

    async serverStart() {
        if (this.#serverRunning) {
            console.log('app is already on...');
            return;
        }

        this.isStarting = true;

        try {
            console.log('waiting for database to connect...');
            await DBConnection.connect();
            console.log('done!');

            const port = process.env.PORT;
            this.#server.listen(port, () => {
                this.#serverRunning = true;
                console.log(`Server listening on port ${port}`);
            });

        } catch (e) {
            console.error('server starting error: ', e);
            process.exit(1);
        }
    }

    routesConfiguration() {
        this.#server.use('/api/auth', authRouter);
    }
}

export default App;
