export class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.running = query;
    this.lounging = query;
    this.everyday = query;
    this.paginate = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };
    if (queryObj.price) {
      queryObj.price = queryObj.price.split(" - ");
      queryObj.price = {
        $gte: parseInt(queryObj.price[0]),
        $lte: parseInt(queryObj.price[1]),
      };
    }
    if (queryObj.brand) {
      queryObj.brand = {
        $regex: queryObj.brand,
        $options: "i",
      };
    }
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);
    if (queryObj.brand && queryObj.category && queryObj.price) {
      this.query.find(queryObj);
      this.queryString = queryObj;
      return this;
    } else if (!queryObj.brand && queryObj.category && queryObj.price) {
      delete queryObj.brand;
      this.queryString = queryObj;
      this.query.find(queryObj);
      return this;
    } else if (queryObj.brand && !queryObj.category && queryObj.price) {
      delete queryObj.category;
      this.queryString = queryObj;
      this.query.find(queryObj);
      return this;
    } else if (queryObj.brand && queryObj.category && !queryObj.price) {
      delete queryObj.price;
      this.queryString = queryObj;
      this.query.find(queryObj);
      return this;
    } else if (!queryObj.brand && !queryObj.category && queryObj.price) {
      delete queryObj.brand;
      delete queryObj.category;
      this.queryString = queryObj;
      this.query.find(queryObj);
      return this;
    } else if (!queryObj.brand && queryObj.category && !queryObj.price) {
      delete queryObj.brand;
      delete queryObj.price;
      this.queryString = queryObj;
      this.query.find(queryObj);
      return this;
    } else if (queryObj.brand && !queryObj.category && !queryObj.price) {
      delete queryObj.category;
      delete queryObj.price;
      this.queryString = queryObj;
      this.query.find(queryObj);
      return this;
    } else {
      this.queryString = {};
      this.query.find();
      return this;
    }
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
    const page = this.paginate.page || 1;
    const limit = this.paginate.limit * 1 || 8;
    const skip = (page - 1) * limit;
    this.paginate = { skip, limit };
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
