import mongoose from "mongoose";
import QuestionSchema from "./schema.js";


const questionModel = mongoose.model('Question', QuestionSchema);