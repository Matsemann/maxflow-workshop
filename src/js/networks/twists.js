import {FlowNetwork} from "../network";

/**
 * IMPLEMENT
 *
 * Use the data below to generate a flow network for people's Twist preferences.
 * They can wish for as many as they want, but should maximum get "maxTwistsPerPerson".
 */
export const twists = [{
    name: "Twists",
    generateNetwork: () => {
        const net = new FlowNetwork();

        // Implement

        return net;
    }
}];

const data = {
    maxTwistsPerPerson: 3,
    twists: [
        {name: "banan", amount: 3},
        {name: "caramel", amount: 2},
        {name: "chocolate toffee", amount: 2},
        {name: "cocos", amount: 3},
        {name: "daim", amount: 3},
        {name: "eclairs", amount: 1},
        {name: "fransk nougat", amount: 2},
        {name: "golden toffee", amount: 2},
        {name: "japp", amount: 4},
        {name: "lakris", amount: 3},
        {name: "marsipan", amount: 4},
        {name: "nougatcrisp", amount: 5},
        {name: "nøtti", amount: 3},
    ],
    people: [
        {name: "Alexander", wishes: [{twist: "banan", amount: 2}, {twist: "caramel", amount: 1}, {twist: "marsipan", amount: 1}]},
        {name: "Arne", wishes: [{twist: "banan", amount: 2}, {twist: "chocolate toffee", amount: 2}]},
        {name: "Cathinka", wishes: [{twist: "cocos", amount: 1}, {twist: "daim", amount: 2}]},
        {name: "Eigil", wishes: [{twist: "eclairs", amount: 2}, {twist: "daim", amount: 2}, {twist: "chocolate toffee", amount: 2}]},
        {name: "Hallvard", wishes: [{twist: "eclairs", amount: 2}, {twist: "cocos", amount: 2}]},
        {name: "Jørund", wishes: [{twist: "fransk nougat", amount: 1}, {twist: "golden toffee", amount: 1}, {twist: "japp", amount: 1}]},
        {name: "Kim", wishes: [{twist: "japp", amount: 2}, {twist: "golden toffee", amount: 2}]},
        {name: "Kjetil", wishes: [{twist: "lakris", amount: 2}, {twist: "daim", amount: 2}]},
        {name: "Kristoffer", wishes: [{twist: "marsipan", amount: 1}, {twist: "japp", amount: 1}]},
        {name: "Lars", wishes: [{twist: "nougatcrisp", amount: 2}, {twist: "japp", amount: 2}]},
        {name: "Lars Andreas", wishes: [{twist: "nougatcrisp", amount: 1}, {twist: "lakris", amount: 2}]},
        {name: "Marius", wishes: [{twist: "fransk nougat", amount: 1}, {twist: "eclairs", amount: 1}, {twist: "lakris", amount: 1}]},
        {name: "Mats", wishes: [{twist: "fransk nougat", amount: 2}, {twist: "lakris", amount: 2}]},
        {name: "Peter", wishes: [{twist: "marsipan", amount: 1}, {twist: "nougatcrisp", amount: 2}]},
        {name: "Sissel", wishes: [{twist: "nougatcrisp", amount: 2}, {twist: "nøtti", amount: 2}]},
        {name: "Øyvind", wishes: [{twist: "nøtti", amount: 3}]},
    ]

};