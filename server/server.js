import express from 'express';
import cors from 'cors';
import imageRouter from './routes/imageroute.js';

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', imageRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});