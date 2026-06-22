const Product =require("../models/Product");

const createProduct =async(req,res)=>{
    try{
    const{name,description,price}=req.body;

    const create= new Product({
        name,description,price,
        image:req.file? req.file.filename: ""
    });
    await create.save();
    res.status(201).json({
        message:"Successfully created", create
    });
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

const updateProduct=async (req,res) => {
    try{
        const {name ,description,price}=req.body;
        let updatedata={name,description,price};
        
        if(req.file){
            updatedata.image=req.file.filename;
        }

        const update=await Product.findByIdAndUpdate(req.params.id,updatedata,{new:true});
        res.status(200).json(update);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

const getAllProduct=async(req,res)=>{
    try{
        const products=await Product.find();
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

const getByIdProduct=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);

        if(!product){
            res.status(404).json({message:"Product Not Found"});
        }
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
   
}

    const deleteProduct=async(req,res)=>{
        try{
            const product=await Product.findByIdAndDelete(req.params.id);

            res.status(200).json({message:"product deleted successfully."});
        }
        catch(error){
            res.status(500).json({message:error.message});
        }
    }
        


module.exports={createProduct ,getAllProduct,getByIdProduct,updateProduct,deleteProduct};