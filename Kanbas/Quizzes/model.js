import mongoose from "mongoose";
import QuizSchema from "./schema.js";
const model = mongoose.model("QuizModel", QuizSchema);
export default model;