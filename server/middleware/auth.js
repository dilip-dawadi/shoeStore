import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      return res.status(401).json({ message: "Session expired, please login again" });
    }
    const cookie = req.cookies.token;
    let decodedData;
    decodedData = jwt.verify(cookie, process.env.JWT_SECRET);
    if (decodedData) {
      req.userId = decodedData?._id;
      next();
    } else {
      return res.clearCookie("token");
    }
  } catch (error) {
    res.clearCookie("token");
    res.status(440).json({ message: "Sorry, you are not authorized" });
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      return res.status(401).json({ message: "Session expired, please login again" });
    }
    const cookie = req.cookies.token;
    let decodedData;
    decodedData = jwt.verify(cookie, process.env.JWT_SECRET);
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
