import model from "./model.js"
import questionModel from "./Questions/model.js";


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
                            points: quiz.points || 0,
                            questionCount: 0,
                        });
};

export const updateExistingQuiz = (quizId, courseId, quiz) =>
    model.updateOne(
        { id: quizId, course: courseId },
        {
            $set: {
                ...quiz,
                points: quiz.points,
                questionCount: quiz.questionCount,
            },
        }
    );

export const updateQuizPublishStatus = async (quizId, isPublished) => {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
        quizId,
        { isPublished },
        { new: true }
    );
    return updatedQuiz;
};
export const deleteQuiz = async (quizId, courseId) => {
    await model.deleteOne({ id: quizId, course: courseId });
};

export const updateQuizPoints = async (quizId, courseId, points) => {
    const updatedQuiz = await model.findOneAndUpdate(
        { id: quizId, course: courseId },
        { points: points },
        { new: true }
    );
    return updatedQuiz;
};

export const updateQuizQuestionCount = (quizId, courseId, questionCount) =>
    model.updateOne(
        { id: quizId, course: courseId },
        {
            $set: {
                questionCount: questionCount,
            },
        }
    );

export const findQuestionsByQuizId = (courseId, quizId) =>
    questionModel.find({courseId: courseId, quizId: quizId, });
