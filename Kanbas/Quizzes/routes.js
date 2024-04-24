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

            console.log('Updated Quiz:', updatedQuiz);
            res.json(updatedQuiz);
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while updating the quiz");
        }
    };

    const updateQuizPublishStatus = async (req, res) => {
        const { courseId, quizId } = req.params;
        const { isPublished } = req.body;

        try {
            const existingQuiz = await dao.findQuizByIdAndCourseId(quizId, courseId);
            if (!existingQuiz) {
                return res.status(404).send("Quiz not found or does not belong to the specified course");
            }

            const updatedQuiz = await dao.updateQuizPublishStatus(quizId, isPublished);
            res.json(updatedQuiz);
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while updating the quiz publish status");
        }
    };

    const deleteQuiz = async (req, res) => {
        const { courseId, quizId } = req.params;

        try {
            const existingQuiz = await dao.findQuizByIdAndCourseId(quizId, courseId);
            if (!existingQuiz) {
                return res.status(404).send("Quiz not found or does not belong to the specified course");
            }

            await dao.deleteQuiz(quizId, courseId);
            res.sendStatus(204);
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while deleting the quiz");
        }
    };

    const updateQuizPoints = async (req, res) => {
        const { courseId, quizId } = req.params;
        const { points } = req.body;

        try {
            const updatedQuiz = await dao.updateQuizPoints(quizId, courseId, points);
            console.log('Updated Quiz:', updatedQuiz); // Add this line
            res.json(updatedQuiz);
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while updating the quiz points");
        }
    };

    const updateQuizQuestionCount = async (req, res) => {
        const { courseId, quizId } = req.params;

        try {
            const existingQuiz = await dao.findQuizByIdAndCourseId(quizId, courseId);
            if (!existingQuiz) {
                return res.status(404).send("Quiz not found or does not belong to the specified course");
            }

            const questions = await dao.findQuestionsByQuizId(courseId, quizId);
            const questionCount = questions.length;

            const updatedQuiz = await dao.updateQuizQuestionCount(quizId, courseId, questionCount);

            console.log('Updated Quiz Question Count:', updatedQuiz);
            res.json(updatedQuiz);
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while updating the quiz question count");
        }
    };








    app.get(`/api/quizzes`, findAllQuizzes);
    app.get(`/api/courses/:courseId/quizzes`, findQuizzesByCourseId);
    app.get("/api/courses/:courseId/quizzes/:quizId", findQuizByIdAndCourseId);
    app.post("/api/courses/:courseId/quizzes", createQuizByCourseId);
    app.put("/api/courses/:courseId/quizzes/:quizId", updateExistingQuiz);
    app.put("/api/courses/:courseId/quizzes/:quizId/publish", updateQuizPublishStatus);
    app.delete("/api/courses/:courseId/quizzes/:quizId", deleteQuiz);

    app.put("/api/courses/:courseId/quizzes/:quizId/points", updateQuizPoints);
    app.put("/api/courses/:courseId/quizzes/:quizId/questionCount", updateQuizQuestionCount);



}
