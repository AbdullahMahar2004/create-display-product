import Product from "../Models/Products.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    }
    catch (error) {
        console.error("Error: ", error.message);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
};
export const createProduct = async (req, res) => {
   const products = req.body;
   if(!products.name || !products.price || !products.image){
       return res.status(400).json({message: "All fields are required"});
   }
    const newProduct = new Product(products);
    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
};
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({success : false, message : "Invalid Product ID"});
    }
    try {
        await Product.findByIdAndDelete(id); 
        res.status(200).json({success: true, message: "Product deleted successfully"}); 
    } catch (error) { 
        console.error("Error: ", error.message); 
        res.status(500).json({success: false, message: "Internal Server Error"}); 
    }
};
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const products = req.body;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({success : false, message : "Invalid Product ID"});
    }
    try {
        const updatedproduct = await Product.findByIdAndUpdate(id, products, {new: true});
        res.status(200).json({success: true, data: updatedproduct});
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
};