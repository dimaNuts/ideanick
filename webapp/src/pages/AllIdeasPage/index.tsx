import { trpc } from "../../lib/trpc";

export const AllIdeasPage = () => {

	const result = trpc.getIdeas.useQuery();
	console.log(result);
	return null;

	/*
		const ideas = [
			{ nick: "cool-nick-idea-1", name: "Idea1", descriotion: "Idea1 description..." },
			{ nick: "cool-nick-idea-2", name: "Idea2", descriotion: "Idea2 description..." },
			{ nick: "cool-nick-idea-3", name: "Idea3", descriotion: "Idea3 description..." },
			{ nick: "cool-nick-idea-4", name: "Idea4", descriotion: "Idea4 description..." },
			{ nick: "cool-nick-idea-5", name: "Idea5", descriotion: "Idea5 description..." },
		];
		
		return (
	
			<div>
				<h1>Ideanick</h1>
				{ideas.map((idea) => {
					return (
						<div key={idea.nick}>
							<h2>{idea.name}</h2>
							<p>{idea.descriotion}</p>
						</div>
	
					);
				})
	
				}
			</div>
		)
	*/
};
