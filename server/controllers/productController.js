import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/product.js";

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );
    // Pipe the buffer from memory into the upload stream
    uploadStream.end(buffer);
  });
};

// Add product : /api/product/add
export const addProduct = async (req, res) => {
  try {
    // Check for missing files or product data
    if (!req.files || req.files.length === 0 || !req.body.productData) {
      return res
        .status(400)
        .json({ success: false, message: "Missing image or product data" });
    }

    let productData = JSON.parse(req.body.productData);

    const images = req.files; //to get array of images uploaded by user

    // --- THIS IS THE ONLY PART THAT CHANGED ---
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        // We now pass 'item.buffer' (the file data from memory)
        // to our new helper function instead of 'item.path'
        return await uploadToCloudinary(item.buffer);
      })
    );
    // --- END OF CHANGE ---

    await productModel.create({ ...productData, images: imagesUrl }); // It will create product data in Database

    res
      .status(201)
      .json({ success: true, message: "Product Added Successully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Products : /api/product/list
export const productList = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Product : /api/product/id
export const productById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Change Product inStock : /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    // Check for missing data
    if (typeof inStock !== "boolean") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid 'inStock' value" });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(id, {
      inStock,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Stock Updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
