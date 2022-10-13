import productModel from "../models/productModel.js";

// Filter, sorting and paginating

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.queryString
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach(el => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      match => "$" + match
    );
    this.query.find(JSON.parse(queryStr));
    return this;
  }

  titleFiltering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit", "tags"];
    excludedFields.forEach(el => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      match => "$" + match
    );
    this.query.find(JSON.parse(queryStr));
    return this;
  }
  tagsFiltering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit", "title"];
    excludedFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      match => "$" + match
    );
    this.query.find(JSON.parse(queryStr));
    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort;
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 4;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export const getproductPage = async (req, res) => {
  try {
    const TotalPages = await productModel.countDocuments({});
    const LIMIT = 8;
    const PAGE = req.query.page;
    const startIndex = (Number(PAGE) - 1) * LIMIT;
    const SORT = req.query.sort || "-sold";
    if (req.query.tags !== "none" && req.query.title.regex !== "none") {
      const features = new APIfeatures(productModel.find(), req.query)
        .filtering()
        .sorting()
        .paginating();
      const productPageData = await features.query;
      res.json({
        productPageData,
        currentPage: Number(PAGE),
        totalproductPage: Math.ceil(TotalPages / LIMIT),
      });
    } else if (req.query.tags === "none" && req.query.title.regex === "none") {
      const productPageData = await productModel
        .find()
        .sort(SORT)
        .limit(LIMIT)
        .skip(startIndex);
      res.json({
        productPageData,
        currentPage: Number(PAGE),
        totalproductPage: Math.ceil(TotalPages / LIMIT),
      });
    } else if (req.query.tags === "none" && req.query.title.regex !== "none") {
      const features = new APIfeatures(productModel.find(), req.query)
        .titleFiltering()
        .sorting()
        .paginating();
      const productPageData = await features.query;
      res.json({
        productPageData,
        currentPage: Number(PAGE),
        totalproductPage: Math.ceil(TotalPages / LIMIT),
      });
    } else if (req.query.title.regex === "none" && req.query.tags !== "none") {
      const features = new APIfeatures(productModel.find(), req.query)
        .tagsFiltering()
        .sorting()
        .paginating();
      const productPageData = await features.query;
      res.json({
        productPageData,
        currentPage: Number(PAGE),
        totalproductPage: Math.ceil(TotalPages / LIMIT),
      });
    }
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