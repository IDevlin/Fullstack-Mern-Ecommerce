import express from "express";
import data from "../data.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

const indexRouter= express.Router()

indexRouter.get('/', async (req, res) => {
    await Product.deleteMany({})
    const createProducts = await Product.insertMany(data.products)
    res.send({createProducts})

    await User.deleteMany({})
    const createUsers = await User.insertMany(data.users)
    res.send({createProducts, createUsers})
} )

export default indexRouter