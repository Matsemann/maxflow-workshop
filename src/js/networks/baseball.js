import {FlowNetwork} from "../network";

/**
 * IMPLEMENT
 *
 * See http://coursera.cs.princeton.edu/algs4/assignments/baseball.html
 *
 */
export const baseball = [
    {
        name: "Baseball",
        generateNetwork: () => {
            const net = new FlowNetwork();

            const {teams, points, remainingGames, upcomingGames} = usaData1; // which case
            const team = 4; // which team nr are we checking can win?

            // calculate our team's theoretical max score
            const maxScore = points[team] + remainingGames[team];

            // how many wins can the other teams then have?
            const maxWins = [];
            for (let i = 0; i < points.length; i++) {
                maxWins[i] = maxScore - points[i];
            }

            // Make nodes for the teams, limiting their number of wins
            for (let i = 0; i < teams.length; i++) {
                if (i === team) continue;
                net.createNode(teams[i]);
                net.createEdge(teams[i], "sink", maxWins[i]);
            }

            // Try to assign a winner to each game
            for (let i = 0; i < teams.length; i++) {
                if (i === team) continue;

                for (let j = i + 1; j < teams.length; j++) {
                    if (j === team) continue;
                    const gamesBetween = upcomingGames[i][j];
                    if (gamesBetween === 0) {
                        continue;
                    }

                    const gameName = teams[i] + " vs. " + teams[j];
                    net.createNode(gameName);
                    net.createEdge("source", gameName, gamesBetween);
                    net.createEdge(gameName, teams[i], 99);
                    net.createEdge(gameName, teams[j], 99);
                }
            }

            return net;
        }
    }
];


const usaData1 = {
    teams: ["New York", "Baltimore", "Boston", "Toronto", "Detroit"],
    points: [75, 71, 69, 63, 49], // W[i]
    remainingGames: [28, 28, 27, 27, 27], // R[i]
    upcomingGames: [ // G[i,j]
        [0, 3, 8, 7, 3],
        [3, 0, 2, 7, 4],
        [8, 2, 0, 0, 0],
        [7, 7, 0, 0, 0],
        [3, 4, 0, 0, 0],
    ]
};

const worldCupData2 = {
    teams: ["Poland", "Russia", "Brazil", "Iran", "Italy", "Cuba", "Argentina", "USA", "Japan", "Serbia", "Egypt", "China"],
    points: [6, 5, 5, 5, 4, 4, 3, 3, 2, 1, 1, 0], // W[i]
    remainingGames: [4, 5, 5, 4, 5, 5, 5, 4, 4, 5, 4, 4], // R[i]
    upcomingGames: [ // G[i,j]
        [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0],
        [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0],
        [0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1],
        [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0],
        [0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0]
    ]

};
