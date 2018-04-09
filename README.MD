# Max flow workshop

A workshop where you
* Write an algorithm to solve maximum flow problems (Ford-Fulkerson/Edmonds-Karp)
* Model problems as max flow problems
* ... in your browser

### To run

```
npm install
npm start
```

Then browse to http://localhost:8099

Edit the files and refresh your browser to see the changes

## Tasks

This workshop contains javascript files, where you are supposed to fill in the blanks.
There are two types of tasks. First you will complete the algorithm. 
Then you will create your own flow networks to solve various problems.


### 1. Implement the algorithm

Before starting, it can be useful to get to know some of the code you have been handed.
The most important part is in `network.js`. This is the API for the network. As you can see,
when a network is created, the nodes `source` and `sink` are created for you.
Nodes can be created by supplying a *unique* name. Edges can be created by providing the names of 
the from and to nodes, and the capacity as the third parameter.

A node holds various values. The most relevant ones are `residuals` and `residualParent`.
Residuals contains the name of other nodes that is connected to it by an edge, and the capacity left.
Note that when an edge is created from `a` to `b`, a residual edge is also created in the opposite direction.
`residualParent` is for backtracking after the breadt first search.

When working with residual, you only have the name of the nodes. You can use `network.getNode("nodeName)`
to get the actual node when needed.

To implement the algorithm, follow the tasks below and edit in the `maxflow.js` file.
There are unit tests that can be run by clicking in the UI and watching the result in dev tools, 
see the test-files for expected behavior.

#### Implement breadth first search

Start from the source, and search until you find the sink.
When first seeing a node, set the `residualParent` to the current node you found it from and mark it as visited.
Remember that you only should follow edges having `residual > 0`.
The function should return true/false, whether a path from source to sink could be found or not.

Tip: To implement a queue in Javascript, you can use an array.
```
const queue = ["];
queue.push("source"); // add to back
let node = queue.shift(); // pop from front
```

Run the tests and verify that the implementation is correct before moving on.

#### Implement findMinResidual

Start from the sink, and move backwards through residualParents until you reach the source.
While doing that, find the smallest residue in the path and return it.
Make sure you use the residual *from* residualParent to the current node.

For instance, if sink's residual parent is node1, and node1's residual parent is source,
this means that you should find the min residual of node1->sink and source->node1 and return it.

Run the tests and verify that the implementation is correct before moving on.

#### Implement updateResiduals

Start from the sink and move backwards through residualParents in the same way.
This time you know the flow that can be added through that path. 
So remove residual from the path from residualParent to the current node, and remember
to add the same amount to the opposite residual path.

For instance, if we should add a flow of 2, and again have that sink's parent is node1, and node1's parent is source,
we should subtract 2 from node1->sink, and source->node1, and then add 2 to sink->node1 and node1->source.

Run the tests and verify that the implementation is correct before moving on.

#### Test some networks

If all tests are green, the algorithm should now be finished and usable on networks.
Select various networks from the dropdown and step through to view the steps of the algorithm.

Some networks are empty, those are up to you to implement ;)

### Implement networks


##TODO

* Render
* UI
* Algorithm
* Slides
  * Explain residual network
* Tasks
  * Explain datamodel, network -> model
  * Fill in blanks to make the algorithm solve the various networks
  * Implement own networks
* Publish
    * Build
    * GH pages