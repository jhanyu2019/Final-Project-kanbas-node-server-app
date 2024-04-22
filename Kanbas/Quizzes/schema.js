import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
                                           id: { type: String, required: true, unique: true },
                                           title: { type: String, required: true },
                                           course: { type: String, required: true },
                                           quizType: {
                                               type: String,
                                               enum: ["Graded Quiz", "Practice Quiz", "Survey"],
                                               required: true,
                                               default: "Graded Quiz"
                                           },
                                           points: { type: Number, required: true },
                                           assignmentGroup: {
                                               type: String,
                                               enum: ["Quizzes", "Exams", "Assignments", "Project"],
                                               required: true,
                                               default: "Quizzes"
                                           },
                                           shuffleAnswers: {
                                               type: Boolean,
                                               required: false,
                                               default: false
                                           },
                                           timeLimit: {
                                               type: String,
                                               default: "20 Minutes"
                                           },
                                           multipleAttempts: {
                                               type: Boolean,
                                               required: false, // Make it optional
                                               default: false
                                           },
                                           showCorrectAnswers: {
                                               type: String,
                                               enum: ["Immediately", "After Due Date", "Never"],
                                               required: false, // Make it optional
                                           },
                                           accessCode: {
                                               type: String,
                                               default: ""
                                           },
                                           oneQuestionAtATime: {
                                               type: Boolean,
                                               required: false, // Make it optional
                                               default: false
                                           },
                                           webcamRequired: {
                                               type: Boolean,
                                               required: false, // Make it optional
                                               default: false
                                           },
                                           lockQuestionsAfterAnswering: {
                                               type: Boolean,
                                               required: false, // Make it optional
                                               default: false
                                           },
                                           dueDate: { type: Date, required: true },
                                           availableFrom: { type: Date, required: false },
                                           until: { type: Date, required: false },

                                       }, {
                                           timestamps: true,
                                           collection: "quizzes",

                                       });






export default QuizSchema;