import {FlowNetwork} from "./network";
import {calculateMaxFlow, findMinResidual} from "./maxflow";

export function testSuite() {
    const results = {};

    describe("breadth first", () => {
        it("for a simple graph", () => {
            expect("a", "a");
        });
        it("for a graph where residue is 0", () => {
            expect("a", "a");
        });
        it("for a graph where it needs to backtrack", () => {
            expect("a", "a");
        });
        results.breadth = true;
    });


    describe("find min residual", () => {
        it("for one node only", () => {
            const net = new FlowNetwork();
            net.createNode("1");
            net.createEdge("source", "1", 2);
            net.createEdge("1", "sink", 5);

            net.getNode("sink").residualParent = "1";
            net.getNode("1").residualParent = "source";

            expect(2, findMinResidual(net));
        });
        it("for multiple nodes and updated residuals", () => {
            const net = new FlowNetwork();
            net.createNode("1");
            net.createNode("2");
            net.createNode("3");
            net.createNode("4");

            net.createEdge("source", "1", 9);
            net.createEdge("source", "2", 3);
            net.createEdge("source", "3", 4);
            net.createEdge("1", "2", 8);
            net.createEdge("1", "3", 6);
            net.createEdge("1", "3", 5);
            net.createEdge("2", "3", 4);
            net.createEdge("2", "4", 1);
            net.createEdge("1", "sink", 4);
            net.createEdge("3", "sink", 7);
            net.createEdge("4", "sink", 8);

            net.getNode("sink").residualParent = "3";
            net.getNode("1").residualParent = "source";
            net.getNode("2").residualParent = "1";
            net.getNode("3").residualParent = "2";
            net.getNode("3").residuals["sink"] = 3;
            net.getNode("4").residualParent = "2";

            expect(3, findMinResidual(net));
        });
        it("for when backtracking flow", () => {
            const net = new FlowNetwork();
            net.createNode("1");
            net.createNode("2");

            net.createEdge("source", "1", 9);
            net.createEdge("source", "2", 3);
            net.createEdge("2", "1", 8);
            net.createEdge("1", "sink", 6);
            net.createEdge("2", "sink", 5);

            net.getNode("sink").residualParent = "2";
            net.getNode("2").residualParent = "1";
            net.getNode("1").residuals["2"] = 4;
            net.getNode("1").residualParent = "source";

            expect(4, findMinResidual(net));
        });
        results.min = true;
    });


    describe("update residual", () => {
        it("should work", () => {
            expect("a", "a");
        });
        results.update = true;
    });

    if (results.min && results.breadth && results.update) {
        describe("full tests on max flow", () => {
            it("should get correct flow", () => {
                const net = new FlowNetwork();
                net.createNode("1");
                net.createNode("2");

                net.createEdge("source", "1", 2);
                net.createEdge("source", "2", 3);
                net.createEdge("1", "sink", 3);
                net.createEdge("2", "sink", 1);

               expect(3, calculateMaxFlow(net));
            });
            results.flow = true;
        });
    }

    return results;
}

// Mats' supersimple testingframework...

function describe(description, func) {
    try {
        func();
        console.log("OK: " + description);
    } catch (error) {
        error.message = description + " - " + error.message;
        console.log(error);
    }
}

function it(message, func) {
    try {
        func();
    } catch (error) {
        error.message = message + " - " + error.message;
        throw error;
    }
}

function expect(expected, actual) {
    if (expected !== actual) {
        throw new Error("expected " + expected + ", got " + actual);
    }
}
