import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import authRoutes from "./routes/auth.route";
import authMiddleware from "./middlewares/authMiddleware";
import addressRouter from "./routes/address.route";
import userRouter from "./routes/user.route";
import productRouter from "./routes/product.route";
import { getOrCreateCart } from "./controllers/cart.controller";
import cartRouter from "./routes/cart.route";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Hello, world");
});

app.use("/api/auth", authRoutes);
app.use("/orders", authMiddleware);
app.use("/api/addresses", addressRouter);
app.use("/", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to database");

    app.listen(PORT, () => {
      console.log(`Your server is running on PORT http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connnection failed:", error);
  });
