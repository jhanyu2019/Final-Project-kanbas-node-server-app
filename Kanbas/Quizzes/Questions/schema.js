import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
                                               courseId: {
                                                   type: String,
                                                   required: true,
                                                   ref: 'Course'
                                               },
                                               quizId: {
                                                   type: String,
                                                   required: true,
                                                   ref: 'Quiz'
                                               },
                                               title: {
                                                   type: String,
                                                   required: true
                                               },
                                               points: {
                                                   type: Number,
                                                   required: true
                                               },
                                               questionType: {
                                                   type: String,
                                                   required: true,
                                                   enum: ['multipleChoice', 'trueFalse', 'fillBlanks']
                                               },
                                               questionText: {
                                                   type: String,
                                                   required: true
                                               },
                                               options: [
                                                   {
                                                       text: String,
                                                       isCorrect: Boolean
                                                   }
                                               ], // Only for 'multipleChoice' questions
                                               correctAnswer: {
                                                   type: Boolean, // Only for 'trueFalse' questions
                                                   required: function() { return this.questionType === 'trueFalse'; }
                                               },
                                               blanks: [
                                                   {
                                                       placeholder: String,
                                                       correctAnswers: [String]
                                                   }
                                               ] // Only for 'fillBlanks' questions
                                           }, {
                                               timestamps: true
                                           });


export default QuestionSchema;
