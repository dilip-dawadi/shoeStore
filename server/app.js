import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import shoesPageRoutes from "./routes/productRoute.js";
import morgan from "morgan";

const app = express();

dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use("/user", userRoutes);
app.use("/shoesPage", shoesPageRoutes);
app.get("/", (req, res) => {
  res.send("Hello this is Shoes Store");
});

// Using morgan for dev dependancy
if (process.env.NODE_ENV === "development") {
  app.use();
}

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, console.log(`Server running ${PORT}`)))
  .catch(error => console.log(error));

export default app;
