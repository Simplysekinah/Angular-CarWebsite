const express = require("express");
const ProductModel = require("../../Model/Products/ProductsModel");
const { cloudinary } = require("../../Config/Admin/CloudinayConfig");

const CreateProducts = async (request, response) => {
  try {
    // console.log(request.body,'body');
    // console.log(request.image);
    const { name,type,fuelCapacity,steering,capacity, price,available, description,reviews,category,image } =
      request.body;
    // console.log(
    //   name,type,fuelCapacity,steering,capacity,
    //   price,
    //   description,
    //   category,
    //   availability,
    //   color,
    //   image
    // );
    // console.log(image)
    // const image = request.file;
    
    const validateCategory = ['popular', 'recommendation'];
    if (!validateCategory.includes(category)) {
      return response.status(400).send({ message: "Invalid Category" });
    }

    if (!image) {
      return response.status(400).send({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(image);
    const imageUrl = result.secure_url;
    // console.log(imageUrl)

    const product = await ProductModel.create({
      name,
      type,
      fuelCapacity,
      steering,
      capacity,
      price,
      available: available !== undefined ? available : true,
      description,
      reviews,
      category,
      image: imageUrl,
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

const getAllProductsbyCategory = async (request, response) => {
  try {
    const { category } = request.params;
    // console.log(category)
    // console.log(ProductModel);
    const products = await ProductModel.find({ category:category });
    // console.log(products,'pro');
    response.status(200).send({ products });
  } catch (error) {
    console.log(error);
  }
};

const getAllProductsbyName = async (request, response) => {
  try {
    console.log(request.body);
    console.log(request.params);
    const { name } = request.params;
    console.log(name)
    // console.log(ProductModel);
    const products = await ProductModel.find({ name:name });
    console.log(products,'pro');
    response.status(200).send({ products });
  } catch (error) {
    console.log(error.message);
  }
};

const getAllProductsbyId = async (request, response) => {
  try {
    const { _id } = request.params;
    console.log(_id)
    // console.log(ProductModel);
    const products = await ProductModel.findById({_id});
    // console.log(products,'id');
    response.status(200).send({ products });
  } catch (error) {
    console.log(error);
  }
};
const updateProducts = async (request, response) => {
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

const deleteProducts = async (request, response) => {
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
  getAllProductsbyId,
  getAllProductsbyName,
  updateProducts,
  deleteProducts,
};
