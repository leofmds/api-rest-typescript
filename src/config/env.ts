import dotenv from "dotenv";

dotenv.config();

export const env = {
    port: process.env.PORT || 3000
};
