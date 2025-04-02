import express from 'express';
import { processImage } from '../controller/image.processor.contollers.js';
import upload from '../middleware/upload.js';

const imageRouter = express.Router();

imageRouter.post('/upload', upload.single('image'), processImage);

export default imageRouter;