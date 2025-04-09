import express from 'express';

import dotenv from 'dotenv';
import path from 'path';
import { connectdb } from './config/db.js';
import productRoutes from './routes/products.routes.js';

dotenv.config();
const app = express();
const Port = process.env.PORT || 5000;
const __dirname = path.resolve(); // to get the current directory
app.use(express.json()); // to parse json data
app.use("/api/products", productRoutes);
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}
app.listen(5000, () => {
    connectdb();
    console.log("Server is running on http://localhost:" + Port);
    });
