import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

let quizCount = 0;

app.use(cors());
app.use(express.json());

app.post('/take-quiz', (req, res) => {
	quizCount++;
    console.log("Quiz taken: " + quizCount);
	res.json({ message: 'Quiz taken', count: quizCount });

});

app.post('/reset-stats', (req, res) => {
    const { password } = req.body;
    if (password === process.env.PASSWORD) {
        quizCount = 0;
        res.json({ message: 'Stats reset', totalQuizzes: quizCount });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

app.get('/stats', (req, res) => {
    res.json({ count: quizCount });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});