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

export const getProductBySearch = async (req, res) => {
  const { searchFood, tags } = req.query;
  try {
    const title = new RegExp(searchFood, "i");
    const foodSearchData = await productModel.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    if (searchFood !== "none") {
      res.json({
        foodSearchData,
        message:
          foodSearchData.length + " food found for " + '"' + searchFood + '"',
      });
    } else {
      res.json({
        foodSearchData,
        message: foodSearchData.length + " item found for " + '"' + tags + '"',
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
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
export const updateproductPage = async (req, res) => {
  const { id } = req.params;
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
    const productPageUpdate = {
      title,
      description,
      selectedFile,
      price,
      tags,
      quantity,
    };
    const updateproductPage = await productModel.findByIdAndUpdate(
      id,
      productPageUpdate,
      { new: true }
    );
    res.json({ updateproductPage, message: "Food Item Updated Successfully" });
  } catch (error) {
    res.json({ message: error });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(404).json({ message: "Product not found" });
    const result = await productModel.findByIdAndRemove(id);
    res.status(200).json({ result, message: "Product Deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
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

export const createCommentProduct = async (req, res) => {
  const { id } = req.params;
  const { formData, updated } = req.body;
  try {
    const status = updated ? "updated" : "created";
    const Product = await productModel.findById(id);
    if (!Product) return res.status(404).json({ message: "Product not found" });
    if (status === "updated") {
      const userComment = Product.comments.find(
        comment => comment.userId === formData.userId
      );
      userComment.comments = formData.comments;
      const updatedCommentProduct = await productModel.findByIdAndUpdate(
        id,
        { ...Product, comments: userComment.comments },
        { new: true }
      );
      res.json({ updatedCommentProduct, message: "Comment Updated Successfully" });
    } else {
      const userComment = Product.comments.find(
        comment => comment.userId === formData.userId
      );
      if (userComment) {
        return res.status(400).json({ message: "You have already commented" });
      }
      Product.comments.push(formData);
      const updatedCommentProduct = await productModel.findByIdAndUpdate(id, Product, {
        new: true,
      });
      res.json({ updatedCommentProduct, message: "Comment Successfully" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deleteCommentProduct = async (req, res) => {
  const { id, cmtuserId } = req.params;
  try {
    const Product = await productModel.findById(id);
    if (!Product) return res.status(404).json({ message: "Product not found" });
    const comment = Product.comments.find(comment => comment.userId === cmtuserId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    Product.comments.pull(comment);
    const deletedCommentProduct = await productModel.findByIdAndUpdate(id, Product, {
      new: true,
    });
    res.json({ deletedCommentProduct, message: "Comment Deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};