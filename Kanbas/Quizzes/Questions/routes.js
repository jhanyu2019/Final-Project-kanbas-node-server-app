import * as dao from "./dao.js";



export default function QuestionsRoutes(app) {

    const findAllQuestions = async (req, res) => {
        const questions = await dao.findAllQuestions()
        res.json(questions);
    }

    const findQuestionsByQuizId = async (req, res) => {
        const {  courseId, quizId } = req.params;
        const questions = await dao.findQuestionsByQuizId(courseId, quizId);
        res.json(questions);
    }

    const findQuestionsByIdAndQuizId = async (req, res) => {
        const { courseId, quizId, questionId } = req.params;
        const question = await dao.findQuestionsByIdAndQuizId(courseId, quizId, questionId);
        if (question) {
            res.json(question);
        } else {
            res.status(404).send("Question not found or does not belong to the specified quiz");
        }
    }


    const createQuestionByQuizID = async (req, res) => {
        const {  courseId, quizId } = req.params;
        const question = req.body;
        const newQuestion = await dao.createQuestionByQuizID(courseId, quizId, question);
        res.json(newQuestion);
    }

    const updateExistingQuestion = async (req, res) => {
        const { courseId, quizId, questionId } = req.params;
        const question = req.body;

        try {
            const existingQuestion = await dao.findQuestionsByIdAndQuizId( courseId, quizId, questionId);
            if (!existingQuestion) {
                return res.status(404).send("Question not found or does not belong to the specified quiz");
            }

            const updatedQuestion = await dao.updateExistingQuestion(courseId, quizId, questionId, question);
            res.json(updatedQuestion);
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while updating the question");
        }
    };




    app.get(`/api/questions`, findAllQuestions);
    app.get('/api/courses/:courseId/quizzes/:quizId/questions', findQuestionsByQuizId);
    app.get('/api/courses/:courseId/quizzes/:quizId/questions/:questionId', findQuestionsByIdAndQuizId);
    app.post(`/api/courses/:courseId/quizzes/:quizId/questions`, createQuestionByQuizID);
    app.put("/api/courses/:courseId/quizzes/:quizId/questions/:questionId", updateExistingQuestion);


}
