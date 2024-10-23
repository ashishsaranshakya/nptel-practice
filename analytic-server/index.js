import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Visitor from './Visitor.js';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/take-quiz', async (req, res) => {
	const currentHour = new Date().toLocaleString('en-US', {
		timeZone: 'Asia/Kolkata',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		hour12: false,
	}).replace(',', '').replace(/\//g, '-').slice(0, 13);

	try {
		let visitor = await Visitor.findOne({ hour: currentHour });
		if (!visitor) {
			visitor = new Visitor({ hour: currentHour, count: 0 });
		}

		visitor.count++;
		await visitor.save();

		console.log(`Quiz taken for hour ${currentHour}: ${visitor.count}`);

		res.json({ message: 'Quiz taken', count: visitor.count });
	}
	catch (error) {
		console.error('Error saving quiz count:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.post('/reset-stats', async (req, res) => {
	const { password } = req.body;
	if (password === process.env.PASSWORD) {
		try {
			await Visitor.deleteMany({});
			res.json({ message: 'Stats reset' });
		} catch (error) {
			console.error('Error resetting stats:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	} else {
		res.status(401).json({ error: 'Unauthorized' });
	}
});

app.get('/stats', async (req, res) => {
	try {
		const stats = await Visitor.find().sort({ hour: 1 });
		res.json(stats);
	} catch (error) {
		console.error('Error fetching stats:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.listen(port, async () => {
	console.log(`Server running on port ${port}`);
	await mongoose.connect(process.env.MONGO_URI)
});