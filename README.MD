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

### Tasks

This workshop contains javascript files, where you are supposed to fill in the blanks.
There are two types of tasks. First you will complete the algorithm. 
Then you will create your own flow networks to solve various problems.


## 1. Implement the algorithm

Before starting, it can be useful to get to know some of the code you have been handed.
The most important part is in `network.js`. This is the API for the network. As you can see,
when a network is created, the nodes `source` and `sink` are created for you.
Nodes can be created by supplying a *unique* name. Edges can be created by providing the names of 
the from and to nodes, and the capacity as the third parameter.

A node holds various values. The most relevant ones are `residuals` and `residualParent`.
Residuals contains the name of other nodes that is connected to it by an edge, and the capacity left.
Note that when an edge is created from `a` to `b`, a residual edge is also created in the opposite direction.
`residualParent` is for backtracking after the breadt first search.

When working with a node, you only have the *name* of the other nodes. You can use `network.getNode("nodeName)`
to get the actual node it points to when needed.

To implement the algorithm, follow the tasks below and edit in the `maxflow.js` file.
There are unit tests that can be run by clicking in the UI and watching the result in dev tools, 
see the test-files for expected behavior.

### 1.1 Implement breadth first search

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

### 1.2 Implement findMinResidual

Start from the sink, and move backwards through residualParents until you reach the source.
While doing that, find the smallest residue in the path and return it.
Make sure you use the residual *from* residualParent to the current node.

For instance, if sink's residual parent is node1, and node1's residual parent is source,
this means that you should find the min residual of node1->sink and source->node1 and return it.

Run the tests and verify that the implementation is correct before moving on.

### 1.3 Implement updateResiduals

Start from the sink and move backwards through residualParents in the same way.
This time you know the flow that can be added through that path. 
So remove residual from the path from residualParent to the current node, and remember
to add the same amount to the opposite residual path.

For instance, if we should add a flow of 2, and again have that sink's parent is node1, and node1's parent is source,
we should subtract 2 from node1->sink, and source->node1, and then add 2 to sink->node1 and node1->source.

Run the tests and verify that the implementation is correct before moving on.

### 1.4 Test some networks

If all tests are green, the algorithm should now be finished and usable on networks.
Select various networks from the dropdown and step through to view the steps of the algorithm.

Some networks are empty, those are up to you to implement ;)

## 2. Implement networks

The fun with max flow is to use it to solve various problems.

Do them in the order you want.

### 2.1 Twists (easiest one)

People are very passionate about Twists, but I think we all can agree that Cocos is the best.

You are given:
 * A list of twists and the amount of each in the package
 * A list of people and their wishes
 * The maximum twists a person should get
 
Use this to make a flow network, fill in `js/networks/twists.js`. When solved using maximum flow, it should display
who gets what twists. Note that this will solve for maximum amount of twists being eaten,
not necessarily being fair...

### 2.2 Movie planning

You are the director of the upcoming movie "Die Hard: Max Flow Hard", 
and need to make a schedule for when the actors should practice on the various scenes.

You have the following:
 * A set of scenes, and for how many days each scene should be practiced
 * A list of actors, and the days which each actor is available
 * Which actors that should be present for each scene
 
Model the problem as a flow network to find a schedule that works, by filling in `js/networks/movieplanning.js`.

Hint: Some logic / precomputation is needed before making the network

### 2.3 Baseball

Given the standings in a league, you should determine if a given team
still has a mathematically chance to win the league. Here I have chosen baseball, as 
the games never can end in a draw, making it a bit easier.

```
team        wins    left    vs  NY  BAL BOS TOR DET
---------------------------------------------------
New York    75      28          -   3   8   7   3
Baltimore   71      28          3   -   2   7   4
Boston      69      27          8   2   -   0   0
Toronto     63      27          7   7   0   -   0
Detroit     49      27          3   4   0   0   -
```

Is it possible for Detroit to win the league? Well, they can get 49+27 = 76 points.
But for them to win, we will then have to assume that New York don't win another game.
New York have 8 games left with Boston, so if New York has to lose, then Boston will have to win
those 8 games, that gives Boston 77 points. So it's impossible for Detroit to win.

But figuring that out for complex cases by hand is hard, it's much better to model it as a flow network ;)

You are given:
 * An array of team names, where `teams[i]` is the name of team number `i`.
 * An array of points, where  `W[i]` is the amount of wins for team `i`.
 * A two-dimensional array of upcoming games between the teams. `G[i][j]` is
 the number of games between team `i` and `j` left.
 * An array of remaining games left for the teams, where `R[i]` is the number of games left for team `i`.
 Note that this number can be different than the total
 
To solve if a team can win the league, we can make a network as follows:
 
We decide that we want to check if team number `n` still can win the league.
We know they already have `W[n]` points, and `R[n]` game left, so they can get `teamNTotal = W[n] + R[n]` points.
This means that each other team `i` max should get `teamNTotal - W[i]` more wins (making it a draw on top of the league if that happens).

So we should make a node for each team other than team `n`, and connect them to the sink with and edge with capacity
of how many more wins the team can get.

Next we should make nodes for all the possible games being played. Each node should have a connection from the source,
with the capacity equal to the number of games between the two teams. For instance, we should have a
`New York vs. Baltimore`-node, with a capacity from the source to it of 3.
From a game-node, there should be one edge from it to each of the two teams involved, assigning a winner to each of the games.
Those edges can have infinity as capacity (or a high number, 99 wil do).

After solving for maximum flow, the possibility of winning can be determined by looking at the edges from the source.
If not all games can be played, they cannot win, as playing the last games will have to make on of the other teams get too many points.

In the data you have been given, try to change New York points to 74 and see if Detroit then can win. You
can also change it to use a different set of data, and solve for Japan.

### 2.4 Jupiter Orbiter

// TODO

## TODO

* Render
* UI
* Algorithm
* Slides
  * Explain residual network
* Tasks
  * Jupiter orbiter
* Publish
    * Build
    * GH pages