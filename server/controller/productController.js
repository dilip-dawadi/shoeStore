import productModel from "../models/productModel.js";
import { APIfeatures } from "./paginate.js";

export const getproductPage = async (req, res) => {
  try {
    req.query.page = parseInt(req.query.page);
    req.query.limit = parseInt(req.query.limit);
    const features = new APIfeatures(productModel.find(), req.query).sorting().paginating().filtering()
    const data = await features.query;
    const paginateRemaining = features.paginate;
    const runnning = await productModel.find(features.queryString).find({ shoeFor: "Running" }).skip(paginateRemaining.skip).limit(paginateRemaining.limit);
    const lounging = await productModel.find(features.queryString).find({ shoeFor: "Lounging" }).skip(paginateRemaining.skip).limit(paginateRemaining.limit);
    const everyday = await productModel.find(features.queryString).find({ shoeFor: "Everyday" }).skip(paginateRemaining.skip).limit(paginateRemaining.limit);
    res.status(200).json({ data, runnning, lounging, everyday });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
};

export const getTopProducts = async (req, res) => {
  try {
    const data = await productModel.find({}).sort({ sold: -1 }).limit(12);
    res.json({ data });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createproductPage = async (req, res) => {
  const { title, description, selectedFile, price, category, quantity, shoeFor, brand } = req.body;
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
    if (!category) {
      return res.status(400).json({
        message: "Please provide a category",
      });
    }
    if (!quantity) {
      return res.status(400).json({
        message: "Please provide a quantity",
      });
    }
    if (!shoeFor) {
      return res.status(400).json({
        message: "Please provide a shoeFor",
      });
    }
    if (!brand) {
      return res.status(400).json({
        message: "Please provide a brand",
      });
    }
    const productPageData = new productModel({
      title,
      description,
      selectedFile,
      price,
      category,
      quantity,
      shoeFor,
      brand,
    });
    const savedproductPage = await productPageData.save();
    res
      .status(200)
      .json({ data: savedproductPage, message: `${savedproductPage.title} created successfully` });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { title, description, selectedFile, price, category, quantity, shoeFor, brand } = req.body;
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
    if (!category) {
      return res.status(400).json({
        message: "Please provide a category",
      });
    }
    if (!quantity) {
      return res.status(400).json({
        message: "Please provide a quantity",
      });
    }
    if (!shoeFor) {
      return res.status(400).json({
        message: "Please provide a shoeFor",
      });
    }
    if (!brand) {
      return res.status(400).json({
        message: "Please provide a brand",
      });
    }
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        selectedFile,
        price,
        category,
        quantity,
        shoeFor,
        brand,
      },
      { new: true }
    );
    res.status(200).json({ data: updatedProduct, message: `${updatedProduct.title} updated successfully` });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const ProductById = await productModel.findById(id);
    const title = ProductById.title;
    res.json({ data: ProductById, message: "Product " + title });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getfilterProduct = async (req, res) => {
  try {
    const data = await productModel.find({}).select("brand category");
    const pages = await productModel.find().countDocuments();
    const limit = 8;
    const totalPages = Math.ceil(pages / limit);
    const pageArray = [];
    for (let i = 1; i <= totalPages; i++) {
      pageArray.push(i);
    }
    const brand = data.map((item) => item.brand);
    const category = data.map((item) => item.category);
    const allBrand = brand.reduce((acc, val) => acc.concat(val), []);
    const allCategory = category.reduce((acc, val) => acc.concat(val), []);
    const brandFilter = allBrand.filter((item) => item !== undefined && item !== null);
    const categoryFilter = allCategory.filter((item) => item !== undefined && item !== null);
    const brandCapatalize = brandFilter.map((item) => item.charAt(0).toUpperCase() + item.slice(1));
    const categoryCapatalize = categoryFilter.map((item) => item.charAt(0).toUpperCase() + item.slice(1));
    const uniqueBrand = [...new Set(brandCapatalize)];
    const uniqueCategory = [...new Set(categoryCapatalize)];
    res.json({ data: { brand: uniqueBrand, category: uniqueCategory, pageNumbers: pageArray } });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};