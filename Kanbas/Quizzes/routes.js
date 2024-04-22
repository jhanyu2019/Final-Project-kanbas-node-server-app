import * as dao from "./dao.js";

export default function QuizzesRoutes(app) {

    const findAllQuizzes = async (req, res) => {
        const quizzes = await dao.findAllQuizzes();
        res.json(quizzes);


    };


    const findQuizzesByCourseId = async (req, res) => {
        const courseId = req.params.courseId;
        const quizzes = await dao.findQuizzesByCourseId(courseId);
        res.json(quizzes);
    };

    const findQuizByIdAndCourseId = async (req, res) => {
        const { courseId, quizId } = req.params;
        const quiz = await dao.findQuizByIdAndCourseId(quizId, courseId);
        if (quiz) {
            res.json(quiz);
        } else {
            res.status(404).send("Quiz not found or does not belong to the specified course");
        }
    }

    const createQuizByCourseId = async (req, res) => {
        const { courseId } = req.params;
        const quiz = req.body;
        const newQuiz = await dao.createQuizByCourseId(quiz, courseId);
        res.json(newQuiz);
    }


    const updateExistingQuiz = async (req, res) => {
        const { courseId, quizId } = req.params;
        const quiz = req.body;

        try {
            const existingQuiz = await dao.findQuizByIdAndCourseId(quizId, courseId);
            if (!existingQuiz) {
                return res.status(404).send("Quiz not found or does not belong to the specified course");
            }

            const updatedQuiz = await dao.updateExistingQuiz(quizId, courseId, quiz);
            res.json(updatedQuiz);
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while updating the quiz");
        }
    };




    app.get(`/api/quizzes`, findAllQuizzes);
    app.get(`/api/courses/:courseId/quizzes`, findQuizzesByCourseId);
    app.get("/api/courses/:courseId/quizzes/:quizId", findQuizByIdAndCourseId);
    app.post("/api/courses/:courseId/quizzes", createQuizByCourseId);
    app.put("/api/courses/:courseId/quizzes/:quizId", updateExistingQuiz);


}