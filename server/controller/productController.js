import productModel from "../models/productModel.js";


export const getproductPage = async (res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
};

export const createproductPage = async (req, res) => {
  const { title, description, selectedFile, price, tags, quantity } = req.body;
  try {
    if (!title || !description) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }
    if (!selectedFile) {
      return res.status(400).json({
        message: "Please provide a file",
      });
    }
    if (!price) {
      return res.status(400).json({
        message: "Please provide a price",
      });
    }
    if (!tags) {
      return res.status(400).json({
        message: "Please provide a tags",
      });
    }
    if (!quantity) {
      return res.status(400).json({
        message: "Please provide a quantity",
      });
    }
    const productPageData = new productModel({
      title,
      description,
      selectedFile,
      price,
      tags,
      quantity,
    });
    const savedproductPage = await productPageData.save();
    res
      .status(200)
      .json({ savedproductPage, message: " Created Successfully" });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const ProductById = await productModel.findById(id);
    const title = ProductById.title;
    res.json({ ProductById, message: "Product " + title });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};