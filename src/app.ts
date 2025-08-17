import express from "express";
import { env } from "./config/env";

const app = express();

app.listen(env.port, () => {
    console.log('Server running on port ' + env.port);
    console.log(`Server running on port ${env.port}`);
});