import questionModel from "./model.js"



export const findAllQuestions  = () => questionModel.find();

export const createQuestionByQuzID = (courseId, quizId, question)  => {
    return questionModel.create({
                            ...question,
                            id:new Date().getTime().toString(),
                            course: courseId,
                            quiz: quizId
                        });
};
