import express from 'express';
import data from './data.js';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import indexRouter from './routes/indexRouter.js';
import productRouter from './routes/productRoutes.js'

mongoose.connect(process.env.MONGODB_URI).then(()=> {
  console.log('conected to db ')
}).catch(err => console.log(err.message))

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRouter)
app.use('/api/index', indexRouter)




const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});

