import {FlowNetwork} from "./network";
import {breadthFirst, calculateMaxFlow, findMinResidual, finishAlgorithm, updateResiduals} from "./maxflow";
import {longerOnes} from "./networks/longerOnes";

export function testSuite() {
    const results = {};

    describe("breadth first residual path", () => {
        it("should find residual path for a simple graph", () => {
            const net = new FlowNetwork();
            net.createNode("1");
            net.createEdge("source", "1", 2);
            net.createEdge("1", "sink", 5);

            expect(true, breadthFirst(net));
            expect("1", net.getNode("sink").residualParent);
            expect("source", net.getNode("1").residualParent);
        });
        it("should not find path for a graph where residual left is 0", () => {
            const net = new FlowNetwork();
            net.createNode("1");
            net.createEdge("source", "1", 2);
            net.createEdge("1", "sink", 5);

            net.getNode("1").residuals["sink"] = 0;
            net.getNode("sink").residuals["1"] = 5;

            expect(false, breadthFirst(net));
        });
        it("should find path for a graph where it needs to backtrack", () => {
            const net = new FlowNetwork();

            net.createNode("l1");
            net.createNode("l2");
            net.createNode("r1");
            net.createNode("r2");

            net.createEdge("source", "l1", 1);
            net.createEdge("source", "l2", 1);
            net.createEdge("l1", "r1", 1);
            net.createEdge("l1", "r2", 1);
            net.createEdge("l2", "r1", 1);
            net.createEdge("r1", "sink", 1);
            net.createEdge("r2", "sink", 1);

            // Assuming source -> l1 -> r1 -> sink has been used,
            // updating residuals to match
            net.getNode("source").residuals["l1"] = 0;
            net.getNode("l1").residuals = {"source": 1, "r1": 0, "r2": 1};
            net.getNode("r1").residuals = {"l1": 1, "l2": 0, "sink": 0};
            net.getNode("sink").residuals = {"r1": 1, "r2": 0};

            expect(true, breadthFirst(net));
            expect("r2", net.getNode("sink").residualParent);
            expect("l1", net.getNode("r2").residualParent);
            expect("r1", net.getNode("l1").residualParent);
            expect("l2", net.getNode("r1").residualParent);
            expect("source", net.getNode("l2").residualParent);
        });
        it("should find path of correct length for advanced graph", () => {
            const net = longerOnes[0].generateNetwork();

            breadthFirst(net);

            let steps = 0;
            let u = net.getNode("sink");
            while (u.name !== "source") {
                steps++;
                u = net.getNode(u.residualParent);
            }

            expect(2, steps);
        });
        results.breadth = true;
    });


    describe("find min residual", () => {
        it("should find min for simple network with one node", () => {
            const net = new FlowNetwork();
            net.createNode("1");
            net.createEdge("source", "1", 2);
            net.createEdge("1", "sink", 5);

            net.getNode("sink").residualParent = "1";
            net.getNode("1").residualParent = "source";

            expect(2, findMinResidual(net));
        });
        it("should find min for multiple nodes and updated residuals", () => {
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
        it("should find min for case when backtracking flow", () => {
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
        it("should set residual both ways", () => {
            const net = new FlowNetwork();
            net.createNode("1");

            net.createEdge("source", "1", 3);
            net.createEdge("1", "sink", 2);

            net.getNode("sink").residualParent = "1";
            net.getNode("1").residualParent = "source";

            updateResiduals(net, 2);

            expect(1, net.getNode("source").residuals["1"]);
            expect(0, net.getNode("1").residuals["sink"]);

            expect(2, net.getNode("sink").residuals["1"]);
            expect(2, net.getNode("1").residuals["source"]);
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

                expect(3, finishAlgorithm(calculateMaxFlow(net)));
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
