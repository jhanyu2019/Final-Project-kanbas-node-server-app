import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
                                      quizId: {
                                          type: String, // Matching the quiz 'id' field type from QuizSchema
                                          required: true,
                                          ref: 'Quiz' // Referencing the existing Quiz model
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
                                              correctAnswers: [String] // Support multiple correct answers
                                          }
                                      ] // Only for 'fillBlanks' questions
                                  }, {
                                      timestamps: true
                                  });



export default QuestionSchema;