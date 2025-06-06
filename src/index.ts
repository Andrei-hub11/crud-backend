import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import postRoutes from "./routes/postRoutes";
import { ApiError } from "./utils/errors/ApiError";
import { ApiResponse } from "./utils/ApiResponse";

const app = express();
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";

app.use(cors());
app.use(helmet());
app.use(morgan(isProduction ? "combined" : "dev"));
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use("/careers/", postRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`[ERROR] ${err.message}`, {
    stack: isProduction ? undefined : err.stack,
    path: req.path,
    method: req.method,
  });

  if (err instanceof ApiError) {
    res.status(err.statusCode).json(ApiResponse.error(err.message));
  } else {
    const message = isProduction ? "Internal Server Error" : err.message;
    res.status(500).json(ApiResponse.error(message));
  }
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

export default app;
