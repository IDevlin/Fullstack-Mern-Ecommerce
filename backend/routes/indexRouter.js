import express from "express";
import data from "../data.js";
import Product from "../models/productModel.js";

const indexRouter= express.Router()

indexRouter.get('/', async (req, res) => {
    await Product.deleteMany({})
    const createProducts = await Product.insertMany(data.products)
    res.send({createProducts})
} )

export default indexRouter