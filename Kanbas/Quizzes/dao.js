import model from "./model.js"


export const findAllQuizzes  = () => model.find();

export const findQuizByIdAndCourseId = (quizId, courseId) =>
    model.findOne({ id: quizId, course: courseId });

export const findQuizzesByCourseId = (courseId) =>
    model.find({ course: courseId });

export const createQuizByCourseId = (quiz, courseId) => {
    return model.create({
                            ...quiz,
                    id:new Date().getTime().toString(),
                            course: courseId,
                        });
};

export const updateExistingQuiz = (quizId, courseId, quiz) =>
    model.updateOne({ id: quizId, course: courseId }, { $set: quiz });
