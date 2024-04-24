import questionModel from "./model.js"



export const findAllQuestions  = () => questionModel.find();

export const findQuestionsByQuizId = (courseId, quizId) =>
    questionModel.find({courseId: courseId, quizId: quizId, });

export const findQuestionsByIdAndQuizId = (courseId, quizId, questionId) =>
    questionModel.findOne({ courseId: courseId, quizId: quizId, _id: questionId });


export const createQuestionByQuizID = (courseId, quizId, question)  => {
    return questionModel.create({
                                    ...question,

                                    courseId: courseId,
                                    quizId: quizId
                                });
};


export const updateExistingQuestion = ( courseId, quizId, questionId, question) =>
    questionModel.updateOne({  courseId: courseId, quizId: quizId, _id: questionId  }, { $set: question });

