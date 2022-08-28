import express from 'express';
import data from './data.js';
import cors from 'cors'
import 'dotenv/config';

const app = express();
app.use(cors())
app.use(express.json())

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.get('/api/products/:slug/', (req, res) => {
  const product = data.products.find(item => item.slug === req.params.slug);
  if (product){
    res.send(product);
  }else{
   res.status(400).send({message: 'Product Not Found'})
  }
  
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
