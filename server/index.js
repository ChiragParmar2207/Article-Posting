const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');

process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION! Shutting down...');
	console.log(err.name, err.message);
	process.exit(1);
});

const DB = process.env.MONGO_URI;

mongoose.set('strictQuery', true);
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('MongoDB Cluster Connected');
	})
	.catch((error) => console.log('mongodb not connected.', error.message));

const PORT = process.env.PORT || 5050;

const server = app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});

process.on('unhandledRejection', (err) => {
	console.log('UNHANDLED REJECTION! Shutting down...');
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
