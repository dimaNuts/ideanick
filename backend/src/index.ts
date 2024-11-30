import express from 'express';

const ideas = [
	{ nick: "cool-nick-idea-1", name: "Idea1", descriotion: "Idea1 description..." },
	{ nick: "cool-nick-idea-2", name: "Idea2", descriotion: "Idea2 description..." },
	{ nick: "cool-nick-idea-3", name: "Idea3", descriotion: "Idea3 description..." },
	{ nick: "cool-nick-idea-4", name: "Idea4", descriotion: "Idea4 description..." },
	{ nick: "cool-nick-idea-5", name: "Idea5", descriotion: "Idea5 description..." },
];

const expressApp = express();

expressApp.get('/ping', (req, res) => {
	res.send('pong');
});

expressApp.get('/ideas', (req, res) => {
	res.send(ideas);
})

expressApp.listen(3000, () => {
	console.info('Listening at http://localhost:3000');
})