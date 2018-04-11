import {FlowNetwork} from "../network";

/**
 * IMPLEMENT
 */
export const movieplanning = [
    {
        name: "Movie Planning",
        generateNetwork: () => {
            const net = new FlowNetwork();

            const {scenes, days, actors} = dieHardData;

            // Implement net

            return net;
        }
    }
];


const dieHardData = {
    scenes: [
        {
            name: "Love scene",
            daysToPractice: 1,
            actors: ["Mats", "Lars"]
        }, {
            name: "Intro",
            daysToPractice: 1,
            actors: ["Mats", "Peter"]
        }, {
            name: "Bad guy enters",
            daysToPractice: 2,
            actors: ["Jørund", "Peter"]
        }, {
            name: "Kills the bad guy",
            daysToPractice: 1,
            actors: ["Jørund", "Lars"]
        }
    ],
    days: ["Day1", "Day2", "Day3", "Day4", "Day5"],
    actors: {
        "Mats": ["Day1", "Day2", "Day3"],
        "Lars": ["Day1", "Day3", "Day5"],
        "Peter": ["Day1", "Day2", "Day4"],
        "Jørund": ["Day1", "Day2", "Day4", "Day5"],
    },
};

