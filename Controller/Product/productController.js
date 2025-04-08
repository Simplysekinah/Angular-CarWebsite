const express = require("express");
const ProductModel = require("../../Model/Products/ProductsModel");
const { cloudinary } = require("../../Config/Admin/CloudinayConfig");

const CreateProducts = async (request, response) => {
  try {
    // console.log(request.body,'body');
    // console.log(request.image);
    const { title, price, description, category, availability, color,image } =
      request.body;
    // console.log(
    //   title,
    //   price,
    //   description,
    //   category,
    //   availability,
    //   color,
    //   image
    // );
    // console.log(image)
    // const image = request.file;
    
    const validateCategory = ["bus", "car", "bike"];
    if (!validateCategory.includes(category)) {
      return response.status(400).send({ message: "Invalid Category" });
    }

    if (!image) {
      return response.status(400).send({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(image);
    const imageUrl = result.secure_url;
    console.log(imageUrl)

    const product = await ProductModel.create({
      title,
      price,
      description,
      category,
      availability,
      color,
      image: imageUrl,
      availability: availability !== undefined ? availability : true,
    });
    await product.save();
    response.status(201).send({ product, message: "Product Created" });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send({ message: "Error updating product", error: error.message });
    // next(error);
  }
};

const getAllProducts = async (request, response) => {
  try {
    const products = await ProductModel.find();
    response.status(200).send({ products });
  } catch (error) {
    console.log(error);
  }
};

const getAllProductsbyCategory = async (request, require) => {
  const { category } = request.params;
  try {
    const products = await ProductModel.find({ category: category });
    response.status(200).send({ products });
  } catch (error) {
    console.log(error);
  }
};
const updateProducts = async (request, require) => {
  try {
    const { id } = request.params;
    const updateData = request.body;
    let product = await ProductModel.findById(id);
    if (!product) {
      return response.status(400).send({ message: "Product not found" });
    }
    if (request.file && Object.keys(request.file).length !== 0) {
      const imageUrl = Promise.all(
        request.files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path);
          return result.secure_url;
        })
      );
      updateData.image = imageUrl;
    }
    product = await ProductModel.findByIdAndUpdate(id, update, { new: true });
    await product.save();
    response.status(200).send({ product, message: "Product Updated" });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send({ message: "Error updating product", error: error.message });
  }
};

const deleteProducts = async (request, require) => {
  try {
    const { id } = request.params;
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return response.status(400).send({ message: "Product not found" });
    }
    response.status(200).send({ message: "Product Deleted" });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send({ message: "Error deleting product", error: error.message });
  }
};
module.exports = {
  CreateProducts,
  getAllProducts,
  getAllProductsbyCategory,
  updateProducts,
  deleteProducts,
};
