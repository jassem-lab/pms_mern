import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import discountRoutes from "./routes/discountRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import resignRoutes from "./routes/resignRoutes.js";
import positionRoutes from "./routes/positionRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import writeUpRoutes from "./routes/writeUpRoutes.js";
// import newRoutes from './routes/newRoutes.js';

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(fileUpload());

app.use("/api/users", userRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/resigns", resignRoutes);
app.use("/api/positions", positionRoutes);
app.use("/api/discounts", discountRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/writeUp", writeUpRoutes);
// api.use('/api/news', newRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running ${process.env.NODE_ENV} mode on post ${PORT}`.yellow.bold
  )
);
