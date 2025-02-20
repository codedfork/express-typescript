import express, { Request, Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { router } from './routes/api';
import AppDataSource from './modules/config/database';
import logger from './utils/logger';
import { Authorization } from './middleware/authorization';
dotenv.config();
const app = express();
const PORT = process.env.PORT;


AppDataSource.initialize().then((v)=>{ 
    console.log("Database Connected...");
    app.use(helmet());
    app.use(express.json());
    app.use('/api',router);
    app.listen(PORT, () => {
        console.log("App is started at port : ", PORT);
    })
}).catch((error)=>{
    logger.error("Database connection issue:",error);
})
    