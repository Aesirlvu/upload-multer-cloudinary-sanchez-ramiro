import cors from "cors";
import morgan from "morgan";
import express from "express";
import router from "./src/routes/products.routes.js";
import "dotenv/config";

const PORT = process.env.DB_PORT;
const HOST = process.env.DB_HOST;

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:4000",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
  console.log("Solicitud desde el root /👌");
  res.send("Hola mundo 👌");
});

app.listen(PORT, () => {
  console.log(`Server running at ${HOST}:${PORT}`);
});
