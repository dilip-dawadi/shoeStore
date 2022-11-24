import jwt from "jsonwebtoken";
import userDetail from "../models/user.js";

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(440).json({ message: "Unknown Request" });
    }
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedData?._id;
    req.user = await userDetail.findById(decodedData._id, "-password");
    next();
  } catch (error) {
    res.status(440).json({ message: "Login to continue" });
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(440).json({ message: "Unknown Header" });
    }
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    decodedData = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedData?.role === true) {
      req.userId = decodedData?._id;
      next();
    } else {
      res.status(440).json({ message: "Unauthorized Admin" });
    }
  } catch (error) {
    res.status(440).json({ message: error.message });
  }
};
export { auth, checkAdmin };
