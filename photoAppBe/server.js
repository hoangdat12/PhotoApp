import express from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cookiePaser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './helper/connectDB.js';
import { uploadPicture } from './controller.js/pictureController.js';
import { verifyAccessToken } from './middleware/verifyAccessToken.js';
import {
  changeInforUser,
  changeAvatar,
} from './controller.js/userController.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import videoRouter from './routes/videoRouter.js';
import pictureRouter from './routes/pictureRoute.js';
import commentRouter from './routes/commentRouter.js';
import { verifyOtp } from './controller.js/otpController.js';
import './helper/connectRedis.js';
import corsOptions from './config/corsOptions.js';

// CONFIGUARATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
// const corsOptions = {
//   origin: "http://localhost:5173",
//   credentials: true,
// };
app.use(cors(corsOptions));
app.use(cookiePaser());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// MULTER UPLOAD FILE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// ROUTES WITH UPLOAD PICTURE
app.post('/picture/upload', upload.single('picture'), uploadPicture);
app.post('/auth/verify', upload.single('picture'), verifyOtp);
app.post('/user/change/avatar', upload.single('picture'), changeAvatar);
app.post('/user/update/:userId', changeInforUser);

// ROUTES
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/picture', pictureRouter);
app.use('/video', videoRouter);
app.use('/comment', commentRouter);

// SERVER SETUP
const PORT = process.env.PORT || 8080;

// CONNECT MONGODB
connectDB();

// CONNECT SERVER
app.listen(PORT, () => {
  console.log('Listening on port 8080');
});
