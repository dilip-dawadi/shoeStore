import jwt from "jsonwebtoken";
import userDetail from "../models/user.js";

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(440).json({ message: "Unknown Request" });
    }
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    decodedData = jwt.verify(token, process.env.JWT);
    req.userId = decodedData?.id;
    req.user = await userDetail.findById(decodedData.id, "-password");
    next();
  } catch (error) {
    res.status(440).json({ message: "unauthorized Auth" });
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(440).json({ message: "Unknown Request" });
    }
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    decodedData = jwt.verify(token, process.env.JWT);
    if (decodedData?.role === 1) {
      req.userId = decodedData?.id;
      next();
    } else {
      res.status(440).json({ message: "unauthorized Admin" });
    }
  } catch (error) {
    res.status(440).json({ message: error.message });
  }
};
export { auth, checkAdmin };
