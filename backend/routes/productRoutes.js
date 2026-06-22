const express=require("express");
const multer=require("multer");

const router=express.Router();
const {createProduct, updateProduct, getAllProduct, getByIdProduct, deleteProduct} = require("../controllers/productController");

const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "uploads/");
    },
    filename: function(req, file , cb){
        cb(null,Date.now()+ "-"+file.originalname);
    }
});

const upload=multer({storage});

router.post("/create", upload.single("image"), createProduct);
router.put("/:id",upload.single("image"), updateProduct);
router.get("/get", getAllProduct);
router.get("/get/:id", getByIdProduct);
router.delete("/:id" ,deleteProduct);


module.exports = router;