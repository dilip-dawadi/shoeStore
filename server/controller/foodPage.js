import foodPage from "../models/foodPage.js";

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

export const getFoodPage = async (req, res) => {
  try {
    const TotalPages = await foodPage.countDocuments({});
    const LIMIT = 8;
    const PAGE = req.query.page;
    const startIndex = (Number(PAGE) - 1) * LIMIT;
    const SORT = req.query.sort || "-sold";
    if (req.query.tags !== "none" && req.query.title.regex !== "none") {
      const features = new APIfeatures(foodPage.find(), req.query)
        .filtering()
        .sorting()
        .paginating();
      const foodPageData = await features.query;
      res.json({
        foodPageData,
        currentPage: Number(PAGE),
        totalFoodPage: Math.ceil(TotalPages / LIMIT),
      });
    } else if (req.query.tags === "none" && req.query.title.regex === "none") {
      const foodPageData = await foodPage
        .find()
        .sort(SORT)
        .limit(LIMIT)
        .skip(startIndex);
      res.json({
        foodPageData,
        currentPage: Number(PAGE),
        totalFoodPage: Math.ceil(TotalPages / LIMIT),
      });
    } else if (req.query.tags === "none" && req.query.title.regex !== "none") {
      const features = new APIfeatures(foodPage.find(), req.query)
        .titleFiltering()
        .sorting()
        .paginating();
      const foodPageData = await features.query;
      res.json({
        foodPageData,
        currentPage: Number(PAGE),
        totalFoodPage: Math.ceil(TotalPages / LIMIT),
      });
    } else if (req.query.title.regex === "none" && req.query.tags !== "none") {
      const features = new APIfeatures(foodPage.find(), req.query)
        .tagsFiltering()
        .sorting()
        .paginating();
      const foodPageData = await features.query;
      res.json({
        foodPageData,
        currentPage: Number(PAGE),
        totalFoodPage: Math.ceil(TotalPages / LIMIT),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
};

export const getFoodBySearch = async (req, res) => {
  const { searchFood, tags } = req.query;
  try {
    const title = new RegExp(searchFood, "i");
    const foodSearchData = await foodPage.find({
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

export const createFoodPage = async (req, res) => {
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
    const foodPageData = new foodPage({
      title,
      description,
      selectedFile,
      price,
      tags,
      quantity,
    });
    const savedFoodPage = await foodPageData.save();
    res
      .status(200)
      .json({ savedFoodPage, message: "Food Item Created Successfully" });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
export const updateFoodPage = async (req, res) => {
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
    const foodPageUpdate = {
      title,
      description,
      selectedFile,
      price,
      tags,
      quantity,
    };
    const updateFoodPage = await foodPage.findByIdAndUpdate(
      id,
      foodPageUpdate,
      { new: true }
    );
    res.json({ updateFoodPage, message: "Food Item Updated Successfully" });
  } catch (error) {
    res.json({ message: error });
  }
};
export const deleteFood = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(404).json({ message: "Food not found" });
    const result = await foodPage.findByIdAndRemove(id);
    res.status(200).json({ result, message: "Food Deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getFoodById = async (req, res) => {
  const { id } = req.params;
  try {
    const foodById = await foodPage.findById(id);
    const title = foodById.title;
    res.json({ foodById, message: "Food " + title });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createCommentFood = async (req, res) => {
  const { id } = req.params;
  const { formData, updated } = req.body;
  try {
    const status = updated ? "updated" : "created";
    const food = await foodPage.findById(id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    if (status === "updated") {
      const userComment = food.comments.find(
        comment => comment.userId === formData.userId
      );
      userComment.comments = formData.comments;
      const updatedCommentFood = await foodPage.findByIdAndUpdate(
        id,
        { ...food, comments: userComment.comments },
        { new: true }
      );
      res.json({ updatedCommentFood, message: "Comment Updated Successfully" });
    } else {
      const userComment = food.comments.find(
        comment => comment.userId === formData.userId
      );
      if (userComment) {
        return res.status(400).json({ message: "You have already commented" });
      }
      food.comments.push(formData);
      const updatedCommentFood = await foodPage.findByIdAndUpdate(id, food, {
        new: true,
      });
      res.json({ updatedCommentFood, message: "Comment Successfully" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deleteCommentFood = async (req, res) => {
  const { id, cmtuserId } = req.params;
  try {
    const food = await foodPage.findById(id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    const comment = food.comments.find(comment => comment.userId === cmtuserId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    food.comments.pull(comment);
    const deletedCommentFood = await foodPage.findByIdAndUpdate(id, food, {
      new: true,
    });
    res.json({ deletedCommentFood, message: "Comment Deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// report garnya bitikai jaslai report gareko xa tesko
// usermodel ma report vanya array aauna paryo
// aane comment ma tyo report tai individual user lai janexa
// jasme report id aane report on which food by which user aane report ko reason and what was the bad comment dekhaunya xa
//last when the spam user login he/she will be notify that he/she has been reported for spamming
