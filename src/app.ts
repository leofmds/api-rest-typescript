import express from "express";
import cors from "cors";
import helmet from "helmet";

import { env } from "./config/env";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(env.port, () => {
    console.log(`🚀 Server running on port ${env.port}`);
  });
}

export default app;
