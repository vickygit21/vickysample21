const path=require('path');
const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const productRoutes=require("./routes/productRoutes");
const connectDB =require("./config/db");

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth" ,require("./routes/authRoutes"));
app.use("/api/products" ,productRoutes);
app.use("/uploads", express.static("uploads"));

// const __dirname = path.resolve();
if(process.env.NODE_ENV == "production"){
    const frontendpath = path.join(__dirname,"..","frontend","dist")
    app.use(express.static(frontendpath))

    app.use('*',(req ,res)=>{
        res.sendFile(path.join(frontendpath, 'index.html'))
    })
}


const PORT=5000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server Running on ${PORT}`));