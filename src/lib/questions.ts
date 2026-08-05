import { TrackId } from "./tracks";

export type Difficulty = "Easy" | "Medium" | "Hard" | "Complex";

export interface TestCase {
  in: string;
  out: string;
  hidden?: boolean;
}

export interface Question {
  track: TrackId;
  id: string;
  level: Difficulty;
  title: string;
  desc: string;
  fmt: string;
  tests: TestCase[];
  hints?: [string, string, string];
  note?: string;
  nqtTag?: string;
}

export const QUESTIONS: Question[] = [
  {
    track: "hackwithinfy", id: "range-array-sum", level: "Hard", title: "Range Array Sum",
    desc: "You have an array A of integers with n elements. There \nare q queries to process and each query consists of four \nintegers: l, r, x, and y. \n For the subarray of A ranging from index l to r, you need to \nassign a sequence of integers for each subsequent element. \nThe sequence should start from x and increase by y. This means: \n\u2022\nA[l] will be assigned the value of x. \n\u2022\nA[l+1] will be assigned the value of x + y. \n\u2022\nA[l+2] will be assigned the value of x + 2*y. \n\u2022\nContinuing this pattern, A[l+i] will be assigned the \nvalue of x + i*y, where i ranges from 0 to (r - l). \nFind the sum of all integers in A after processing all queries. \nSince answer can be large, return it modulo 109+7.",
    fmt: "",
    hints: ["Read the problem carefully.", "Think of edge cases.", "Optimize your approach."],
    tests: [
      { in: "5 \n5 \n5 \n0 \n3 \n0 \n5 \n0 2 1 2 \n0 1 6 5 \n2 3 8 0 \n2 4 9 6 \n3 4 8 9 \n          Sample output 1 \n51 \nExplanation-1 \nHere, n = 5 \nA = [5, 5, 0, 3, 0] \nq = 5 \nqueries = [[0, 2, 1, 2], [0, 1, 6, 5], [2, 3, 8, \n0], [2, 4, 9, 6], [3, 4, 8, 9]] \nfor query 1: \nl = 0, r = 2, x = 1, y = 2\nA[0] = 1 \nA[1] = 3 \nA[2] = 5 \nSo, A = [1, 3, 5, 3, 0] \nfor query 2: \nl = 0, r = 1, x = 6, y = 5\nA[0] = 6 \nA[1] = 11 \nSo, A = [6, 11, 5, 3, 0] \nfor query 3: \nl = 2, r = 3, x = 8, y = 0\nA[2] = 8 \nA[3] = 8 \nSo, A = [6, 11, 8, 8, 0] \nfor query 4: \nl = 2, r = 4, x = 9, y = 6\nA = [6, 11, 9, 15, 21] \nfor query 5: \nl = 3, r = 4, x = 8, y = 9\nA = [6, 11, 9, 8, 17] \nHence, answer is 6+11+9+8+17 = 51 \nSample Input 2 \n5 \n3 \n9 \n2 \n5 \n4 \n5 \n1 2 6 3 \n1 2 2 8 \n1 2 5 5 \n1 3 1 8 \n1 2 2 9", out: "51" },
      { in: "5 \n0 \n1 \n0 \n0 \n1 \n5 \n1 2 7 7 \n0 1 3 6 \n1 1 1 1 \n3 4 9 1 \n2 3 1 0", out: "37" },
    ]
  },
  {
    track: "hackwithinfy", id: "maximize-sum-with-operations", level: "Hard", title: "Maximize Sum with Operations",
    desc: "You are given three integers X,Y and Z and two \narrays A and B both of length N. You are also given an \ninteger sum which is initially equal to 0. \nYou have perform N operations and in each ith operation you \nmust do only one of the following : \n1. \nSubtract B[i] from sum. \n2. \nDecrease both of X and Y by 1, then add A[i] * X * Y * \nZ to sum. \n3. \nDecrease both of Y and Z by 1, then add A[i] * X * Y * \nZ to sum. \nHowever, after each operation, X,Y and Z must all remain greater \nthan or equal to 0. \nFind the maximum sum you can obtain after performing all \noperations. Since answer can be large, return it modulo 109+7.",
    fmt: "",
    hints: ["Read the problem carefully.", "Think of edge cases.", "Optimize your approach."],
    tests: [
      { in: "1\n2", out: "3" },
    ]
  },
  {
    track: "hackwithinfy", id: "max-beautiful-tree-set", level: "Hard", title: "Max Beautiful Tree Set",
    desc: "You are given a tree with n nodes rooted at node 1. You are also \ngiven an array color representing the colour of each node in the \ntree. \nA set of nodes is beautiful if it satisfies the following conditions: \n\u2022 \nAll nodes in the set have different colors. \n\u2022 \nFor any pair of nodes (u, v), either u is the ancestor of v or v is \nthe ancestor of u within the tree. \nYou're given q queries where each query provides an \ninteger s representing a node in the tree. \nThe answer to each query is the maximum size of a beautiful \nset that can be formed by selecting nodes from the subtree \nrooted at node s. \nFind the sum of answers to all queries. Since answer can be \nlarge, return it modulo 109+7. \nNotes: \n\u2022 \nThe parent of node 1 is 0.",
    fmt: "",
    hints: ["Read the problem carefully.", "Think of edge cases.", "Optimize your approach."],
    tests: [
      { in: "1\n2", out: "3" },
    ]
  },
  {
    track: "hackwithinfy", id: "range-multiply-and-sum", level: "Hard", title: "Range Multiply and Sum",
    desc: "You\u2019re given an array A of n integers and q queries.\nEach query can be one of the following two types:\n\u2022\t Type 1 Query: (1, l, r) - Replace A[i] with \n(i-l+1)*A[l] for each index i, where l <= i <= r.\n\u2022\t Type 2 Query: (2, l, r) - Calculate the sum of the \nelements in A from index l to index r.\nFind the sum of answers to all type 2 queries. Since \nanswer can be large, return it modulo 109+7.",
    fmt: "",
    hints: ["Read the problem carefully.", "Think of edge cases.", "Optimize your approach."],
    tests: [
      { in: "7\n1\n4\n5\n1\n6\n7\n8\n5\n1 1 6\n1 1 5\n2 5 5\n2 3 4\n2 3 3", out: "60\nSample Output Description 1\nHere, n = 7\nA = [1, 4, 5, 1, 6, 7, 8]\nq = 5\nqueries = [[1, 1, 6], [1, 1, 5], [2, 5, 5], [2, 3, 4], [2, 3, 3]]\nfor query 1 -> (1, 1, 6)\nApplying the operation on subarray from index 1 to \n6, A becomes, A = [1, 4, 8, 12, 16, 20, 24]\nfor query 2 -> (1, 1, 5)\nApplying the operation on subarray from index 1 to \n5, A becomes, A = [1, 4, 8, 12, 16, 20, 24]\nfor query 3 -> (2, 5, 5)\ncalculate sum of array from index 5 to 5 -> sum = \nA[5] = 20\nfor query 4 -> (2, 3, 4)\ncalculate sum of array from index 3 to 4 -> sum = \nA[3]+A[4] = 28\nfor query 5 -> (2, 3, 3)\ncalculate sum of array from index 3 to 3 -> sum = \nA[3] = 12\nHence, answer is 20+28+12 = 60" },
      { in: "7\n3\n7\n4\n2\n5\n3\n7\n5\n1 0 4\n2 0 1\n1 3 6\n2 3 3\n2 0 5", out: "111\nSample Output Description 2\nHere, n = 7\nA = [3, 7, 4, 2, 5, 3, 7]\nq = 5\nqueries = [[1, 0, 4], [2, 0, 1], [1, 3, 6], [2, 3, 3], [2, 0, 5]]\nfor query 1 -> (1, 0, 4)\nApplying the operation on subarray from index 0 to \n4, A becomes, A = [3, 6, 9, 12, 15, 3, 7]\nfor query 2 -> (2, 0, 1)\ncalculate sum of array from index 0 to 1 -> sum = \nA[0]+A[1] = 9\nfor query 3 -> (1, 3, 6)\nApplying the operation on subarray from index 3 to \n6, A becomes, A = [3, 6, 9, 12, 24, 36, 48]\nExternal Document \u00a9 2025 Infosys Limited \nfor query 4 -> (2, 3, 3)\ncalculate sum of array from index 3 to 3 -> sum = \nA[3] = 12\nfor query 5 -> (2, 0, 5)\ncalculate sum of array from index 0 to 5 -> sum = \nA[0]+A[1]+A[2]+A[3]+A[4]+A[5] = 90\nHence, answer is 9+12+90 = 111" },
      { in: "7\n1\n8\n6\n10\n5\n6\n9\n5\n2 0 3\n1 2 3\n1 0 6\n2 1 4\n2 6 6", out: "46\nSample Output Description 3\nHere, n = 7\nA = [1, 8, 6, 10, 5, 6, 9]\nq = 5\nqueries = [[2, 0, 3], [1, 2, 3], [1, 0, 6], [2, 1, 4], [2, 6, 6]]\nfor query 1 -> (2, 0, 3)\ncalculate sum of array from index 0 to 3 -> sum = \nA[0]+A[1]+A[2]+A[3] = 25\nfor query 2 -> (1, 2, 3)\nApplying the operation on subarray from index 2 to \n3, A becomes, A = [1, 8, 6, 12, 5, 6, 9]\nfor query 3 -> (1, 0, 6)\nApplying the operation on subarray from index 0 to \n6, A becomes, A = [1, 2, 3, 4, 5, 6, 7]\nfor query 4 -> (2, 1, 4)\ncalculate sum of array from index 1 to 4 -> sum = 14\nfor query 5 -> (2, 6, 6)\ncalculate sum of array from index 6 to 6 -> sum = 7\nHence, answer is 25+14+7 = 46\nInput Format\nThe first line contains an integer, n, denoting the \nnumber of elements in A.\nEach line i of the n subsequent lines (where 0 \u2264 i < \nn) contains an integer describing A[i].\nThe next line contains an integer, q, denoting the \nnumber of rows in queries.\nEach line i of the q subsequent lines (where 0 \u2264 \ni < q) contains 3 space separated integers each \ndescribing the row queries[i].\nThe 3 space separated integers denote the value of \neither (1,l,r) or (2,l,r) for the i-th query.\nConstraints\n1 <= n <= 10^5\n1 <= A[i] <= 10^5\n1 <= q <= 10^5\n0 <= queries[i][j] <= 10^5\nSample Test Cases\nCase 1\nInput:\n7\n1\n4\n5\n1\n6\n7\n8\n5\n1 1 6\n1 1 5\n2 5 5\n2 3 4\n2 3 3\nOutput:\n60" },
    ]
  },
  {
    track: "hackwithinfy", id: "max-sum-of-k-distinct-subarray", level: "Medium", title: "Max Sum of K-Distinct Subarray",
    desc: "You are given an array A of length N and an \ninteger\u00a0k.\nIt is given that a subarray from l to r is considered \ngood, if the number of distinct elements in that \nsubarray doesn\u2019t exceed k. Additionally, an empty \nsubarray is also a good subarray and its sum is \nconsidered to be zero.\nFind the maximum sum of a good subarray.",
    fmt: "",
    hints: ["Read the problem carefully.", "Think of edge cases.", "Optimize your approach."],
    tests: [
      { in: "11\n2\n1\n2\n2\n3\n2\n3\n5\n1\n2\n1\n1", out: "12\nSample Output Description 1\nHere, N = 11, k = 2\nA = [1, 2, 2, 3, 2, 3, 5, 1, 2, 1, 1]\nWe can select the subarray = [2, 2, 3, 2, 3]\nIt is a good subarray because it contains at most k \ndistinct elements.\nIts sum = 2+2+3+2+3 = 12\nSo, our answer is 12." },
      { in: "3\n1\n-1\n-2\n-3\nExternal Document \u00a9 2025 Infosys Limited", out: "0\nSample Output Description 2\nHere, N = 3, k = 1\nA = [-1, -2, -3]\nIt is optimal to choose empty subarray.\nSo, our answer is 0." },
      { in: "5\n5\n-1\n1\n3\n2\n-1", out: "6\nSample Output Description 3\nHere, N = 5, k = 5\nA = [-1, 1, 3, 2, -1]\nIt is optimal to choose the subarray = [1, 3, 2].\nIts sum = 1+3+2 = 6.\nHence, our answer is 6.\nInput Format\nThe first line contains an integer, N, denoting the \nnumber of elements in A.\nThe next line contains an integer, k, denoting the \nlimit on the distinct elements.\nEach line i of the N subsequent lines (where 0 \u2264 i < \nN) contains an integer describing A[i].\nConstraints\n1 <= N <= 10^5\n1 <= k <= n\n-10^5 <= A[i] <= 10^5\nSample Test Cases\nCase 1\nInput:\n11\n2\n1\n2\n2\n3\n2\n3\n5\n1\n2\n1\n1\nExternal Document \u00a9 2025 Infosys Limited \nOutput:\n12" },
    ]
  },
  {
    track: "hackwithinfy", id: "minimize-initial-oil-capacity", level: "Medium", title: "Minimize Initial Oil Capacity",
    desc: "You have an oil tank with a capacity of C litres that \ncan be bought and sold by N people. The people \nare standing in a queue are served sequentially in \nthe order of array A.\nSome of them want to sell a litre of oil and some of \nthem want to buy a litre of oil and A describes this. \nHere, A[i] = 1 denotes that the person wants to sell \na litre of oil and A[i] = -1 denotes that the person \nwants to buy a litre of oil.\nWhen a person wants to sell a litre of oil but the \ntank is full, they cannot sell it and become upset. \nSimilarly, when a person wants to buy a litre of \noil but the tank is empty, they cannot buy it and \nbecome upset. Both these cases cause disturbances.\nYou can minimize the disturbance by filling the tank \ninitially with a certain X litres of oil.\nFind the minimum initial amount of oil X that results \nin the least number of disturbances.",
    fmt: "",
    hints: ["Read the problem carefully.", "Think of edge cases.", "Optimize your approach."],
    tests: [
      { in: "1\n2", out: "3" },
    ]
  },
  {
    track: "hackwithinfy", id: "minimum-army-reduction-moves", level: "Medium", title: "Minimum Army Reduction Moves",
    desc: "General Ali has devised a strategic game to reduce \nan enemy army of N soldiers to just 1 soldier using a \nminimal number of moves.\nThe game allows the following three types of \nmoves:\n1.\tReduce the enemy army by 1 soldier.\n2.\tReduce the enemy army by half of its current \nsoldiers, rounding down to the nearest integer.\n3.\tReduce the enemy army by two-thirds of its \ncurrent soldiers, rounding down to the nearest \ninteger.\nEach move must ensure that the resulting number \nof soldiers is an integer.\nFind the minimum number of moves required to \nreduce enemy army to just 1 soldier.",
    fmt: "",
    hints: ["Read the problem carefully.", "Think of edge cases.", "Optimize your approach."],
    tests: [
      { in: "1\n2", out: "3" },
    ]
  },
  {
    track: "hackwithinfy", id: "minimum-time-to-invade", level: "Medium", title: "Minimum Time to Invade",
    desc: "General Ali has initiated an invasion in the shape \nof an N\u00d7M grid behind enemy lines given by a 2D \narray Q.\nThe grid consists of cells represented by the \nfollowing characters:\n1.\t\u2018*\u2019: Represents a block cell that cannot be visited.\n2.\t\u2018A\u2019: Represents a cell that has been invaded by \nGeneral Ali\u2019s army.\n3.\t\u2018E\u2019: Represents a cell that contains the enemy\u2019s \narmy.\nGeneral Ali\u2019s invasion progresses as follows: At each \nsecond, any cell marked \u2018E\u2019 that shares a side with a \ncell marked \u2018A\u2019 is invaded by General Ali\u2019s army.\nFind the minimum time it will take for General Ali\u2019s \narmy to invade all enemy cells (\u2018E\u2019) in the grid. If it\u2019s \nnot possible to invade all enemy cells, return \u22121.",
    fmt: "",
    hints: ["Read the problem carefully.", "Think of edge cases.", "Optimize your approach."],
    tests: [
      { in: "1\n2", out: "3" },
    ]
  },
  {
    track: "hackwithinfy", id: "maximum-expert-number", level: "Hard", title: "Maximum Expert Number",
    desc: "A company ABC has N employees.\nFor some reason, the company\u2019s building is a bit \nweird.\n\u2022\t\nIt has one office on each floor and in each \noffice works one employee.\n\u2022\t\nEach employee i works on the ith floor and \nhas skill Ai.\n\u2022\t\nEach employee can belong to at most one \nteam.\n\u2022\t\nEach team should have employees working \nin consecutive floors from i to j. In other words, \nthe teams should be divided in such a way that no \nemployee of one team can walk into the project \nspace of another team.\nABC uses a metric which is called the expert \nnumber which is calculated as the sum of all the \nabsent expert values from each team of employees. \nThe absent expert value of each team is the first skill \nstarting from 0 which is not present in the team.\nIt is given that a bigger expert number is a better \nexpert number. Hence, you need to divide the \nemployees into teams such that the company\u2019s \nexpert number is as large as possible. \nFind the maximum expert number that can be \nobtained.",
    fmt: "",
    hints: ["Read the problem carefully.", "Think of edge cases.", "Optimize your approach."],
    tests: [
      { in: "4\n0\n2\n1\n1", out: "3\nSample Output Description 1\nHere, N = 4\nA = [0, 2, 1, 1]\nWe can divide the employees in the following teams \n-> [0, 2, 1], [1]\nexpert value of team [0, 2, 1] = 3\nexpert value of team [1] = 0\nSo, expert number = 3+0 = 3\nPlease note that there is no other way to divide the \nemployees such that expert number is greater than \n3.\nHence, the maximum value of expert number is 3." },
      { in: "5\n0\n1\n2\n1\n0", out: "5\nSample Output Description 2\nHere, N = 5\nA = [0, 1, 2, 1, 0]\nWe can divide the employees in the following teams \n-> [0, 1, 2], [1, 0]\nexpert value of team [0, 1, 2] = 3\nexpert value of team [1, 0] = 2\nSo, expert number = 3+2 = 5\nPlease note that there is no other way to divide the \nemployees such that expert number is greater than \n5.\nHence, the maximum value of expert number is 5." },
      { in: "10\n0\n1\n0\n1\nExternal Document \u00a9 2025 Infosys Limited \n1\n0\n3\n2\n1\n0", out: "10\nSample Output Description 3\nHere, N = 10\nA = [0, 1, 0, 1, 1, 0, 3, 2, 1, 0]\nWe can divide the employees in the following teams \n-> [0, 1], [0, 1], [1, 0, 3, 2], [1, 0]\nexpert value of team [0, 1] = 2\nexpert value of team [1, 0, 3, 2] = 4\nSo, expert number = 2 + 2 + 4 + 2 = 10\nPlease note that there is no other way to divide the \nemployees such that expert number is greater than \n10.\nHence, the maximum value of expert number is 10.\nInput Format\nThe first line contains an integer, N, denoting the \nnumber of elements in A.\nEach line i of the N subsequent lines (where 0 \u2264 i < \nN) contains an integer describing A[i].\nConstraints\n1 <= N <= 10^5\n1 <= A[i] <= 10^3\nSample Test Cases\nCase 1\nInput:\n4\n0\n2\n1\n1\nOutput:\n3" },
    ]
  },
  {
    track: "hackwithinfy", id: "min-ranges-in-connected-component", level: "Hard", title: "Min Ranges in Connected Component",
    desc: "You are given a graph with n nodes. Initially, the \ngraph is disconnected, meaning it contains zero \nedges.\nEach node has a value written on it such that the ith \nnode has a value i.\nWe say that a range [l, r] is covered in a set s, if for \neach i from l to r, i appears in s.\nNow, let\u2019s define beauty(s), as the minimum \nnumber of covered ranges, such that each element \nof s belongs to at least one of these ranges. For \nexample: beauty([1, 2, 4, 5, 8, 11]) = 4 (covered \nranges are [1, 2], [4, 5], [8] and [11]).\nYou have to process q queries that are either of the \nfollowing types:\n\u2022\t Type 1 - (1, i, j): Add an edge between i and j.\n\u2022\t Type 2 - (2, u, 0): Find the number of covered \nranges in the connected component of u.\nFind the sum of answers to all type 2 queries.",
    fmt: "",
    hints: ["Read the problem carefully.", "Think of edge cases.", "Optimize your approach."],
    tests: [
      { in: "2\n1\n3\n2 1 0", out: "1\nSample Output Description 1\nHere, n = 2, q = 1, t = 3\nqueries = [[2, 1, 0]]\nfor query1 -> As there are no edges in the graph, \nthe connected component of 1 contain only node 1.\nonly one covered range required i.e. [1, 1]\nHence, answer for this query is 1.\nSo, the answer is 1." },
      { in: "2\n3\n3\n2 1 0\nExternal Document \u00a9 2025 Infosys Limited \n1 1 2\n2 1 0", out: "2\nSample Output Description 2\nHere, n = 2, q = 3, t = 3\nqueries = [[2, 1, 0], [1, 1, 2], [2, 1, 0]]\nfor query1 -> (2, 1, 0)\nconnected component of 1 = {1}\nonly one covered range required i.e. [1, 1]\nHence, answer for this query is 1.\nfor query2 -> (1, 1, 2)\nAdd an edge between 1 and 2.\nfor query3 -> (2, 1, 0)\nconnected component of 1 = {1, 2}\nonly one covered range required i.e. [1, 2]\nHence, answer for this query is 1.\nSo, the answer is 1 + 1 = 2." },
      { in: "10\n3\n3\n1 1 4\n2 1 0\n2 4 0", out: "4\nSample Output Description 3\nHere, n = 10, q = 3, t = 3\nqueries = [[1, 1, 4], [2, 1, 0], [2, 4, 0]]\nfor query1 -> (1, 1, 4)\nAdd an edge between 1 and 4\nfor query2 -> (2, 1, 0)\nconnected component of 1 = {1, 4}\ntwo covered ranges are required i.e. [1, 1] and [4, 4]\nHence, answer for this query is 2.\nfor query3 -> (2, 4, 0)\nconnected component of 4 = {1, 4}\ntwo covered ranges are required i.e. [1, 1] and [4, 4]\nHence, answer for this query is 2.\nSo, the answer is 2 + 2 = 4.\nInput Format\nThe first line contains an integer, n, denoting the \nsize of the graph.\nThe next line contains an integer, q, denoting the \nnumber of rows in queries.\nThe next line contains an integer, t, denoting the \nnumber of columns in queries.\nEach line i of the q subsequent lines (where 0 \u2264 \ni < q) contains t space separated integers each \ndescribing the row queries[i].\nConstraints\n1 <= n <= 10^5\n1 <= q <= 10^5\n3 <= t <= 3\n0 <= queries[i][j] <= n\nSample Test Cases\nCase 1\nInput:\n2\n1\n3\n2 1 0\nOutput:\n1" },
    ]
  },
  {
    track: "hackwithinfy", id: "min-jumps-on-circular-table", level: "Medium", title: "Min Jumps on Circular Table",
    desc: "A group of N people are seated around a circular \ntable to play a game.\nThe game involves jumping from one chair to \nanother. Each person sitting on chair i can jump A[i] \nchairs to either the right or left in one jump where 0 \n< i < N+1.\nBob, sitting on chair X, needs to reach chair Y, where \nthe escape door is located.\nFind the minimum number of jumps required to \nreach chair Y from chair X. If this is impossible using \nthe given jump distances, then return -1.",
    fmt: "",
    hints: ["Read the problem carefully.", "Think of edge cases.", "Optimize your approach."],
    tests: [
      { in: "1\n2", out: "3" },
    ]
  },
  {
    track: "hackwithinfy", id: "probability-of-great-chain", level: "Hard", title: "Probability of Great Chain",
    desc: "You are given two boxes where one contains an \ninfinite number of blue balls and the other contains \nan infinite number of red balls. We can construct \na chain of balls by choosing one of the boxes and \ntaking out a ball from it and inserting it at the end \nof the chain.\nA chain is called good if after each time we insert a \nnew ball, the number of blue balls doesn\u2019t exceed \nthe number of red balls by more than K. In other \nwords, if after adding the ith ball we have B[i] blue \nballs and R[i] red balls then it must satisfy B[i] \u2264 R[i] \n+ K.\nA chain is called great if it is a good chain and if we \ntake the reversed chain the following conditions \nsatisfy:\n\u2022\t Every blue ball in the reversed chain is matched \nwith a red ball in the original chain.\n\u2022\t Every red ball in the reversed chain is matched \nwith a blue ball in the original chain.\nYou are given two integers B and R. Let the \nprobability of choosing the box with the blue balls \nbe (B / 106) and (R / 106) be the probability of \nchoosing the box with red balls.\nFind the probability of creating a great chain of \nlength N. Since the answer can be large, return it \nmodulo 109 + 7.",
    fmt: "",
    hints: ["Read the problem carefully.", "Think of edge cases.", "Optimize your approach."],
    tests: [
      { in: "1\n2", out: "3" },
    ]
  },
  {
    track: "hackwithinfy", id: "maximize-array-amazingness", level: "Hard", title: "Maximize Array Amazingness",
    desc: "You are given an array A of size N.\nYou can partition A into multiple subarrays such \nthat each element belongs to exactly one subarray \nand each subarray has a length of at least K.\nThe beauty of a subarray is the maximum bitwise \nXOR of the values of a subset in that subarray. The \namazingness of a partitioned array is the sum of \nbeauties of its subarrays.\nFind the maximum possible amazingness of A.\nNote:\n\u2022\t A subarray is a contiguous part of the array.",
    fmt: "",
    hints: ["Read the problem carefully.", "Think of edge cases.", "Optimize your approach."],
    tests: [
      { in: "1\n2", out: "3" },
    ]
  },
  {
    track: "hackwithinfy", id: "min-k-for-directed-path-length", level: "Hard", title: "Min K for Directed Path Length",
    desc: "You are given a permutation p of length n and an \ninteger m. You now need to construct a directed \ngraph from the given permutation.\nIt is given that an edge exists between i and j if ai \n< aj and abs(i - j) <= k, where abs(x) is the absolute \nvalue of x.\nFind the minimum value of k such that the longest \npath of the resulting graph is greater than or equal \nto m.\nNotes:\n\u2022\t The length of the path is equal to the number of \nnodes in that path.",
    fmt: "",
    hints: ["Read the problem carefully.", "Think of edge cases.", "Optimize your approach."],
    tests: [
      { in: "5\n2\n1\n3\n2\n5\n4", out: "1\nSample Output Description 1\nHere, n = 5, m = 2\np = [1, 3, 2, 5, 4]\nIf k >= 1 then, directed edge 1 -> 2 exists, so, we can \ntake the path 1 -> 2.\nHence, the minimum value of k required is 1.\nSo, answer is 1." },
      { in: "5\n3\n1\n3\n2\n5\n4\nExternal Document \u00a9 2025 Infosys Limited", out: "2\nSample Output Description 2\nHere, n = 5, m = 3\np = [1 ,3, 2, 5, 4]\nIf k >= 2, then we can take the path 1 -> 2 -> 3.\nHence, the minimum value of k required is 2.\nSo, the answer is 2." },
      { in: "5\n1\n1\n2\n3\n4\n5", out: "0\nSample Output Description 3\nHere, n = 5, m = 1\np = [1, 2, 3, 4, 5]\nAny node (without any edges) has a path of length \n1, so the minimum value k is 0.\nSo, answer is 0.\nInput Format\nThe first line contains an integer, n, denoting the \nnumber of elements in p.\nThe next line contains an integer, m, denoting the \nlength of the path.\nEach line i of the n subsequent lines (where 0 \u2264 i < \nn) contains an integer describing p[i].\nConstraints\n1 <= n <= 10^5\n1 <= m <= n\n1 <= p[i] <= n\nSample Test Cases\nCase 1\nInput:\n5\n2\n1\n3\n2\n5\n4\nOutput:\n1\nExternal Document \u00a9 2025 Infosys Limited" },
    ]
  },
  {
    track: "hackwithinfy", id: "maximize-xp-from-chests", level: "Hard", title: "Maximize XP from Chests",
    desc: "Bob is playing a game called \u201cSome Help\u201d.\nIn this game, there are N soldiers, where N is an \neven number. There are also N treasure chests, each \nwith a bonus value given by the array Bonus. Here, \nBonus[i] denotes the bonus value for the ith chest.\nThe power of each soldier is described by an array \nA of size N. For each i, the power of the ith soldier \nis an integer between 1 and N/2, and each number \nbetween 1 and N/2 occurs exactly twice in A.\nThe game has N rounds and each round proceeds \nas follows:\n1.\tFor each ith player, Bob finds the first player \non their right whose power is a multiple of the \npower of the ith player. Let\u2019s call this player R.\n2.\tIf no such player R is found, Bob does nothing.\n3.\tIf such a player R is found, Bob can choose a chest \nin the range [i, R] that gives the maximum bonus. \nLet\u2019s call the bonus of this chest as X.\n4.\tThe total XP is initially zero and for each round it \nis increased by X.\nFind the total XP that Bob can obtain from all N \nrounds.\nNote:\n\u2022\t Each treasure chest can be used any number of \ntimes.",
    fmt: "",
    hints: ["Read the problem carefully.", "Think of edge cases.", "Optimize your approach."],
    tests: [
      { in: "1\n2", out: "3" },
    ]
  },
  {
    track: "hackwithinfy", id: "valid-frequency-pairs", level: "Hard", title: "Valid Frequency Pairs",
    desc: "You are given an array A of length N.\nYou have two functions defined as follows:\n\u2022\t frequency(left, right, value): Returns the number \nof elements in the range [left, right] that are \nequal to value.\n\u2022\t distinct(left, right): Returns the number of distinct \nelements in the range [left, right].\nFind the number of pairs (i, j) that satisfy the \nfollowing condition:\n\u2022\t frequency(1 , i , A[i]) + frequency(j , N , A[j]) \u2264 \n.[distinct(1 , i) / 2] + [distinct(j , N) / 2].\nSince the answer can be very large, return it modulo \n109+7.\nNote:\n\u2022\t Here \u230aX\u230b represents the greatest integer less \nthan or equal to X.\n\u2022\t 1 \u2264 i < j \u2264 N",
    fmt: "",
    hints: ["Read the problem carefully.", "Think of edge cases.", "Optimize your approach."],
    tests: [
      { in: "1\n2", out: "3" },
    ]
  },
  {
    track: "hackwithinfy", id: "tree-subtree-beauty-queries", level: "Hard", title: "Tree Subtree Beauty Queries",
    desc: "You are given a tree which consists of N nodes. You \nalso will be given two distinct nodes A and B.\nYou are also given an array P where the parent of \nnode U is given by P[U].\nWe define beauty of a node (U, V) as the number of \nnodes that belong to both:\n\u2022\t The subtree of U when the tree is rooted at A.\n\u2022\t The subtree of U when the tree is rooted at B.\nYou are given a 2D array Queries which consists of \nQ queries. For each query you are given two nodes \nU and V (U can be equal to V) and the answer to the \nquery is the beauty of (U, V).\nLet K be equal to the answer to the last query \n(initially 0), then U and V changes as follows after \neach query:\n\u2022\t U = (U + K) mod N + 1.\n\u2022\t V = (V + K) mod N + 1.\nFind the sum of answer to all queries. Since the \nanswer can be large, return it modulo 109+7.",
    fmt: "",
    hints: ["Read the problem carefully.", "Think of edge cases.", "Optimize your approach."],
    tests: [
      { in: "1\n2", out: "3" },
    ]
  },
  {
    track: "hackwithinfy", id: "maximum-taste-points", level: "Medium", title: "Maximum Taste Points",
    desc: "You want to buy food from a store. You have a\nscoring system that uses a unit called taste points\n.\nEach time you buy a type of food, you can measure\nits tastiness by the number of taste points you get\nfrom that food.\nYou have N types of food. You can buy any type\nany number of times, as long as the total number\nof meals does not exceed M.\nHowever, you don't want to grow tired of a food if\nyou buy it too often. Therefore, you will get v[i] \u2212\nd[i] \u00d7 (ti \u2212 1) taste points when you buy the i-th\ntype of food for the ti-th time.\nFind the maximum number of taste points you can\nachieve.\nSample Test Cases\nCase 1",
    fmt: "",
    hints: ["Read the problem carefully.", "Think of edge cases.", "Optimize your approach."],
    tests: [
      { in: "1\n2", out: "3" },
    ]
  },
  {
    track: "hackwithinfy", id: "match-keys-to-locks-parity", level: "Hard", title: "Match Keys to Locks Parity",
    desc: "You are given N locks in a row (1-indexed). Each lock\ni has a value L[i]. There is also one key under each\nlock, and key j has value L[j].\nYou may assign some keys to some locks under the\nfollowing rules:\n1. You may assign key j to lock i only if: j < i. (Each\nkey can only be used on a lock to its right.)\n2. Assignments where the key and lock have the\nsame value are forbidden: L[j] \u2260 L[i] (So the\neffective value is never zero.)\n3. Assigning key j to lock i gives: E = |L[j] \u2212 L[i]|\n4. Each lock can be assigned at most once, and each\nkey can be used at most once.\n5. Let even be the number of assignments with even\neffective value, and odd be the number of\nassignments with odd effective value. A set of\nassignments is valid only if: even \u2265 odd. This\ncondition applies to the final chosen set.\nSample Test Cases\nCase 1",
    fmt: "",
    hints: ["Read the problem carefully.", "Think of edge cases.", "Optimize your approach."],
    tests: [
      { in: "1\n2", out: "3" },
    ]
  },
  {
    track: "hackwithinfy", id: "find-peak-element", level: "Medium", title: "Find Peak Element",
    desc: "A peak element is an element that is strictly greater than its neighbors. \nGiven a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple \npeaks, return the index to any of the peaks. \nYou may imagine that nums[-1] = nums[n] = -\u221e. In other words, an element is always considered to be strictly \ngreater than a neighbor that is outside the array. \nYou must write an algorithm that runs in O(log n) time. \n  \nExample 1: \nInput: nums = [1,2,3,1] \nOutput:",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "nums = [1,2,3,1]", out: "2" },
    ]
  },
  {
    track: "hackwithinfy", id: "permute-vowels", level: "Medium", title: "Permute Vowels",
    desc: "Given a 0-indexed string s, permute s to get a new string t such that: \n\u2022 \nAll consonants remain in their original places. More formally, if there is an index i with 0 <= i < s.length \nsuch that s[i] is a consonant, then t[i] = s[i]. \n\u2022 \nThe vowels must be sorted in the nondecreasing order of their ASCII values. More formally, for pairs of \nindices i, j with 0 <= i < j < s.length such that s[i] and s[j] are vowels, then t[i] must not have a higher ASCII value \nthan t[j]. \nReturn the resulting st",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "s = \"lEetcOde\"", out: "\"lEOtcede\"" },
    ]
  },
  {
    track: "hackwithinfy", id: "longest-substring-without-repeats", level: "Medium", title: "Longest Substring Without Repeats",
    desc: "Given a string s, find the length of the longest substring without duplicate characters. \n \nExample 1: \nInput: s = \"abcabcbb\" \nOutput: 3 \nExplanation: The answer is \"abc\", with the length of 3. \nExample 2: \nInput: s = \"bbbbb\" \nOutput: 1 \nExplanation: The answer is \"b\", with the length of 1. \nExample 3: \nInput: s = \"pwwkew\" \nOutput: 3 \nExplanation: The answer is \"wke\", with the length of 3. \nNotice that the answer must be a substring, \"pwke\" is a subsequence and not a substring. \n  \n \nConstraints",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "s = \"abcabcbb\"", out: "3" },
    ]
  },
  {
    track: "hackwithinfy", id: "maximum-product-subarray", level: "Medium", title: "Maximum Product Subarray",
    desc: "Given an integer array nums, find a subarray that has the largest product, and return the product. \nThe test cases are generated so that the answer will fit in a 32-bit integer. \nExample 1: \n \nInput: nums = [2,3,-2,4] \nOutput: 6 \nExplanation: [2,3] has the largest product 6. \nExample 2: \n \nInput: nums = [-2,0,-1] \nOutput: 0 \nExplanation: The result cannot be 2, because [-2,-1] is not a subarray. \n  \n \nConstraints: \n \n1 <= nums.length <= 2 * 104 \n-10 <= nums[i] <= 10 \nThe product of any subarray ",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "nums = [2,3,-2,4]", out: "6" },
    ]
  },
  {
    track: "hackwithinfy", id: "maximum-subarray-sum", level: "Medium", title: "Maximum Subarray Sum",
    desc: "Given an integer array nums, find the subarray with the largest sum, and return its sum. \n \nExample 1: \n \nInput: nums = [-2,1,-3,4,-1,2,1,-5,4] \nOutput: 6 \nExplanation: The subarray [4,-1,2,1] has the largest sum 6. \nExample 2: \n \nInput: nums = [1] \nOutput: 1 \nExplanation: The subarray [1] has the largest sum 1. \n \nExample 3: \nInput: nums = [5,4,-1,7,8] \nOutput: 23 \nExplanation: The subarray [5,4,-1,7,8] has the largest sum 23.  \n \nFollow up: If you have figured out the O(n) solution, try coding",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "nums = [-2,1,-3,4,-1,2,1,-5,4]", out: "6" },
    ]
  },
  {
    track: "hackwithinfy", id: "evaluate-reverse-polish-notation", level: "Medium", title: "Evaluate Reverse Polish Notation",
    desc: "You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation. \n \nEvaluate the expression. Return an integer that represents the value of the expression. \n \nNote that: \n \nThe valid operators are '+', '-', '*', and '/'. \nEach operand may be an integer or another expression. \nThe division between two integers always truncates toward zero. \nThere will not be any division by zero. \nThe input represents a valid arithmetic expression in a reverse polish",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]", out: "9" },
    ]
  },
  {
    track: "hackwithinfy", id: "daily-temperatures", level: "Medium", title: "Daily Temperatures",
    desc: "Given an array of integers temperatures represents the daily temperatures, return an array answer such that \nanswer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no \nfuture day for which this is possible, keep answer[i] == 0 instead.  \n \nExample 1: \n \nInput: temperatures = [73,74,75,71,69,72,76,73] \nOutput: [1,1,4,2,1,1,0,0] \nExample 2: \n \nInput: temperatures = [30,40,50,60] \nOutput: [1,1,1,0] \nExample 3: \n \nInput: temperatures = [30,60,90] ",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "temperatures = [73,74,75,71,69,72,76,73]", out: "[1,1,4,2,1,1,0,0] \nExample 2: \n \nInput: temperatures = [30,40,50,60] \nOutput: [1,1,1,0] \nExample 3: \n \nInput: temperatures = [30,60,90] \nOutput: [1,1,0]" },
    ]
  },
  {
    track: "hackwithinfy", id: "valid-parentheses", level: "Easy", title: "Valid Parentheses",
    desc: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. \nAn input string is valid if: \n \nOpen brackets must be closed by the same type of brackets. \nOpen brackets must be closed in the correct order. \nEvery close bracket has a corresponding open bracket of the same type. \n  \n \nExample 1: \nInput: s = \"()\" \nOutput: true \n \nExample 2: \nInput: s = \"()[]{}\" \nOutput: true \n \nExample 3: \nInput: s = \"(]\" \nOutput: false \n \nExample 4: \nInput",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "s = \"()\"", out: "true \n \nExample 2: \nInput: s = \"()[]{}\" \nOutput: true \n \nExample 3: \nInput: s = \"(]\" \nOutput: false \n \nExample 4: \nInput: s = \"([])\" \nOutput: true \n________________________________________________________________________________________" },
    ]
  },
  {
    track: "hackwithinfy", id: "maximum-non-overlapping-festivals", level: "Medium", title: "Maximum Non-overlapping Festivals",
    desc: "Once upon a time in a small village, a wise king wanted to attend as many village festivals as possible in one \nday. Each festival had a start and end time, and the king could only attend one at a time. His advisor suggested \npicking only the festivals that ended the earliest, so he could fit more in. The king followed this advice, selecting \nthe next festival that started after the last one ended. By the end of the day, he had enjoyed the most \ncelebrations possible without any overlaps. The vi",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "start[]  =  [1, 3, 0, 5, 8, 5], finish[] =  [2, 4, 6, 7, 9, 9]", out: "4" },
    ]
  },
  {
    track: "hackwithinfy", id: "job-sequencing-with-profits", level: "Medium", title: "Job Sequencing with Profits",
    desc: "In the bustling kingdom of AlgoLand, there lived a clever merchant named Riya who ran a workshop \noffering special services. Every day, clients came to her with unique jobs \u2014 each with a deadline and a reward \n(profit) for completing it. However, each job took exactly one full day, and Riya could only handle one job per \nday. She quickly realized that if she wasn\u2019t careful, she\u2019d miss out on valuable profits by picking the wrong jobs. \nOne evening, she sat down and looked at all the job requests",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "deadline[] = [4, 1, 1, 1], profit[] = [20, 10, 40, 30]", out: "[2, 60]" },
    ]
  },
  {
    track: "hackwithinfy", id: "minimum-coins-for-majority", level: "Medium", title: "Minimum Coins For Majority",
    desc: "In the quiet village of Splitville, there was a wise elder named Mira who had a magical pouch full of coins, \neach with different values. One day, she challenged the village children: \u201cPick the fewest number of coins from \nthis pouch such that their total value is greater than the value of all the coins left behind.\u201d The children were \npuzzled \u2014 grabbing more coins meant winning, but they had to be smart. \nOne clever child sorted the coins from largest to smallest and picked them one by one, kee",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "arr = [2, 17, 7, 3] \n Output: 1 \nExplanation: Select only 17. Remaining sum is 12, and 17 > 12. \nInput: arr = [20, 12, 18, 4] \n Output: 2 \nExplanation: Select 18 and 12. Total = 30, remaining = 24. \nInput: arr = [1, 1, 1, 1, 10]", out: "1" },
    ]
  },
  {
    track: "hackwithinfy", id: "minimize-heights", level: "Medium", title: "Minimize Heights",
    desc: "In the hilly kingdom of Altaria, each village was built on a tower of different height. The king wanted to even \nout the landscape as much as possible, so that no tower looked too tall or too short compared to others. To do \nthis, he ordered the builders to either raise or lower every tower\u2019s height by exactly K meters \u2014 no exceptions! \nBut there was a rule: no tower could be made shorter than zero. The royal architect, Mira, studied the towers \ncarefully. She realized that by strategically incr",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "k = 2, arr[] = {1, 5, 8, 10}", out: "5" },
    ]
  },
  {
    track: "hackwithinfy", id: "rearrange-characters", level: "Medium", title: "Rearrange Characters",
    desc: "In the land of Lexiconia, the royal scribe was tasked with writing a magical scroll using a string of letters. But \nthe scroll had one sacred rule: no two identical letters could be written side by side, or the spell would fail. The \nscribe was handed strings like \"aaabc\" and \"aaabb\" and had to rearrange them so that no two adjacent \ncharacters were the same. \nHe carefully counted how many times each letter appeared. If any letter appeared more than half the \nlength of the string (rounded up), h",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "s = \"aaabc\"", out: "1" },
    ]
  },
  {
    track: "hackwithinfy", id: "fractional-knapsack", level: "Medium", title: "Fractional Knapsack",
    desc: "In the merchant city of Greedonia, a young trader named Elric was setting off on a journey with a \nmagical knapsack. This bag could carry only a limited weight, but there was a twist \u2014 Elric could break any \nitem and take a fraction of it if needed. Each item in his inventory had a value and a weight. \nHis goal? Maximize the value of what he could carry without exceeding the knapsack\u2019s capacity. So Elric \nsorted all his items by their value-to-weight ratio, starting with the most valuable per ki",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "val = [60, 100, 120] \nwt = [10, 20, 30] \ncapacity = 50", out: "240.000000" },
    ]
  },
  {
    track: "hackwithinfy", id: "water-connection-problem", level: "Medium", title: "Water Connection Problem",
    desc: "Every house with only one incoming and no outgoing pipe gets a tap. \nThe Rebel council has proposed a network of pipes where connections are denoted by three input values: \nai, bi, di denoting the pipe of diameter di from house ai to house bi. \nFind a more efficient way for the construction of this network of pipes. Minimize the diameter of pipes \nwherever possible. \nNote: The generated output will have the following format. The first line will contain t, denoting the total \nnumber of pairs of t",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "n = 9, p = 6 \na[] = {7,5,4,2,9,3} \nb[] = {4,9,6,8,7,1} \nd[] = {98,72,10,22,17,66}", out: "3 \n2 8 22 \n3 1 66 \n5 6 10" },
    ]
  },
  {
    track: "hackwithinfy", id: "make-array-non-increasing", level: "Medium", title: "Make Array Non-increasing",
    desc: "In the kingdom of Arraya, there lived a wizard who loved symmetry \u2014 especially in the form of non-\nincreasing sequences. One day, he stumbled upon a magical scroll with numbers that danced out of order. \nThe scroll read: {3, 1, 2, 1}. This bothered him, as the numbers weren't steadily decreasing or staying the \nsame. \nTo restore harmony, the wizard could use his magic to either increase or decrease any number, but he \nwanted to use the least amount of magic possible. So he cast spells to gently ",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "N = 4, array = [3, 1, 2, 1]", out: "1" },
    ]
  },
  {
    track: "hackwithinfy", id: "minimum-awkwardness-pairing", level: "Medium", title: "Minimum Awkwardness Pairing",
    desc: "In the twin cities of Numeria, two teams \u2014 Team A and Team B \u2014 were preparing for a grand \npartner dance. Each dancer in Team A had to be paired with a dancer from Team B. But there was a \nrule: the more different their dance styles (represented by numbers), the more awkward the dance \u2014 \nand the higher the cost in energy. \nThe elders wanted the total awkwardness (the sum of absolute differences in style between all pairs) to be \nas low as possible. A wise mathematician stepped in and gave a clev",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "N = 4, A = [4, 1, 8, 7], B = [2, 3, 6, 5]", out: "6" },
    ]
  },
  {
    track: "hackwithinfy", id: "merge-intervals", level: "Medium", title: "Merge Intervals",
    desc: "In the city of Timetron, schedules were sacred. Every citizen had a list of time intervals when they \nneeded access to the magical gates of transit. But chaos broke out \u2014 people\u2019s time slots overlapped, and \narguments erupted over who reserved what. \nThe wise Scheduler stepped in. She laid out all the intervals on a grand timeline and sorted them by their \nstart times. One by one, she merged overlapping time slots into larger blocks, ensuring no overlap \nremained \u2014 but no time was lost either. \n",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "arr = [[1,3], [2,4], [6,8], [9,10]]", out: "[[1,4], [6,8], [9,10]]" },
    ]
  },
  {
    track: "hackwithinfy", id: "longest-palindromic-substring", level: "Medium", title: "Longest Palindromic Substring",
    desc: "On a rainy Saturday afternoon, best friends Aarav and Meera were holed up inside, the thunder rumbling \nin the distance. With no power and their usual gadgets dead, they turned to an old pastime\u2014brain games.\"I \nhave a challenge,\" Aarav said, grinning as he grabbed a notebook. \"Let\u2019s play a game: find the longest \npalindromic substring from a random sentence., now our  task is to find the longest substring which is a \npalindrome. If there are multiple answers, then return the first appearing subs",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "s = \u201cnoonracecar\u201d", out: "\u201cracecar\u201d" },
    ]
  },
  {
    track: "hackwithinfy", id: "coin-change-combinations", level: "Medium", title: "Coin Change Combinations",
    desc: "In the quiet village of Sumridge, two curious friends, Arya and Rohan, were known for their love of \npuzzles and challenges. One sunny afternoon, while rummaging through Arya\u2019s attic, they found an old \nwooden box filled with ancient coins of different values 1, 2, 5.. units. \nAttached to the box was a note: \n\u201cTo claim the treasure of Sumridge, find all the ways to make the number N using these coins.\u201d \nOur task is to help them and the total Number of  combinations are possible using these coins",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "sum = 4, coins[] = [1, 2, 3]", out: "4" },
    ]
  },
  {
    track: "hackwithinfy", id: "minimum-coins-required", level: "Medium", title: "Minimum Coins Required",
    desc: "In the enchanted land of Arithmia, two young adventurers, Mira and Taran, discovered a hidden map \nwhile exploring the ruins of an old wizard\u2019s tower. The map led to the legendary Vault of Efficiency, said to \nhold the secrets of making anything with the least effort\u2014and the least gold. At the vault\u2019s entrance, they \nfound a glowing tablet with an inscription: \n\u201cOnly those who can find the path with least gold coins  to treasure may enter\u201d  \nOur task is to help the friends to solve the puzzle an",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "goldcoins[] = [25, 10, 5], Target= 30", out: "2 \nExplanation : Minimum 2 goldcoins needed, 25 and 5   \nInput: goldcoins[]  = [9, 6, 5, 1], sum = 19 \nOutput: 3" },
    ]
  },
  {
    track: "hackwithinfy", id: "palindrome-partitioning-cuts", level: "Medium", title: "Palindrome Partitioning Cuts",
    desc: "Given a string s, the task is to find the minimum number of cuts needed for palindrome partitioning of \nthe given string. A partitioning of the string is a palindrome partitioning if every sub-string of the partition is \na palindrome. \nExamples:  \nInput: s = \u201cfrfeek\u201d  \nOutput: 2  \nExplanation: We need to make minimum 2 cuts, i.e., \u201cfrf | ee | k\u201d. \n \nInput: s= \u201caaaa\u201d  \nOutput: 0  \nExplanation: The string is already a palindrome. \n \nInput: s = \u201cababbbabbababa\u201d  \nOutput: 3 \nExplanation: We need to ",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "s = \u201cfrfeek\u201d", out: "2" },
    ]
  },
  {
    track: "hackwithinfy", id: "count-palindromic-subsequences", level: "Medium", title: "Count Palindromic Subsequences",
    desc: "Given a string s of length n, the task is to count number of palindromic subsequence (need not \nnecessarily be distinct) present in the string s. \nExample: \nInput: s = \u201cabcd\u201d \nOutput: 4 \nExplanation: Palindromic subsequence are : \u201ca\u201d ,\u201db\u201d, \u201cc\u201d ,\u201dd\u201d \n \nInput: s = \u201caab\u201d \nOutput: 4 \nExplanation: palindromic subsequence are :\u201da\u201d, \u201ca\u201d, \u201cb\u201d, \u201caa\u201d \n \nInput: s = \u201canna\u201d \nOutput:9  \nExplanation: palindromic subsequence are :\u201ca\u201d ,\u201dn\u201d ,\u201dn\u201d ,\u201da\u201d ,\u201dnn\u201d ,\u201daa\u201d ,\u201dana\u201d ,\u201dana\u201d ,\u201danna\u201d",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "s = \u201cabcd\u201d", out: "4" },
    ]
  },
  {
    track: "hackwithinfy", id: "shortest-common-supersequence", level: "Medium", title: "Shortest Common Supersequence",
    desc: "Given two strings s1 and s2, the task is to find the length of the shortest string that has both s1 and s2 as \nsubsequences. \nExamples:  \nInput: s1 = \u201cgeek\u201d, s2 = \u201ceke\u201d \nOutput: 5 \nExplanation: String \u201cgeeke\u201d has both string \u201cgeek\u201d and \u201ceke\u201d as subsequences. \nInput: s1 = \u201cAGGTAB\u201d, s2 = \u201cGXTXAYB\u201d \nOutput: 9 \nExplanation: String \u201cAGXGTXAYB\u201d has both string \u201cAGGTAB\u201d and \u201cGXTXAYB\u201d as subsequences.",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "s1 = \u201cgeek\u201d, s2 = \u201ceke\u201d", out: "5" },
    ]
  },
  {
    track: "hackwithinfy", id: "subset-sum-problem", level: "Medium", title: "Subset Sum Problem",
    desc: "In the Super village of Coding, two curious friends, riya and ronak, were known for their love of puzzles \nand challenges.here is the challenge for them  an  array of positive integers arr[] and a value sum, determine \nif there is a subset of arr[] with sum equal to given sum.  \nExamples: \nInput: arr[] = [3, 34, 4, 12, 5, 2], sum = 9 \nOutput: true  \nExplanation: Here there exists a subset with target sum = 9, 4+3+2 = 9. \nInput: arr[] = [3, 34, 4, 12, 5, 2], sum = 30 \nOutput: false \nExplanation: ",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "arr[] = [3, 34, 4, 12, 5, 2], sum = 9", out: "true" },
    ]
  },
  {
    track: "hackwithinfy", id: "partition-equal-subset-sum", level: "Medium", title: "Partition Equal Subset Sum",
    desc: "In the bustling village of NutriVille, Chef Nia was famous for preparing perfectly balanced meals. One day, \nshe received a royal request: \n\u201cPrepare a meal divided into two plates, each with the same total nutritional value, using only the \ningredients from this basket.\u201d \nShe wondered:\u201cCan I divide these into two groups so that each group adds up to the same total nutrient \nvalue?\u201d  \nChef Nia opened the basket and found ingredients with different nutrient points: \n[3, 1, 5, 9, 12]---(12+3),(1+5+",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "arr[] = [1, 5, 11, 5]", out: "true" },
    ]
  },
  {
    track: "hackwithinfy", id: "longest-increasing-subsequence", level: "Medium", title: "Longest Increasing Subsequence",
    desc: "In the valley of Numatia, a young adventurer named Lina set out to climb the Mountain of Numbers. The \nmountain wasn't made of rocks\u2014it was made of stepping stones, each marked with a number. Some were \ntall, some small, all laid out in a straight path. \nBut there was a rule: \nLina could only step forward, and only onto a stone with a higher number than the one she was currently on. \nShe couldn\u2019t go back or jump sideways. Her goal was to climb using the longest increasing path possible. \nOne day",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "1", out: "1" },
    ]
  },
  {
    track: "hackwithinfy", id: "maximum-product-subset", level: "Medium", title: "Maximum Product Subset",
    desc: "Maximum Product Subset Problem \nGiven an integer array nums[], find the maximum product that can be achieved from any non-empty \nsubset of the array. \nA subset of an array is a set that can be formed by removing zero or more elements without changing \nthe order of remaining elements. The product of a subset is the multiplication of all its elements. \nInput Format: \n\u2022 \nThe first line contains an integer N \u2014 the number of elements in the array. \n\u2022 \nThe second line contains N space-separated intege",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "7 \n-6 4 -5 8 -10 0 8", out: "15360" },
    ]
  },
  {
    track: "hackwithinfy", id: "geometric-progression-triplets", level: "Medium", title: "Geometric Progression Triplets",
    desc: "Print All Triplets That Form a Geometric Progression \nProblem Statement: \nGiven a sorted array of distinct positive integers, print all triplets in the array that form a Geometric \nProgression (GP) with an integral common ratio. \n \nA triplet (a,b,c) is said to form a geometric progression if there exists a positive integer r such that \nb=a\u22c5r and c=b\u22c5r. \n \n \nInput Format: \n\u2022 \nThe first line contains an integer N \u2014 the number of elements in the array. \n\u2022 \nThe second line contains N space-separated",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "6 \n1 2 6 10 18 54", out: "2 6 18 \n6 18 54" },
    ]
  },
  {
    track: "hackwithinfy", id: "minimum-waiting-time", level: "Medium", title: "Minimum Waiting Time",
    desc: "Minimum Waiting Time Problem Statement: \nGiven an array where each element indicates the time required by a customer at a ticket counter, \nand only one customer can be served at a time in sequence, determine the minimum total waiting \ntime achievable by scheduling the customers optimally \nInput Format: \nA single line of space-separated integers, where each integer denotes the time required by a \ncustomer. \nOutput Format: \nA single integer representing the minimum total waiting time. Case#1 \nInpu",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "3 2 1 2 6", out: "17" },
    ]
  },
  {
    track: "hackwithinfy", id: "job-sequencing-with-deadlines", level: "Medium", title: "Job Sequencing with Deadlines",
    desc: "Job Sequencing with Deadlines \nProblem Statement: \nYou are given n jobs. Each job has the following properties: \n\u2022 \nA unique ID \n  \n\u2022 \nA deadline (by when it should be completed) \n\u2022 \nA profit (earned only if the job is finished before or on its deadline) \nEach job takes exactly 1 unit of time to complete. Your task is to schedule the jobs to maximize total \nprofit, ensuring no two jobs overlap and each job finishes within its deadline. \nInput Format: \n\u2022 \nAn integer n representing the number of j",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "4 \nA 2 100 \nB 1 19 \nC 2 27 \nD 1 25", out: "A C \u2192 Total Profit = 127" },
    ]
  },
  {
    track: "hackwithinfy", id: "candy-distribution", level: "Hard", title: "Candy Distribution",
    desc: "Candy Distribution \nProblem Statement: \nThere are n children standing in a line, each with a rating value. Each child must receive at least one \ncandy. Additionally, any child with a higher rating than their immediate neighbor must receive more \ncandies than that neighbor. The objective is to distribute candies to minimize the total number given. \n \nInput: \nAn array ratings of length n where ratings[i] represents the rating of the i-th child. \n \nOutput: \nAn integer representing the minimum total",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "An array ratings of length n where ratings[i] represents the rating of the i-th child.", out: "An integer representing the minimum total number of candies required. \n \nCase#1: \nInput: \n  \nratings = [1, 0, 2] \nOutput: \n \n5" },
    ]
  },
  {
    track: "hackwithinfy", id: "rearrange-tasks", level: "Medium", title: "Rearrange Tasks",
    desc: "Rearrange Tasks to Avoid Consecutive Duplicates \nProblem Statement: \nGiven a string representing a queue of tasks where each character is a lowercase letter denoting a \ntask type, reorder the tasks so that no two identical tasks are scheduled consecutively. If no such \narrangement exists, return an empty string. \n \nInput: \nA string tasks containing lowercase English letters. \n \nOutput: \nA reordered string with no two adjacent characters the same, or an empty string \"\" if rearrangement \nis imposs",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "A string tasks containing lowercase English letters.", out: "A reordered string with no two adjacent characters the same, or an empty string \"\" if rearrangement \nis impossible." },
    ]
  },
  {
    track: "hackwithinfy", id: "rod-cutting", level: "Medium", title: "Rod Cutting",
    desc: "Rod Cutting Problem Problem Statement: \nGiven a rod of length n and an array of prices where the price at index i represents the selling price of \na rod of length i+1, determine the maximum revenue obtainable by cutting the rod into smaller \npieces and selling them. \nInput Format : \n  \nlength[]: an array representing possible rod lengths [1, 2, ..., n] price[]: an array where price[i] is the \nprice for rod length length[i] n: the total length of the rod to be cut \nOutput: \nThe maximum profit ach",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "length[] = [1, 2, 3, 4, 5, 6, 7, 8] \nprice[] = [1, 5, 8, 9, 10, 17, 17, 20] \nRod length: 4", out: "The maximum profit achievable by cutting the rod in an optimal way. \nCase#1: \nInput: \nlength[] = [1, 2, 3, 4, 5, 6, 7, 8] \nprice[] = [1, 5, 8, 9, 10, 17, 17, 20] \nRod length: 4 \nOutput: \nMaximum Profit: 10" },
    ]
  },
  {
    track: "hackwithinfy", id: "binary-strings-from-wildcard", level: "Medium", title: "Binary Strings from Wildcard",
    desc: "Find All Binary Strings from a Wildcard Pattern Problem Statement : \nGiven a binary string pattern containing some wildcard characters ?, generate all possible binary \nstrings by replacing each ? with either 0 or 1. \nInput: \nA string consisting of characters 0, 1, and ?. \nOutput: \nA list of all binary strings formed by substituting every ? with 0 or 1. \nCase#1: Input: \n1?11?00?1? \nOutput (all possible strings): 1011000010 \n1011000011 \n1011000110 \n1011000111 \n1011100010 \n1011100011 \n1011100110 \n1",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "A string consisting of characters 0, 1, and ?.", out: "A list of all binary strings formed by substituting every ? with 0 or 1. \nCase#1: Input: \n1?11?00?1? \nOutput (all possible strings): 1011000010 \n1011000011 \n1011000110 \n1011000111 \n1011100010 \n1011100011 \n1011100110 \n1011100111 \n  \n1111000010 \n1111000011 \n1111000110 \n1111000111 \n1111100010 \n1111100011 \n1111100110 \n1111100111" },
    ]
  },
  {
    track: "hackwithinfy", id: "longest-palindromic-subsequence", level: "Medium", title: "Longest Palindromic Subsequence",
    desc: "Longest Palindromic Subsequence Problem Statement: \nGiven a string s, find the length of the longest subsequence of s that is a palindrome. A subsequence \nis a sequence that can be derived from the original string by deleting some or no characters without \nchanging the order of the remaining characters. \nThis differs from the longest palindromic substring problem where the characters must be \ncontiguous. Here, characters can be taken from anywhere in the string as long as their relative order \ni",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "ABBDCACB", out: "5" },
    ]
  },
  {
    track: "hackwithinfy", id: "largest-plus-of-ones", level: "Medium", title: "Largest Plus of Ones",
    desc: "Largest Plus of 1\u2019s in a Binary Matrix \nProblem Statement: \n \nGiven a square binary matrix consisting of 0's and 1's, find the size of the largest plus sign formed \nonly by 1's. \n \nA plus sign is defined as a center cell with arms extending up, down, left, and right \u2014 all consisting of \ncontinuous 1's \u2014 of equal length. The size of the plus is the total number of cells it covers, including \nthe center and the arms. \n \nFor example, a plus with arm length 2 looks like this (where 1 represents a ce",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "5 \n1 \n0 1 0 1 \n1 1 1 1 1 \n1 0 1 0 1 \n1 1 1 1 1 \n1 0 1 0 1", out: "17" },
    ]
  },
  {
    track: "hackwithinfy", id: "dfs-arrival-and-departure-time", level: "Medium", title: "DFS Arrival and Departure Time",
    desc: "Arrival and Departure Time in DFS \nProblem Statement: Given a directed graph with V vertices (numbered from 0 to V-1) and a list of E \nedges, you are to perform a Depth-First Search (DFS) traversal of the graph starting from vertex 0. \nDuring the traversal, record the arrival time and departure time of each vertex. \n\u2022 \nThe arrival time of a vertex is the time when it is visited (entered) for the first time during \nDFS. \n\u2022 \nThe departure time of a vertex is the time when DFS finishes exploring al",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "6 7 \n0 1 \n0 2 \n1 3 \n1 4 \n2 5 \n  \n3 5 \n4 5", out: "Vertex 0: Arrival = 0, Departure = 11 \nVertex 1: Arrival = 1, Departure = 8 \nVertex 2: Arrival = 9, Departure = 10 \nVertex 3: Arrival = 2, Departure = 5 \nVertex 4: Arrival = 6, Departure = 7 \nVertex 5: Arrival = 3, Departure = 4" },
    ]
  },
  {
    track: "hackwithinfy", id: "knight-minimum-steps", level: "Medium", title: "Knight Minimum Steps",
    desc: "Chess Knight Minimum Steps Problem Statement: \nGiven a N x N chessboard and the starting and ending positions of a knight, find the minimum \nnumber of steps the knight must take to reach the destination from the source. \nA knight moves in an \"L\" shape: it can move two squares in one direction and then one square \nperpendicular to that direction. \nYou need to determine the shortest path from the source to the destination using Breadth-First \nSearch (BFS), which is ideal for finding shortest paths",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "8 \n7 0 \n  \n0 7", out: "6" },
    ]
  },
  {
    track: "hackwithinfy", id: "longest-palindrome-by-reordering", level: "Medium", title: "Longest Palindrome by Reordering",
    desc: "Construct the Longest Palindrome by Reordering or Deleting Characters Problem Statement: \nGiven a string S, construct the longest possible palindromic string that can be made by \nshuffling or deleting any characters from S. \nYou may reorder the characters and delete any number of them. The goal is to build the \nlongest palindrome possible from the given characters. \nIf there are multiple answers with the same length, print any one of them. \nInput Format: \n\u2022 \nA single string S of uppercase Englis",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "1", out: "1" },
    ]
  },
  {
    track: "hackwithinfy", id: "minimize-guest-unhappiness", level: "Medium", title: "Minimize Guest Unhappiness",
    desc: "Problem: Minimizing Total Guest Unhappiness Problem Statement: \nYou are managing a hotel and need to serve N guests. Each guest has a happiness value C\u1d62, which is \nthe time at which they prefer to be served. \nHowever, you can serve only one guest at a time, and each guest takes exactly one unit of time to be \nserved. The serving times start from x = 1 and increase incrementally (1, 2, 3, ..., N). \n  \nThe unhappiness of serving a guest at time x is defined as: Unhappiness=\u2223Ci\u2212x\u2223 \nYour task is to ",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "5 \n1 2 3 4 5", out: "0 \nCase#2: \nInput: \n5 \n5 1 3 2 4 \nOutput 4" },
    ]
  },
  {
    track: "hackwithinfy", id: "minimum-blanket-folds", level: "Medium", title: "Minimum Blanket Folds",
    desc: "Folding a Blanket Problem Statement: \nAlex has a rectangular blanket with dimensions H \u00d7 W (H = height, W = width). Alex wants to pack it \ninto a box that can only fit a blanket of size H1 \u00d7 W1. \n  \nTo do this, Alex folds the blanket in a series of steps. Each fold must be exactly parallel to one of the \nedges (either horizontally or vertically), and the resulting dimensions after each fold must remain \nwhole numbers. \nYour task is to find the minimum number of folds required to reduce the blank",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "2 \n3 \n2 \n2", out: "1" },
    ]
  },
  {
    track: "hackwithinfy", id: "smallest-array-after-one-swap", level: "Medium", title: "Smallest Array After One Swap",
    desc: "Lexicographically Smallest Array After One Swap \nYou are given an array A of size N and an integer K. You are allowed to swap at most one pair of \nelements such that the distance between their indices is at most K (i.e., |i - j| \u2264 K). \n  \nYour task is to return the lexicographically smallest array possible after such a swap (or no swap, if \nthe array is already optimal). \nDefinition: An array X is lexicographically smaller than array Y if at the first index i where they differ, \nX[i] < Y[i]. \nIn",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "5 \n5 \n4 \n3 \n2 \n1 \n3", out: "2 \n4 \n3 \n  \n5 \n1" },
    ]
  },
  {
    track: "hackwithinfy", id: "prevent-multiple-subsequences", level: "Hard", title: "Prevent Multiple Subsequences",
    desc: "Prevent Multiple Subsequences Problem Statement: \nAlice has a string S of length N, and Bob gives her another string C of length M. \nBob challenges Alice to modify her string S such that the string C appears at most once as a \nsubsequence in S. \nTo help her do this, Bob gives an array A of size N, where A[i] is the cost to delete the character S[i]. \nAlice wants to achieve the goal with the minimum possible total cost. \n \nFind the minimum total cost to delete characters from S such that C appear",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "6 \n3 \nabcabc abc \n1 2 3 4 5 6", out: "10" },
    ]
  },
  {
    track: "hackwithinfy", id: "largest-common-arrival-order", level: "Hard", title: "Largest Common Arrival Order",
    desc: "Largest Common Arrival Order Subsequence Across Multiple Days \nProblem Statement: Given N people and K days, each day is represented by an array of N numbers \nindicating the order in which people arrived at the theatre. The task is to determine the size of the \nlargest group of people who arrive in the same relative order on all K days. \nInput Format: \n\u2022 \nThe first line contains two integers N and K separated by a space \u2014 the number of people \nand the number of days. \n\u2022 \nThe next K lines each co",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "N = 4, K = 3 \nDay 1: [1, 3, 2, 4] \nDay 2: [1, 3, 2, 4] \nDay 3: [1, 4, 3, 2]", out: "3" },
    ]
  },
  {
    track: "hackwithinfy", id: "maximum-valid-triplets", level: "Medium", title: "Maximum Valid Triplets",
    desc: "Maximum Number of Valid Triplets Formed From an Array Under Limit M \nProblem Statement: \nGiven an array of size N and an integer limit M, determine the maximum number of triplets that can \nbe formed under these conditions: \n\u2022 \nEach element in the triplet is less than or equal to M. \n\u2022 \nA triplet is valid if it satisfies either of the following: \no \nAll three numbers in the triplet are the same. \no \nThe three numbers are consecutive integers (e.g., 3, 4, 5). \n\u2022 \nEach element in the array can belo",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "4 2 \n1 2 2 2", out: "1 \n \nQ1. \nA new deadly virus has infected large population of a planet. A brilliant scientist has discovered a \nnew strain of virus which can cure this disease. Vaccine produced from this virus has various strength \ndepending on midichlorians count. A person is cured only if midichlorians count in vaccine batch is \nmore than midichlorians count of person. A doctor receives a new set of report which contains \nmidichlorians count of each infected patient and stores all vaccine doctor has and their midichlorians \ncount. You need to determine if doctor can save all patients with the vaccines he has. The number of \nvaccines and patients are equal. \nInput Format Parameters: \nN :: INTEGER \nThe first line contains an integer, N, denoting the number of patients / vaccines count. N :: 1<N<15 \nVacStrength :: INTEGER ARRAY \nSecond line contains N integers (where 0<=i<N) describing the strength of each vaccine(midichlorians \ncount). \nVacStrength[i]:: 1 to 10^4 \n \n \nPatMid :: INTEGER ARRAY \nThird line contains N integers (where 0<=i<N) describing the midichlorians count of each patient. \nPatMid [i]:: 1 to 10^4 \nOutput Format \nPrint a single line containing 'Yes' or 'No'. Case#: 1 \nInput: \n5 \n123 146 454 542 456 \n100 328 248 689 200 \nOutput: \nNo \n \n \nCase#: 2 \nInput \n  \n4 \n300 200 250 320 \n120 230 180 270 \nOutput: \nYes \n \n \nCase#:3 \nInput \n5 \n400 600 300 350 450 \n220 520 100 50 500 \nOutput: \nNo \n \n \n \nQ2. \nThe \"Shades\" Television Channel organizes a fun-filled event named \"Best Couple 2025\", where \nmarried couples are invited and given many tasks and activities. Based on some criteria decided by \nthe jury, the best couple will be chosen. \n \n \nN couples registered for the event, and each couple was given a registration number (same ID for \nboth). One of the specific couple's registration ID got missed. The event coordinators wanted your \nhelp in finding the missing ID. \n \n \nWrite a program that takes an array of registration numbers as input and outputs the missing \nregistration ID. \nParameters: \nN::INTEGER \nThe first line of the input contains the number of couples N who registered for the event. 1<=N<=5 \nArr::INTEGER ARRAY \nThe second line of input contains 2xN-1 registration IDs of each of the couples, separated by a space \nas one of the specific couple\u2019s ID is missing. \n  \n1<=Arr[i]<=10 \n \n \nCase#: 1 \nInput: \n2 \n1 3 1 \nOutput: \n3 \n \n \nCase#: 2 \n4 \n1 5 2 7 2 7 1 \nOutput: \n5 \n \n \nCase#:3 5 \n5 1 9 2 1 6 9 5 2 \n220 520 100 50 500 \nOutput: \n6 \nQ3. \nSherland State University has a mini library in the hostel, where N students can use it, but only one at \na time. A timetable is set to avoid conflicts: \n \n \n\u2022 \nThe 1st student starts at time O and must finish by A1. \n\u2022 \nThe 2nd student starts at A1 and must finish by A2, and so on. \n\u2022 \nEach student needs Bi units of time to read. \n \n \nDetermine how many students can finish reading within their assigned time slots. \nParameters: \n  \nN:INTEGER \nThe first line input contains a single integer N denoting the number of students. T: INTEGER ARRAY \nThe second line of input contains N space-separated integers A1, A2, ..., and AN denoting the \nmoments of time by which the corresponding student should finish reading. \nD: INTEGER ARRAY \nThe third line of input contains N space-separated integers B1, B2, ..., and BN denoting the time \nrequired for each of the students to read. \n \n \nCase#:1 \nInput: \n3 \n1 10 15 \n1 10 3 \nOutput: \n2" },
    ]
  },
  {
    track: "hackwithinfy", id: "second-occurrence-index", level: "Easy", title: "Second Occurrence Index",
    desc: "If the feedback score appears more than once, print the position (index) of the second \noccurrence. \nParameters: \nN: INTEGER \nThe first input line contains an integer N, the number of feedback scores. 1 \u2264 N \u2264 10 \nscore: INTEGERS ARRAY \nThe second input line contains N space-separated integers, each representing a feedback score. 0 \u2264 \nscore\u2264 100 \nX: INTEGER \nThe third input line contains an integer X, which is the feedback score you need to find the second \noccurrence of. \n  \n0 \u2264 X \u2264 100 \n \n \nOut",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "8 \n10 20 30 40 50 10 70 80 \n3", out: "\u2022 \nFloat rounded to 2 decimal places representing the maximum average \n \n \nCase#:1 \nInput: \n8 \n10 20 30 40 50 10 70 80 \n3 \nOutput:" },
    ]
  },
  {
    track: "hackwithinfy", id: "best-time-to-buy-and-sell", level: "Easy", title: "Best Time to Buy and Sell",
    desc: "00 \n \n \n \nQ20. \nYou are a data analyst at a startup that helps small business owners flip electronics (buy and resell for \nprofit). A client comes to you with historical price data of a popular smartphone over the past few \ndays. The client wants to buy one unit of the smartphone on one day and sell it on a later day to \nmaximize their profit. \nYou have to write a program that determines the maximum profit that can be earned by making at \nmost one transaction (buy one and sell one product). \nCon",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "10 3 3 4 5 Output: 2 Explanation: P = 10 Books available: [3, 4, 5] To reach 10 pages \nwith minimum books: Borrow book with 5 pages (1 time) = 5 pages. Remaining P = 5. Borrow book \nwith 5 pages (2nd time) = 5 pages. Total = 10 pages. Total books borrowed: 2. \nCase#: 2 Input: 15 2 3 4 Output: -1 Explanation: P = 15 Books available: [3, 4] Maximum \npages achievable: Book 1 (3 pages) x 2 = 6 pages Book 2 (4 pages) x 2 = 8 pages Total max pages = 6 + \n8 = 14. Since 14 < 15, it's not possible to reach the target. Return -1. \nCase#: 3 Input: 7 3 1 2 6 Output: 2 Explanation: P = 7 Books available: [1, 2, 6] To reach 7 pages with \nminimum books: Borrow book with 6 pages (1 time) = 6 pages. Remaining P = 1. Borrow book with 1 \npage (1 time) = 1 page. Total = 7 pages. Total books borrowed: 2. \nQuestion 2: Ingredient Shopping \nYou are planning to bake a large cake and need a total of W grams of ingredients. You visit a specialty \nstore that has N different types of ingredients. Each ingredient type Ii has a specific weight in grams. \nYou want to buy the minimum number of ingredient units such that their total weight is at least \nW. The store policy dictates that you can buy at most 2 units of each unique ingredient type, as \nsupplies are limited. \nIf buying all available ingredient units (each twice) does not allow you to reach the target weight, \nreturn -1. \nParameters: W :: INTEGER The first line contains an integer, W, denoting the target total weight in \ngrams. W :: 1 -> 10^5 \n  \nN :: INTEGER The next line contains an integer, N, denoting the number of unique ingredient types. N \n:: 1 -> 10^5 \nI :: INTEGER ARRAY Each line i of the N subsequent lines (where 0 \\le i < N) contains an integer \ndescribing the weight of the i^{th} ingredient type in grams. I[i] :: 1 -> 10^5 \nCase#: 1 Input: 20 3 5 8 12 Output: 2 Explanation: W = 20 Ingredients available: [5, 8, 12] To reach \n20g with minimum units: Buy ingredient with 12g (1 time) = 12g. Remaining W = 8. Buy ingredient \nwith 8g (1 time) = 8g. Total = 20g. Total units bought: 2. \nCase#: 2 Input: 50 2 10 14 Output: -1 Explanation: W = 50 Ingredients available: [10, 14] Maximum \nweight achievable: Ingredient 1 (10g) x 2 = 20g Ingredient 2 (14g) x 2 = 28g Total max weight = 20 + \n28 = 48g. Since 48 < 50, it's not possible to reach the target. Return -1. Case#: 3 Input: 15 4 2 3 4 5", out: "Return True if the two strings are anagrams, otherwise False \n \n \nCase#:1 \nInput silent listen \nOutput True Case#:2 Input triangle integral Output True Case#:3 Input hello bello \n  \nOutput False Case#:4 Input aabbcc abcabc Output True \n \nCase#:5 Input abc \nab \nOutput \nFalse \nQ28. \nYou are working on the backend of a secure messaging application. Each session generates a unique \ntoken that should match the expected reference token. However, due to a known issue in the \nmessage encoding system, tokens sometimes arrive in a rotated format (i.e., characters are shifted in \na circular fashion, but no characters are lost or added). \nYour job is to verify whether the received token is simply a rotation of the original token. If so, it \nshould still be accepted for authentication. \n \n \nParameters: \nT1: STRING \nThe first line of input contains a string, T1, that represents the original token. 1<=len(T1)<=100 \nT2: STRING \nThe second line of input contains a string, T2, that represents the received token. 1<=len(T2)<=100 \n \nOutput: \n  \nReturn True if received token is a rotation of original token, otherwise False. \n \n \nCase#1: \nInput \nauthentication cationauthenti Output \nTrue Case#2: Input waterbottle erbottlewat Output True Case#3: Input rotation tationro \nOutput True Case#4: \nInput secure rescue \nOutput \nFalse \n \n \nCase#:5 Input abcde deabc \n  \nOutput \nTrue \n \n \nCase#:6 Input abc abcd \nOutput \nFalse \nQ29. \nYou are building a validation system for a secure messaging app that uses pattern-based character \nsubstitution encryption. Every character in a plaintext message is consistently replaced with another \ncharacter to create the encrypted version. However, to maintain security, no two characters in the \noriginal message can map to the same character in the encrypted one, and vice versa. \nYour task is to verify whether a received encrypted message is a valid isomorphic transformation of \nthe original message. That means there must exist a one-to-one and consistent mapping between \nthe characters in the original and encrypted messages \n \n \nParameters: \nT1: STRING \nThe first line of input contains a string, T1, that represents the actual message before encryption. \n1<=len(T1)<=100 \n \nT2: STRING \nThe second line of input contains a string, T2, that represents the message after encryption. \n1<=len(T2)<=100 \nOutput: \nReturn True if the two messages are isomorphic, otherwise False. \n \n \nCase#:1 Input paper \ntitle \n  \nOutput \nTrue" },
    ]
  },
  {
    track: "hackwithinfy", id: "minimum-treasures-for-target", level: "Medium", title: "Minimum Treasures for Target",
    desc: "Parameters: V :: INTEGER The first line contains an integer, V, denoting the target total treasure \nvalue. V :: 1 -> 10^5 \nN :: INTEGER The next line contains an integer, N, denoting the number of unique treasures. N \n:: 1 -> 10^5 \nT :: INTEGER ARRAY Each line i of the N subsequent lines (where 0 \\le i < N) contains an integer \ndescribing the value of the i^{th} treasure. T[i] :: 1 -> 10^5 \nCase#: 1 Input: 18 3 7 9 10 Output: 2 Explanation: V = 18 Treasures available: [7, 9, 10] To reach 18 \nval",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "1", out: "1" },
    ]
  },
  {
    track: "hackwithinfy", id: "minimum-tasks-for-progress", level: "Medium", title: "Minimum Tasks for Progress",
    desc: "Collect treasure with 3 value (2nd time) = 3 value. Total = 6 value. Total treasures collected: 2. \nQuestion 4: Project Task Completion \nYou are working on a critical project and need to accumulate a total of P progress points to \n  \ncomplete it. There are N distinct tasks available, and each task Ti provides a certain amount of \nprogress points upon completion. \nYou want to determine the minimum number of tasks you have to complete such that you reach or \nexceed the target progress points P. To",
    fmt: "",
    hints: ["Analyze the pattern", "Consider time complexity", "Check constraints"],
    tests: [
      { in: "1", out: "1" },
    ]
  },

  {
    track: "hackwithinfy", id: "tree-beauty-problem", level: "Easy", title: "Tree Beauty Problem",
    desc: `You are given a tree of n nodes, each node has a value a[i] written on it. The tree is rooted at node 1.
A pair of nodes i, j (where 1 <= i < j <= n) is considered GOOD if a[i]*a[j] is a perfect square.
We define beauty(u) as the number of good pairs of nodes in the subtree of u. Your task is to find the sum of beauty(i) for each 1 <= i <= n. Return the sum of these values modulo 10^9 + 7.`,
    fmt: `Line 1: Integer n
Next n lines: par array
Next n lines: a array
Output: Single Integer`,
    hints: ["Use prime factorization and bitmasks to represent each number.", "A pair is a perfect square if their prime factorization bitmasks XOR to 0.", "Traverse the tree using DFS and maintain a frequency map of bitmasks."],
    tests: [
      { in: `5
0
1
1
2
2
2
3
6
12
27`, out: `6` },
      { in: `2
0
1
4
9`, out: `1` },
      { in: `3
0
1
1
2
8
18`, out: `3` },
    ]
  },
  {
    track: "hackwithinfy", id: "good-subsequence-gcd", level: "Medium", title: "Good Subsequence with GCD Problem",
    desc: `You are given an array a of length n and an integer p.
A non-empty subsequence of a is considered GOOD if:
1. Length of subsequence is strictly less than n.
2. The GCD of the elements of the subsequence is exactly p.
You have to process q queries to replace a[i] with j.
After each query, answer YES if a good subsequence exists.`,
    fmt: `Line 1: n
Next n lines: elements of a
Line n+2: p
Line n+3: q
Line n+4: 2
Next q lines: queries`,
    hints: ["A good subsequence exists if there is any element divisible by p and the GCD of all multiples of p is exactly p.", "We just need to check if the GCD of all multiples of p is p, and if there is at least one element not divisible by p, or if we can exclude one element and still have GCD p.", "Use a Segment Tree to maintain the GCD of all multiples of p."],
    tests: [
      { in: `2
3
3
6
2
2
2 3
1 6`, out: `2` },
      { in: `4
3
9
12
15
18
3
3
1 9
2 6
4 12`, out: `3` },
    ]
  },
  {
    track: "hackwithinfy", id: "longest-non-dec-xor", level: "Hard", title: "Longest Non-Decreasing Subsequence with XOR",
    desc: `You are given an array A of length N and an integer M.
A subsequence of A is considered GOOD if:
1. The elements are non-decreasing.
2. The bitwise XOR of these elements is at least M.
Find the length of the longest good subsequence. If not possible, return 0.`,
    fmt: `Line 1: N
Line 2: M
Next N lines: Elements of A`,
    hints: ["Since N <= 1000 and M <= 500, we can use dynamic programming.", "State: dp[i][x] = max length of non-decreasing subsequence ending at index i with XOR sum x.", "Iterate over previous elements j < i where A[j] <= A[i], and update dp[i][x ^ A[i]] = max(..., dp[j][x] + 1)."],
    tests: [
      { in: `2
1
1
2`, out: `2` },
      { in: `2
1
1
1`, out: `1` },
      { in: `4
3
1
2
3
4`, out: `4` },
    ]
  },
  {
    track: "hackwithinfy", id: "tree-edge-flipping", level: "Complex", title: "Tree Edge Flipping with Pattern Matching Problem",
    desc: `You are given a rooted tree with N nodes. Each node has a binary value {0, 1}. Parent array defines tree structure.
You may flip a set of parent-child edges such that no two flipped edges share a node (matching). Flipping toggles both endpoints' values and costs M.
For Q queries (binary strings), find the sum of minimum costs to MAXIMIZE natural root-to-leaf paths containing query q.`,
    fmt: `N, M, Parent array, Val array, Q, Queries`,
    hints: ["Dynamic programming on trees.", "Maintain the state of edge flips for a node and its children.", "Use Aho-Corasick or string matching DP embedded within the tree DP."],
    tests: [
      { in: `6
3
0
0
0
1
1
2
1
0
1
1
2
10
011`, out: `6` },
      { in: `4
3
0
0
1
1
0
0
0
2
10
11`, out: `3` },
    ]
  },
  { track: "tcs-nqt", id: "even-or-odd", level: "Easy", title: "Even or Odd",
    desc: "Given a single integer N, determine whether the number is even or odd.\n\nAn even number is an integer that is exactly divisible by 2. An odd number is an integer that cannot be divided exactly by 2.\n\nConstraints:\n• -10^9 <= N <= 10^9\n• N can be 0 or negative.",
    fmt: "Print exactly \"Even\" if N is even, or \"Odd\" if N is odd (case-sensitive).",
    tests: [{"in":"7","out":"Odd"},{"in":"10","out":"Even"},{"in":"0","out":"Even"},{"in":"7","out":"Odd","hidden":true},{"in":"7","out":"Odd","hidden":true},{"in":"7","out":"Odd","hidden":true},{"in":"7","out":"Odd","hidden":true},{"in":"7","out":"Odd","hidden":true},{"in":"7","out":"Odd","hidden":true},{"in":"7","out":"Odd","hidden":true}],
    hints: ["Check divisibility by 2 using the modulo operator.", "Read N. If N % 2 equals 0, print Even. Else print Odd.", "n % 2 === 0"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "sum-of-digits", level: "Easy", title: "Sum of Digits",
    desc: "Given a positive integer N, calculate the sum of its individual digits.\n\nFor example, if N = 1234, the sum is 1 + 2 + 3 + 4 = 10.\n\nConstraints:\n• 1 <= N <= 10^12",
    fmt: "Print a single integer representing the total sum of all digits.",
    tests: [{"in":"1234","out":"10"},{"in":"248","out":"14"},{"in":"100","out":"1"},{"in":"1234","out":"10","hidden":true},{"in":"1234","out":"10","hidden":true},{"in":"1234","out":"10","hidden":true},{"in":"1234","out":"10","hidden":true},{"in":"1234","out":"10","hidden":true},{"in":"1234","out":"10","hidden":true},{"in":"1234","out":"10","hidden":true}],
    hints: ["Extract the last digit using modulo 10, add it to a running sum, and remove it by integer dividing the number by 10.", "Initialize sum = 0. While N > 0, add N % 10 to sum, then divide N by 10. Return sum.", "sum += n % 10; n = Math.floor(n / 10);"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "palindrome-check", level: "Easy", title: "Palindrome Check",
    desc: "Given a number N as a string, determine if it reads the same forwards and backwards. A palindrome remains identical when its characters are reversed.\n\nConstraints:\n• 1 <= length of N <= 10^5\n• N does not contain leading zeros.",
    fmt: "Print exactly \"Palindrome\" if it is a palindrome, or \"Not Palindrome\" otherwise.",
    tests: [{"in":"12321","out":"Palindrome"},{"in":"123","out":"Not Palindrome"},{"in":"7","out":"Palindrome"},{"in":"12321","out":"Palindrome","hidden":true},{"in":"12321","out":"Palindrome","hidden":true},{"in":"12321","out":"Palindrome","hidden":true},{"in":"12321","out":"Palindrome","hidden":true},{"in":"12321","out":"Palindrome","hidden":true},{"in":"12321","out":"Palindrome","hidden":true},{"in":"12321","out":"Palindrome","hidden":true}],
    hints: ["Convert the string into an array of characters, reverse the array, join it back, and compare with the original string.", "Convert N to string S. Reverse S to get R. If S equals R, it is a palindrome.", "s === s.split('').reverse().join('')"],
    nqtTag: "Repeated in NQT" },

  { track: "tcs-nqt", id: "factorial", level: "Easy", title: "Factorial",
    desc: "Given a non-negative integer N, compute its factorial, denoted as N!. The factorial of N is the product of all positive integers less than or equal to N.\n\nNote: By definition, 0! = 1.\n\nConstraints:\n• 0 <= N <= 20",
    fmt: "Print a single integer representing N!.",
    tests: [{"in":"5","out":"120"},{"in":"0","out":"1"},{"in":"6","out":"720"},{"in":"5","out":"120","hidden":true},{"in":"5","out":"120","hidden":true},{"in":"5","out":"120","hidden":true},{"in":"5","out":"120","hidden":true},{"in":"5","out":"120","hidden":true},{"in":"5","out":"120","hidden":true},{"in":"5","out":"120","hidden":true}],
    hints: ["Use a loop to multiply a running product by every integer from 1 up to N.", "Initialize result = 1. Loop i from 1 to N: result = result * i. Return result.", "for (let i = 1; i <= n; i++) result *= i;"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "vowels-consonants", level: "Easy", title: "Vowels & Consonants",
    desc: "Given a string S containing English letters and spaces, count the total number of vowels and consonants.\n\nVowels are 'a', 'e', 'i', 'o', 'u' (case-insensitive). All other alphabetical characters are consonants. Ignore spaces and punctuation.\n\nConstraints:\n• 1 <= length of S <= 10^4",
    fmt: "Print exactly in this format: \"Vowels: X, Consonants: Y\"",
    tests: [{"in":"hello world","out":"Vowels: 3, Consonants: 7"},{"in":"aeiou","out":"Vowels: 5, Consonants: 0"},{"in":"xyz","out":"Vowels: 0, Consonants: 3"},{"in":"hello world","out":"Vowels: 3, Consonants: 7","hidden":true},{"in":"hello world","out":"Vowels: 3, Consonants: 7","hidden":true},{"in":"hello world","out":"Vowels: 3, Consonants: 7","hidden":true},{"in":"hello world","out":"Vowels: 3, Consonants: 7","hidden":true},{"in":"hello world","out":"Vowels: 3, Consonants: 7","hidden":true},{"in":"hello world","out":"Vowels: 3, Consonants: 7","hidden":true},{"in":"hello world","out":"Vowels: 3, Consonants: 7","hidden":true}],
    hints: ["Convert the string to lowercase and check each character against a predefined string or set of vowels.", "Initialize v = 0, c = 0. For each char in S: if it is a letter, check if it's in 'aeiou'. If yes, v++. Else c++.", "if ('aeiou'.includes(char)) v++; else c++;"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "multiplication-table", level: "Easy", title: "Multiplication Table",
    desc: "Given an integer N, generate its multiplication table from 1 to 10.\n\nConstraints:\n• -10^4 <= N <= 10^4",
    fmt: "Print exactly 10 integers separated by single spaces.",
    tests: [{"in":"3","out":"3 6 9 12 15 18 21 24 27 30"},{"in":"1","out":"1 2 3 4 5 6 7 8 9 10"},{"in":"5","out":"5 10 15 20 25 30 35 40 45 50"},{"in":"3","out":"3 6 9 12 15 18 21 24 27 30","hidden":true},{"in":"3","out":"3 6 9 12 15 18 21 24 27 30","hidden":true},{"in":"3","out":"3 6 9 12 15 18 21 24 27 30","hidden":true},{"in":"3","out":"3 6 9 12 15 18 21 24 27 30","hidden":true},{"in":"3","out":"3 6 9 12 15 18 21 24 27 30","hidden":true},{"in":"3","out":"3 6 9 12 15 18 21 24 27 30","hidden":true},{"in":"3","out":"3 6 9 12 15 18 21 24 27 30","hidden":true}],
    hints: ["Use a loop from 1 to 10 and multiply the given number by the loop variable at each step.", "Create an empty array. Loop i from 1 to 10, push N * i to the array. Join the array with spaces.", "Array.from({length: 10}, (_, i) => n * (i + 1)).join(' ')"] },

  { track: "tcs-nqt", id: "swap-two-numbers", level: "Easy", title: "Swap Two Numbers",
    desc: "Given two integers A and B, swap their values and print them. Try to optimize this by solving it without declaring a third temporary variable.\n\nConstraints:\n• -10^9 <= A, B <= 10^9",
    fmt: "Print the two swapped numbers separated by a single space.",
    tests: [{"in":"4 9","out":"9 4"},{"in":"1 2","out":"2 1"},{"in":"8 3","out":"3 8"},{"in":"4 9","out":"9 4","hidden":true},{"in":"4 9","out":"9 4","hidden":true},{"in":"4 9","out":"9 4","hidden":true},{"in":"4 9","out":"9 4","hidden":true},{"in":"4 9","out":"9 4","hidden":true},{"in":"4 9","out":"9 4","hidden":true},{"in":"4 9","out":"9 4","hidden":true}],
    hints: ["Use arithmetic operations (addition and subtraction) or XOR bitwise operations to swap values without a temporary variable.", "A = A + B; B = A - B; A = A - B.", "a = a + b; b = a - b; a = a - b;"] },

  { track: "tcs-nqt", id: "even-numbers-1-n", level: "Easy", title: "Even Numbers 1..N",
    desc: "Given an integer N, print all strictly even numbers starting from 1 up to N inclusive.\n\nConstraints:\n• 1 <= N <= 1000",
    fmt: "Print the even numbers sequentially, separated by single spaces.",
    tests: [{"in":"10","out":"2 4 6 8 10"},{"in":"6","out":"2 4 6"},{"in":"2","out":"2"},{"in":"10","out":"2 4 6 8 10","hidden":true},{"in":"10","out":"2 4 6 8 10","hidden":true},{"in":"10","out":"2 4 6 8 10","hidden":true},{"in":"10","out":"2 4 6 8 10","hidden":true},{"in":"10","out":"2 4 6 8 10","hidden":true},{"in":"10","out":"2 4 6 8 10","hidden":true},{"in":"10","out":"2 4 6 8 10","hidden":true}],
    hints: ["Loop from 1 to N, and collect numbers that are cleanly divisible by 2.", "Create empty array. Loop i from 1 to N. If i % 2 == 0, append i. Print space-separated array.", "if (i % 2 === 0) result.push(i);"] },

  { track: "tcs-nqt", id: "leap-year", level: "Easy", title: "Leap Year",
    desc: "Given a year N, determine whether it is a leap year.\n\nA year is a leap year if it satisfies one of these two conditions:\n1. It is divisible by 400, OR\n2. It is divisible by 4 but NOT divisible by 100.\n\nExamples: 2000 is a leap year (divisible by 400). 1900 is not (divisible by 100 but not 400). 2024 is a leap year (divisible by 4, not by 100).\n\nConstraints:\n• 1 <= N <= 9999",
    fmt: "Print exactly \"YES\" if it is a leap year, or \"NO\" otherwise.",
    tests: [{"in":"2024","out":"YES"},{"in":"1900","out":"NO"},{"in":"2000","out":"YES"},{"in":"2024","out":"YES","hidden":true},{"in":"2024","out":"YES","hidden":true},{"in":"2024","out":"YES","hidden":true},{"in":"2024","out":"YES","hidden":true},{"in":"2024","out":"YES","hidden":true},{"in":"2024","out":"YES","hidden":true},{"in":"2024","out":"YES","hidden":true}],
    hints: ["Apply the logical rules for leap years: divisible by 400, OR divisible by 4 but not 100.", "If N % 400 == 0, return YES. Else if N % 100 == 0, return NO. Else if N % 4 == 0, return YES.", "n % 400 === 0 || (n % 4 === 0 && n % 100 !== 0)"],
    nqtTag: "Repeated in NQT" },

  { track: "tcs-nqt", id: "handshake-problem", level: "Easy", title: "Handshake Problem",
    desc: "N people are in a room. Each person shakes hands with every other person exactly once. Given N, find the total number of handshakes.\n\nFormula: Total handshakes = N × (N − 1) / 2.\n\nThis is equivalent to choosing 2 people from N (combinations: N choose 2), since each unique pair of people performs one handshake.\n\nConstraints:\n• 2 <= N <= 10^4",
    fmt: "Print a single integer — the total number of handshakes.",
    tests: [{"in":"4","out":"6"},{"in":"10","out":"45"},{"in":"2","out":"1"},{"in":"4","out":"6","hidden":true},{"in":"4","out":"6","hidden":true},{"in":"4","out":"6","hidden":true},{"in":"4","out":"6","hidden":true},{"in":"4","out":"6","hidden":true},{"in":"4","out":"6","hidden":true},{"in":"4","out":"6","hidden":true}],
    hints: ["Use the mathematical combinations formula for choosing 2 items from N items.", "Calculate and print N * (N - 1) / 2.", "(n * (n - 1)) / 2"],
    nqtTag: "Repeated in NQT" },

  { track: "tcs-nqt", id: "fibonacci-series", level: "Easy", title: "Fibonacci Series",
    desc: "The Fibonacci sequence is defined such that each number is the sum of the two preceding ones, starting from 0 and 1. Given N, print the first N terms of the sequence.\n\nFormula: F(n) = F(n-1) + F(n-2) where F(1)=0, F(2)=1.\n\nConstraints:\n• 1 <= N <= 40",
    fmt: "Print N integers separated by single spaces.",
    tests: [{"in":"7","out":"0 1 1 2 3 5 8"},{"in":"1","out":"0"},{"in":"5","out":"0 1 1 2 3"},{"in":"7","out":"0 1 1 2 3 5 8","hidden":true},{"in":"7","out":"0 1 1 2 3 5 8","hidden":true},{"in":"7","out":"0 1 1 2 3 5 8","hidden":true},{"in":"7","out":"0 1 1 2 3 5 8","hidden":true},{"in":"7","out":"0 1 1 2 3 5 8","hidden":true},{"in":"7","out":"0 1 1 2 3 5 8","hidden":true},{"in":"7","out":"0 1 1 2 3 5 8","hidden":true}],
    hints: ["Keep track of the last two numbers iteratively to generate the next number in the sequence.", "Initialize a = 0, b = 1. Add 'a' to result. For 2 to N, compute next = a + b; a = b; b = next; add 'a'.", "next = a + b; a = b; b = next;"],
    nqtTag: "Recently Asked" },

  { track: "tcs-nqt", id: "prime-number", level: "Easy", title: "Prime Number",
    desc: "Given an integer N, determine whether it is a prime number. A prime number is a natural number greater than 1 that is only divisible by 1 and itself.\n\nConstraints:\n• 1 <= N <= 10^9",
    fmt: "Print exactly \"Prime\" or \"Not Prime\".",
    tests: [{"in":"29","out":"Prime"},{"in":"1","out":"Not Prime"},{"in":"15","out":"Not Prime"},{"in":"29","out":"Prime","hidden":true},{"in":"29","out":"Prime","hidden":true},{"in":"29","out":"Prime","hidden":true},{"in":"29","out":"Prime","hidden":true},{"in":"29","out":"Prime","hidden":true},{"in":"29","out":"Prime","hidden":true},{"in":"29","out":"Prime","hidden":true}],
    hints: ["Check if the number is divisible by any integer starting from 2 up to its square root.", "If N <= 1 return Not Prime. Loop i from 2 to sqrt(N). If N % i == 0, return Not Prime. Else return Prime.", "for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;"],
    nqtTag: "Repeated in NQT" },

  { track: "tcs-nqt", id: "reverse-words", level: "Easy", title: "Reverse Words",
    desc: "Given a sentence string S, reverse the order of its words. A word is defined as a sequence of non-space characters.\n\nConstraints:\n• 1 <= length of S <= 10^4\n• S does not contain leading or trailing spaces.",
    fmt: "Print the words in reversed order separated by single spaces.",
    tests: [{"in":"I love coding","out":"coding love I"},{"in":"hello world","out":"world hello"},{"in":"a b c d","out":"d c b a"},{"in":"I love coding","out":"coding love I","hidden":true},{"in":"I love coding","out":"coding love I","hidden":true},{"in":"I love coding","out":"coding love I","hidden":true},{"in":"I love coding","out":"coding love I","hidden":true},{"in":"I love coding","out":"coding love I","hidden":true},{"in":"I love coding","out":"coding love I","hidden":true},{"in":"I love coding","out":"coding love I","hidden":true}],hints: ["Concept: Split the string by space to get words, reverse the resulting list, and rejoin them.", "Algorithm: Convert the string into a list of words using split. Reverse the list. Join the list elements using a space separator.", "s.split(' ').reverse().join(' ')"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "remove-duplicates", level: "Easy", title: "Remove Duplicates",
    desc: "Given a space-separated array of integers, remove all duplicate elements, keeping only the first occurrence of each element. Maintain the original relative order.\n\nConstraints:\n• 1 <= Array Length <= 10^5",
    fmt: "Print the unique integers separated by single spaces.",
    tests: [{"in":"1 2 2 3 4 4 5","out":"1 2 3 4 5"},{"in":"5 5 5","out":"5"},{"in":"9 1 9 2 1","out":"9 1 2"},{"in":"1 2 2 3 4 4 5","out":"1 2 3 4 5","hidden":true},{"in":"1 2 2 3 4 4 5","out":"1 2 3 4 5","hidden":true},{"in":"1 2 2 3 4 4 5","out":"1 2 3 4 5","hidden":true},{"in":"1 2 2 3 4 4 5","out":"1 2 3 4 5","hidden":true},{"in":"1 2 2 3 4 4 5","out":"1 2 3 4 5","hidden":true},{"in":"1 2 2 3 4 4 5","out":"1 2 3 4 5","hidden":true},{"in":"1 2 2 3 4 4 5","out":"1 2 3 4 5","hidden":true}],hints: ["Concept: Maintain a record of elements you have already seen to eliminate duplicates while keeping order.", "Algorithm: Initialize an empty list and a set for tracking. For each item, if it's not in the set, add it to the list and the set.", "Array.from(new Set(arr)).join(' ')"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "reverse-each-word", level: "Medium", title: "Reverse Each Word",
    desc: "Given a sentence, reverse the characters within each individual word while keeping the word order the same. This is different from reversing the entire sentence — only the characters inside each word are reversed.\n\nExample: 'Hello World' → 'olleH dlroW' (word order preserved, characters within each word reversed).\n\nConstraints:\n• 1 <= length of sentence <= 10^4\n• Sentence contains only English letters and single spaces.",
    fmt: "Print the sentence with each word's characters reversed, maintaining original word order.",
    tests: [{"in":"Hello World TCS","out":"olleH dlroW SCT"},{"in":"I love coding","out":"I evol gnidoc"},{"in":"cat dog","out":"tac god"},{"in":"Hello World TCS","out":"olleH dlroW SCT","hidden":true},{"in":"Hello World TCS","out":"olleH dlroW SCT","hidden":true},{"in":"Hello World TCS","out":"olleH dlroW SCT","hidden":true},{"in":"Hello World TCS","out":"olleH dlroW SCT","hidden":true},{"in":"Hello World TCS","out":"olleH dlroW SCT","hidden":true},{"in":"Hello World TCS","out":"olleH dlroW SCT","hidden":true},{"in":"Hello World TCS","out":"olleH dlroW SCT","hidden":true}],hints: ["Concept: Iterate over each word in the sentence and reverse its characters independently.", "Algorithm: Split the sentence into words. For each word, split into characters, reverse, and join. Join all words back.", "words.map(w => w.split('').reverse().join('')).join(' ')"],
    nqtTag: "Repeated in NQT" },

  { track: "tcs-nqt", id: "gcd-and-lcm", level: "Medium", title: "GCD and LCM",
    desc: "Given two positive integers A and B, compute their GCD (Greatest Common Divisor) and LCM (Least Common Multiple).\n\n• GCD: the largest integer that divides both A and B without remainder.\n• LCM: the smallest positive integer divisible by both A and B.\n• Useful relation: LCM(A, B) = (A × B) / GCD(A, B).\n\nUse the Euclidean algorithm: GCD(a, b) = GCD(b, a mod b) until b = 0.\n\nConstraints:\n• 1 <= A, B <= 10^9",
    fmt: "Print two lines: GCD on the first line, LCM on the second line.",
    tests: [{"in":"12 18","out":"6\n36"},{"in":"4 6","out":"2\n12"},{"in":"15 20","out":"5\n60"},{"in":"12 18","out":"6\n36","hidden":true},{"in":"12 18","out":"6\n36","hidden":true},{"in":"12 18","out":"6\n36","hidden":true},{"in":"12 18","out":"6\n36","hidden":true},{"in":"12 18","out":"6\n36","hidden":true},{"in":"12 18","out":"6\n36","hidden":true},{"in":"12 18","out":"6\n36","hidden":true}],hints: ["Concept: Use the Euclidean algorithm for GCD. Then LCM is the product of the numbers divided by their GCD.", "Algorithm: GCD(A, B): while B > 0, temp = B, B = A % B, A = temp. Then LCM = (original_A * original_B) / GCD.", "gcd = (a, b) => b === 0 ? a : gcd(b, a % b)"],
    nqtTag: "Repeated in NQT" },

  { track: "tcs-nqt", id: "pyramid-pattern", level: "Medium", title: "Pyramid Pattern",
    desc: "Given N, print a right-aligned triangle of * with N rows. Row 1 has 1 star, row N has N stars.",
    fmt: "Print N lines of *",
    tests: [{"in":"3","out":"  *\n **\n***"},{"in":"2","out":" *\n**"},{"in":"1","out":"*"},{"in":"3","out":"  *\n **\n***","hidden":true},{"in":"3","out":"  *\n **\n***","hidden":true},{"in":"3","out":"  *\n **\n***","hidden":true},{"in":"3","out":"  *\n **\n***","hidden":true},{"in":"3","out":"  *\n **\n***","hidden":true},{"in":"3","out":"  *\n **\n***","hidden":true},{"in":"3","out":"  *\n **\n***","hidden":true}],hints: ["Concept: Print rows with increasing asterisks, padded with spaces on the left to form a right-aligned triangle.", "Algorithm: Loop from i=1 to N. For each row, print (N - i) spaces followed by i asterisks.", "' '.repeat(n - i) + '*'.repeat(i)"],
    nqtTag: "Repeated in NQT" },

  { track: "tcs-nqt", id: "missing-number", level: "Medium", title: "Missing Number",
    desc: "Given array of N-1 integers from 1 to N with one missing, find it. Use sum formula: N*(N+1)/2 - sum(array).",
    fmt: "Print the missing number",
    tests: [{"in":"5\n1 2 4 5","out":"3"},{"in":"3\n1 3","out":"2"},{"in":"4\n2 3 4","out":"1"},{"in":"5\n1 2 4 5","out":"3","hidden":true},{"in":"5\n1 2 4 5","out":"3","hidden":true},{"in":"5\n1 2 4 5","out":"3","hidden":true},{"in":"5\n1 2 4 5","out":"3","hidden":true},{"in":"5\n1 2 4 5","out":"3","hidden":true},{"in":"5\n1 2 4 5","out":"3","hidden":true},{"in":"5\n1 2 4 5","out":"3","hidden":true}],hints: ["Concept: Calculate the sum of the first N integers mathematically and subtract the sum of the array.", "Algorithm: Compute total = N * (N + 1) / 2. Sum the array elements. The missing number is total - arraySum.", "missing = (n * (n + 1)) / 2 - arr.reduce((a, b) => a + b, 0)"],
    nqtTag: "Repeated in NQT" },

  { track: "tcs-nqt", id: "row-and-column-sum", level: "Medium", title: "Row and Column Sum",
    desc: "Given N×N matrix, print sum of each row on one line, then sum of each column on the next line, space-separated. Input: N, then N lines.",
    fmt: "Two lines: row sums, then col sums.",
    tests: [{"in":"2\n1 2\n3 4","out":"3 7\n4 6"},{"in":"3\n1 0 0\n0 1 0\n0 0 1","out":"1 1 1\n1 1 1"},{"in":"1\n5","out":"5\n5"},{"in":"2\n1 2\n3 4","out":"3 7\n4 6","hidden":true},{"in":"2\n1 2\n3 4","out":"3 7\n4 6","hidden":true},{"in":"2\n1 2\n3 4","out":"3 7\n4 6","hidden":true},{"in":"2\n1 2\n3 4","out":"3 7\n4 6","hidden":true},{"in":"2\n1 2\n3 4","out":"3 7\n4 6","hidden":true},{"in":"2\n1 2\n3 4","out":"3 7\n4 6","hidden":true},{"in":"2\n1 2\n3 4","out":"3 7\n4 6","hidden":true}],hints: ["Concept: Maintain two lists for row sums and column sums, updating them simultaneously during matrix traversal.", "Algorithm: Initialize rowSums and colSums arrays of size N with zeros. Iterate matrix; add matrix[i][j] to rowSums[i] and colSums[j].", "rowSums[i] += matrix[i][j]; colSums[j] += matrix[i][j]"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "left-rotate-string", level: "Medium", title: "Left Rotate String",
    desc: "Given string S and integer K, rotate S left by K characters. Input: string S, then K.",
    fmt: "Rotated string",
    tests: [{"in":"hello\n2","out":"llohe"},{"in":"tcs\n1","out":"cst"},{"in":"abcd\n4","out":"abcd"},{"in":"hello\n2","out":"llohe","hidden":true},{"in":"hello\n2","out":"llohe","hidden":true},{"in":"hello\n2","out":"llohe","hidden":true},{"in":"hello\n2","out":"llohe","hidden":true},{"in":"hello\n2","out":"llohe","hidden":true},{"in":"hello\n2","out":"llohe","hidden":true},{"in":"hello\n2","out":"llohe","hidden":true}],hints: ["Concept: A left rotation by K shifts the first K characters to the end. Handle cases where K > length.", "Algorithm: Take K = K % length. Concatenate the substring from K to end with the substring from 0 to K.", "s.slice(k % s.length) + s.slice(0, k % s.length)"],
    nqtTag: "Repeated in NQT" },

  { track: "tcs-nqt", id: "armstrong-number", level: "Medium", title: "Armstrong Number",
    desc: "An Armstrong number (or narcissistic number) is a number that is equal to the sum of its own digits each raised to the power of the number of digits.\n\nFor example, 153 has 3 digits. 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153.\n\nConstraints:\n• 1 <= N <= 10^9",
    fmt: "Print exactly \"Armstrong\" or \"Not Armstrong\".",
    tests: [{"in":"153","out":"Armstrong"},{"in":"123","out":"Not Armstrong"},{"in":"9","out":"Armstrong"},{"in":"153","out":"Armstrong","hidden":true},{"in":"153","out":"Armstrong","hidden":true},{"in":"153","out":"Armstrong","hidden":true},{"in":"153","out":"Armstrong","hidden":true},{"in":"153","out":"Armstrong","hidden":true},{"in":"153","out":"Armstrong","hidden":true},{"in":"153","out":"Armstrong","hidden":true}],hints: ["Concept: An Armstrong number equals the sum of its digits, each raised to the power of the total number of digits.", "Algorithm: Convert number to string to get length L. For each digit, add digit^L to sum. Check if sum equals original.", "digits.reduce((sum, d) => sum + Math.pow(Number(d), digits.length), 0)"],
    nqtTag: "Repeated in NQT" },

  { track: "tcs-nqt", id: "second-largest", level: "Medium", title: "Second Largest",
    desc: "Given a space-separated array of integers, find the second largest distinct value. If all values are identical, return the single value.\n\nConstraints:\n• 1 <= Array Length <= 10^5\n• -10^9 <= Array Elements <= 10^9",
    fmt: "Print a single integer.",
    tests: [{"in":"3 1 4 1 5 9 2","out":"5"},{"in":"10 20","out":"10"},{"in":"5 5 4","out":"4"},{"in":"3 1 4 1 5 9 2","out":"5","hidden":true},{"in":"3 1 4 1 5 9 2","out":"5","hidden":true},{"in":"3 1 4 1 5 9 2","out":"5","hidden":true},{"in":"3 1 4 1 5 9 2","out":"5","hidden":true},{"in":"3 1 4 1 5 9 2","out":"5","hidden":true},{"in":"3 1 4 1 5 9 2","out":"5","hidden":true},{"in":"3 1 4 1 5 9 2","out":"5","hidden":true}],hints: ["Concept: Track the maximum and the second maximum simultaneously in one pass, ignoring duplicates.", "Algorithm: Init max and second_max to -infinity. Loop: if val > max, second_max = max and max = val. Else if val > second_max and val != max, second_max = val.", "if (val > max) { secondMax = max; max = val; }"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "character-frequency", level: "Medium", title: "Character Frequency",
    desc: "Given a string S, determine the frequency of each character present in the string. Output the results sorted alphabetically by the character.\n\nConstraints:\n• 1 <= length of S <= 1000\n• S contains only lowercase English letters.",
    fmt: "Print space-separated \"char:count\" pairs (e.g., a:2 b:1).",
    tests: [{"in":"apple","out":"a:1 e:1 l:1 p:2"},{"in":"aab","out":"a:2 b:1"},{"in":"zzz","out":"z:3"},{"in":"apple","out":"a:1 e:1 l:1 p:2","hidden":true},{"in":"apple","out":"a:1 e:1 l:1 p:2","hidden":true},{"in":"apple","out":"a:1 e:1 l:1 p:2","hidden":true},{"in":"apple","out":"a:1 e:1 l:1 p:2","hidden":true},{"in":"apple","out":"a:1 e:1 l:1 p:2","hidden":true},{"in":"apple","out":"a:1 e:1 l:1 p:2","hidden":true},{"in":"apple","out":"a:1 e:1 l:1 p:2","hidden":true}],hints: ["Concept: Use a frequency map to count occurrences, then sort the characters alphabetically to print.", "Algorithm: Create map. For each char, increment map[char]. Get map keys, sort alphabetically, format as char:count and join.", "Object.keys(map).sort().map(k => `${k}:${map[k]}`).join(' ')"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "digital-root", level: "Medium", title: "Digital Root",
    desc: "Given a non-negative integer N, repeatedly add all its digits until the result has only one digit. This final single digit is known as the digital root.\n\nFor example: 9875 → 9+8+7+5 = 29 → 2+9 = 11 → 1+1 = 2.\n\nConstraints:\n• 0 <= N <= 10^18",
    fmt: "Print a single integer between 0 and 9.",
    tests: [{"in":"9875","out":"2"},{"in":"9","out":"9"},{"in":"10","out":"1"},{"in":"9875","out":"2","hidden":true},{"in":"9875","out":"2","hidden":true},{"in":"9875","out":"2","hidden":true},{"in":"9875","out":"2","hidden":true},{"in":"9875","out":"2","hidden":true},{"in":"9875","out":"2","hidden":true},{"in":"9875","out":"2","hidden":true}],hints: ["Concept: The digital root of a number is essentially its modulo 9. (If perfectly divisible by 9, root is 9).", "Algorithm: If N == 0 return 0. If N % 9 == 0 return 9. Otherwise return N % 9.", "return n === 0 ? 0 : (n % 9 === 0 ? 9 : n % 9)"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "number-triangle", level: "Medium", title: "Number Triangle",
    desc: "Given an integer N, generate a right-angled number triangle. The triangle should have N rows, where the i-th row contains the sequence of numbers from 1 up to i.\n\nConstraints:\n• 1 <= N <= 20",
    fmt: "Print N lines. The i-th line should contain 1 to i, separated by single spaces.",
    tests: [{"in":"4","out":"1\n1 2\n1 2 3\n1 2 3 4"},{"in":"2","out":"1\n1 2"},{"in":"1","out":"1"},{"in":"4","out":"1\n1 2\n1 2 3\n1 2 3 4","hidden":true},{"in":"4","out":"1\n1 2\n1 2 3\n1 2 3 4","hidden":true},{"in":"4","out":"1\n1 2\n1 2 3\n1 2 3 4","hidden":true},{"in":"4","out":"1\n1 2\n1 2 3\n1 2 3 4","hidden":true},{"in":"4","out":"1\n1 2\n1 2 3\n1 2 3 4","hidden":true},{"in":"4","out":"1\n1 2\n1 2 3\n1 2 3 4","hidden":true},{"in":"4","out":"1\n1 2\n1 2 3\n1 2 3 4","hidden":true}],hints: ["Concept: Print sequences of numbers starting from 1 up to the current row number.", "Algorithm: Loop i from 1 to N. Loop j from 1 to i. Collect j into a string. Print the string for row i.", "Array.from({length: i}, (_, idx) => idx + 1).join(' ')"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "anagram-strings", level: "Medium", title: "Anagram Strings",
    desc: "Given two strings, determine if they are anagrams. Two strings are anagrams if they contain the same characters with the same frequencies.",
    fmt: "Print 'True' or 'False'.",
    tests: [{"in":"listen\nsilent","out":"True"},{"in":"hello\nworld","out":"False"},{"in":"listen\nsilent","out":"True","hidden":true},{"in":"listen\nsilent","out":"True","hidden":true},{"in":"listen\nsilent","out":"True","hidden":true},{"in":"listen\nsilent","out":"True","hidden":true},{"in":"listen\nsilent","out":"True","hidden":true},{"in":"listen\nsilent","out":"True","hidden":true},{"in":"listen\nsilent","out":"True","hidden":true},{"in":"listen\nsilent","out":"True","hidden":true}],
    hints: ["Concept: Two strings are anagrams if their character frequency maps are perfectly identical.", "Algorithm: Check lengths. Create frequency map. Loop strings: increment map for string A, decrement for string B. If any value in map != 0, false.", "charCount[char] = (charCount[char] || 0) + 1"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "prime-factorization", level: "Medium", title: "Prime Factorization",
    desc: "Given an integer N, compute its prime factorization. Output all prime factors in ascending order. If a prime factor appears multiple times, it should be printed that many times.\n\nConstraints:\n• 2 <= N <= 10^9",
    fmt: "Print the prime factors separated by single spaces.",
    tests: [{"in":"60","out":"2 2 3 5"},{"in":"13","out":"13"},{"in":"8","out":"2 2 2"},{"in":"60","out":"2 2 3 5","hidden":true},{"in":"60","out":"2 2 3 5","hidden":true},{"in":"60","out":"2 2 3 5","hidden":true},{"in":"60","out":"2 2 3 5","hidden":true},{"in":"60","out":"2 2 3 5","hidden":true},{"in":"60","out":"2 2 3 5","hidden":true},{"in":"60","out":"2 2 3 5","hidden":true}],hints: ["Concept: Repeatedly divide N by the smallest possible integer (starting from 2) to find prime factors.", "Algorithm: Start i = 2. While i * i <= N: if N % i == 0, add i to list and N = N / i. Else i++. Finally if N > 1, add N.", "while (n % i === 0) { factors.push(i); n /= i; }"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "matrix-transpose", level: "Medium", title: "Matrix Transpose",
    desc: "Given an integer N on the first line, followed by N lines representing an N x N matrix, compute the transpose of the matrix. The transpose is formed by turning all the rows into columns and vice versa.\n\nConstraints:\n• 1 <= N <= 100\n• -1000 <= matrix elements <= 1000",
    fmt: "Print N lines, where each line contains N space-separated integers.",
    tests: [{"in":"3\n1 2 3\n4 5 6\n7 8 9","out":"1 4 7\n2 5 8\n3 6 9"},{"in":"2\n1 2\n3 4","out":"1 3\n2 4"},{"in":"3\n1 2 3\n4 5 6\n7 8 9","out":"1 4 7\n2 5 8\n3 6 9","hidden":true},{"in":"3\n1 2 3\n4 5 6\n7 8 9","out":"1 4 7\n2 5 8\n3 6 9","hidden":true},{"in":"3\n1 2 3\n4 5 6\n7 8 9","out":"1 4 7\n2 5 8\n3 6 9","hidden":true},{"in":"3\n1 2 3\n4 5 6\n7 8 9","out":"1 4 7\n2 5 8\n3 6 9","hidden":true},{"in":"3\n1 2 3\n4 5 6\n7 8 9","out":"1 4 7\n2 5 8\n3 6 9","hidden":true},{"in":"3\n1 2 3\n4 5 6\n7 8 9","out":"1 4 7\n2 5 8\n3 6 9","hidden":true},{"in":"3\n1 2 3\n4 5 6\n7 8 9","out":"1 4 7\n2 5 8\n3 6 9","hidden":true},{"in":"3\n1 2 3\n4 5 6\n7 8 9","out":"1 4 7\n2 5 8\n3 6 9","hidden":true}],hints: ["Concept: A transpose swaps rows with columns, meaning transposed[j][i] = matrix[i][j].", "Algorithm: Create an N x N matrix. Loop i from 0 to N-1, and j from 0 to N-1, setting transposed[j][i] = matrix[i][j].", "transposed[j][i] = matrix[i][j]"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "move-zeros-to-end", level: "Medium", title: "Move Zeros to End",
    desc: "Given an array of N integers, move all zeroes to the end while maintaining the relative order of all non-zero elements.\n\nThis is a classic TCS NQT problem sometimes called the 'Chocolate Factory' problem — empty packets (zeros) must be pushed to the end.\n\nConstraints:\n• 1 <= N <= 10^5\n• -10^9 <= elements <= 10^9",
    fmt: "Print the modified array elements separated by single spaces.",
    tests: [{"in":"8\n4 5 0 1 9 0 5 0","out":"4 5 1 9 5 0 0 0"},{"in":"6\n6 0 1 8 0 2","out":"6 1 8 2 0 0"},{"in":"5\n1 2 3 4 5","out":"1 2 3 4 5"},{"in":"8\n4 5 0 1 9 0 5 0","out":"4 5 1 9 5 0 0 0","hidden":true},{"in":"8\n4 5 0 1 9 0 5 0","out":"4 5 1 9 5 0 0 0","hidden":true},{"in":"8\n4 5 0 1 9 0 5 0","out":"4 5 1 9 5 0 0 0","hidden":true},{"in":"8\n4 5 0 1 9 0 5 0","out":"4 5 1 9 5 0 0 0","hidden":true},{"in":"8\n4 5 0 1 9 0 5 0","out":"4 5 1 9 5 0 0 0","hidden":true},{"in":"8\n4 5 0 1 9 0 5 0","out":"4 5 1 9 5 0 0 0","hidden":true},{"in":"8\n4 5 0 1 9 0 5 0","out":"4 5 1 9 5 0 0 0","hidden":true}],hints: ["Concept: Shift all non-zero elements forward in order, then fill the remaining array spaces with zeros.", "Algorithm: Keep an insert index. If element != 0, place it at insert index and increment index. Finally fill from index to end with 0.", "if (arr[i] !== 0) arr[insertPos++] = arr[i]"],
    nqtTag: "Repeated in NQT" },

  { track: "tcs-nqt", id: "odd-occurring-element", level: "Medium", title: "Odd Occurring Element",
    desc: "Given an array of N integers where every element appears an even number of times except exactly one element, find the element that appears an odd number of times.\n\nHint: XOR of all elements gives the answer in O(N) time — any number XOR'd with itself is 0, and 0 XOR x = x.\n\nConstraints:\n• 1 <= N <= 10^5 (N is always odd)\n• All array elements are positive integers",
    fmt: "Print a single integer — the element that occurs an odd number of times.",
    tests: [{"in":"5\n2 2 3 1 1","out":"3"},{"in":"5\n4 4 3 3 7","out":"7"},{"in":"1\n5","out":"5"},{"in":"5\n2 2 3 1 1","out":"3","hidden":true},{"in":"5\n2 2 3 1 1","out":"3","hidden":true},{"in":"5\n2 2 3 1 1","out":"3","hidden":true},{"in":"5\n2 2 3 1 1","out":"3","hidden":true},{"in":"5\n2 2 3 1 1","out":"3","hidden":true},{"in":"5\n2 2 3 1 1","out":"3","hidden":true},{"in":"5\n2 2 3 1 1","out":"3","hidden":true}],hints: ["Concept: Use the XOR bitwise operator. Any number XORed with itself is 0, isolating the odd-occurring element.", "Algorithm: Initialize result = 0. Iterate through the array, setting result = result XOR current_element. Return result.", "result ^= arr[i]"],
    nqtTag: "Repeated in NQT" },

  { track: "tcs-nqt", id: "array-rotation", level: "Medium", title: "Array Rotation",
    desc: "Given array and K, rotate left by K positions. Input: first line is N, second line is the array, third line is K.",
    fmt: "Print space-separated array",
    tests: [{"in":"5\n1 2 3 4 5\n2","out":"3 4 5 1 2"},{"in":"3\n1 2 3\n1","out":"2 3 1"},{"in":"4\n10 20 30 40\n0","out":"10 20 30 40"},{"in":"5\n1 2 3 4 5\n2","out":"3 4 5 1 2","hidden":true},{"in":"5\n1 2 3 4 5\n2","out":"3 4 5 1 2","hidden":true},{"in":"5\n1 2 3 4 5\n2","out":"3 4 5 1 2","hidden":true},{"in":"5\n1 2 3 4 5\n2","out":"3 4 5 1 2","hidden":true},{"in":"5\n1 2 3 4 5\n2","out":"3 4 5 1 2","hidden":true},{"in":"5\n1 2 3 4 5\n2","out":"3 4 5 1 2","hidden":true},{"in":"5\n1 2 3 4 5\n2","out":"3 4 5 1 2","hidden":true}],hints: ["Concept: Rotate the array by reversing parts: reverse first K, reverse the rest, then reverse all.", "Algorithm: K = K % N. Reverse array from 0 to K-1. Reverse from K to N-1. Reverse from 0 to N-1.", "reverse(arr, 0, k - 1); reverse(arr, k, n - 1); reverse(arr, 0, n - 1);"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "number-pattern", level: "Medium", title: "Number Pattern",
    desc: "Given N, print a pattern where row i contains the number i repeated i times (e.g. row 1: 1, row 2: 2 2, row 3: 3 3 3).",
    fmt: "Print N lines, space-separated in each row.",
    tests: [{"in":"3","out":"1\n2 2\n3 3 3"},{"in":"2","out":"1\n2 2"},{"in":"4","out":"1\n2 2\n3 3 3\n4 4 4 4"},{"in":"3","out":"1\n2 2\n3 3 3","hidden":true},{"in":"3","out":"1\n2 2\n3 3 3","hidden":true},{"in":"3","out":"1\n2 2\n3 3 3","hidden":true},{"in":"3","out":"1\n2 2\n3 3 3","hidden":true},{"in":"3","out":"1\n2 2\n3 3 3","hidden":true},{"in":"3","out":"1\n2 2\n3 3 3","hidden":true},{"in":"3","out":"1\n2 2\n3 3 3","hidden":true}],hints: ["Concept: Print rows where the row number is repeated exactly as many times as its value.", "Algorithm: Loop i from 1 to N. Create an array of size i filled with i, join with spaces, and print.", "Array(i).fill(i).join(' ')"],
    nqtTag: "Repeated in NQT" },

  { track: "tcs-nqt", id: "two-sum", level: "Medium", title: "Two Sum",
    desc: "You are given a space-separated array of integers on the first line, and a target integer on the second line. Find the indices of the two numbers such that they add up to the target.\n\nAssume there is exactly one valid solution, and you may not use the same element twice. The output must be sorted (i < j).\n\nConstraints:\n• 2 <= Array Length <= 10^4\n• -10^9 <= Target <= 10^9",
    fmt: "Print the two zero-based indices separated by a space.",
    tests: [{"in":"2 7 11 15\n9","out":"0 1"},{"in":"3 2 4\n6","out":"1 2"},{"in":"1 5 3 4\n7","out":"2 3"},{"in":"2 7 11 15\n9","out":"0 1","hidden":true},{"in":"2 7 11 15\n9","out":"0 1","hidden":true},{"in":"2 7 11 15\n9","out":"0 1","hidden":true},{"in":"2 7 11 15\n9","out":"0 1","hidden":true},{"in":"2 7 11 15\n9","out":"0 1","hidden":true},{"in":"2 7 11 15\n9","out":"0 1","hidden":true},{"in":"2 7 11 15\n9","out":"0 1","hidden":true}],hints: ["Concept: Use a map to store the complement (target - current) and its index to find the pair in O(N).", "Algorithm: Loop array with index i. Check if target - arr[i] is in map. If yes, return indices. Else, map[arr[i]] = i.", "if (map.has(target - num)) return [map.get(target - num), i]"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "roman-numeral", level: "Medium", title: "Roman Numeral",
    desc: "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M. Given an integer N, convert it to a Roman numeral.\n\nRules:\n• I can be placed before V (5) and X (10) to make 4 and 9.\n• X can be placed before L (50) and C (100) to make 40 and 90.\n• C can be placed before D (500) and M (1000) to make 400 and 900.\n\nConstraints:\n• 1 <= N <= 3999",
    fmt: "Print the Roman numeral string in uppercase.",
    tests: [{"in":"58","out":"LVIII"},{"in":"9","out":"IX"},{"in":"2024","out":"MMXXIV"},{"in":"58","out":"LVIII","hidden":true},{"in":"58","out":"LVIII","hidden":true},{"in":"58","out":"LVIII","hidden":true},{"in":"58","out":"LVIII","hidden":true},{"in":"58","out":"LVIII","hidden":true},{"in":"58","out":"LVIII","hidden":true},{"in":"58","out":"LVIII","hidden":true}],hints: ["Concept: Start with the largest Roman numerals and subtract their values from N as many times as possible.", "Algorithm: Create a list of (value, symbol) pairs in descending order. Iterate pairs: while N >= value, append symbol to result and N -= value.", "while (n >= val) { result += sym; n -= val; }"],
    nqtTag: "Recently Asked" },

  { track: "tcs-nqt", id: "count-sundays", level: "Hard", title: "Count Sundays",
    desc: "Given a starting day of the week and N total days, count how many Sundays fall within those N days (the first day is day 1 and is included).\n\nInput: first line is the starting day name (Monday / Tuesday / Wednesday / Thursday / Friday / Saturday / Sunday), second line is N.\n\nExample: starting Monday, N=7 → days are Mon Tue Wed Thu Fri Sat Sun → exactly 1 Sunday.\n\nConstraints:\n• 1 <= N <= 10^6",
    fmt: "Print a single integer — the total count of Sundays.",
    tests: [{"in":"Monday\n7","out":"1"},{"in":"Sunday\n14","out":"2"},{"in":"Friday\n9","out":"1"},{"in":"Monday\n7","out":"1","hidden":true},{"in":"Monday\n7","out":"1","hidden":true},{"in":"Monday\n7","out":"1","hidden":true},{"in":"Monday\n7","out":"1","hidden":true},{"in":"Monday\n7","out":"1","hidden":true},{"in":"Monday\n7","out":"1","hidden":true},{"in":"Monday\n7","out":"1","hidden":true}],hints: ["Concept: Map Monday to 0 and Sunday to 6, then use modulo arithmetic to compute the exact number of Sundays.", "Algorithm: Find offset of start day. Sundays count = floor((N + offset) / 7).", "Math.floor((n + startDayIndex) / 7)"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "longest-unique-substring", level: "Hard", title: "Longest Unique Substring",
    desc: "Given a string S, find the length of the longest continuous substring that contains no repeating characters.\n\nFor example, in 'abcabcbb', the longest unique substring is 'abc', with a length of 3.\n\nConstraints:\n• 0 <= length of S <= 5 * 10^4\n• S consists of English letters, digits, symbols and spaces.",
    fmt: "Print a single integer representing the maximum length.",
    tests: [{"in":"abcabcbb","out":"3"},{"in":"bbbbb","out":"1"},{"in":"pwwkew","out":"3"},{"in":"abcabcbb","out":"3","hidden":true},{"in":"abcabcbb","out":"3","hidden":true},{"in":"abcabcbb","out":"3","hidden":true},{"in":"abcabcbb","out":"3","hidden":true},{"in":"abcabcbb","out":"3","hidden":true},{"in":"abcabcbb","out":"3","hidden":true},{"in":"abcabcbb","out":"3","hidden":true}],hints: ["Concept: Use a sliding window to track the current unique substring, shrinking from the left if duplicates occur.", "Algorithm: Init left=0, max=0. Loop right. If char in set, remove from left until char is gone. Add char, update max length.", "while (set.has(char)) set.delete(s[left++])"] },

  { track: "tcs-nqt", id: "balanced-brackets", level: "Hard", title: "Balanced Brackets",
    desc: "Given a string S containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n\nConstraints:\n• 1 <= length of S <= 10^4",
    fmt: "Print exactly \"Balanced\" or \"Not Balanced\".",
    tests: [{"in":"{[()]}","out":"Balanced"},{"in":"([)]","out":"Not Balanced"},{"in":"(((","out":"Not Balanced"}],hints: ["Concept: Use a stack. Push opening brackets, and for closing brackets, check if they match the stack's top.", "Algorithm: Loop characters. Push opening to stack. On closing, if stack empty or popped element doesn't match, return false. True if stack empty at end.", "stack.pop() !== match[char]"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "spiral-matrix-print", level: "Hard", title: "Spiral Matrix Print",
    desc: "Given N×M matrix, print elements in spiral order space-separated. Input: first line N and M, then N lines of M elements.",
    fmt: "Space-separated integers",
    tests: [{"in":"3 3\n1 2 3\n4 5 6\n7 8 9","out":"1 2 3 6 9 8 7 4 5"},{"in":"2 2\n1 2\n3 4","out":"1 2 4 3"},{"in":"1 3\n1 2 3","out":"1 2 3"},{"in":"3 3\n1 2 3\n4 5 6\n7 8 9","out":"1 2 3 6 9 8 7 4 5","hidden":true},{"in":"3 3\n1 2 3\n4 5 6\n7 8 9","out":"1 2 3 6 9 8 7 4 5","hidden":true},{"in":"3 3\n1 2 3\n4 5 6\n7 8 9","out":"1 2 3 6 9 8 7 4 5","hidden":true},{"in":"3 3\n1 2 3\n4 5 6\n7 8 9","out":"1 2 3 6 9 8 7 4 5","hidden":true},{"in":"3 3\n1 2 3\n4 5 6\n7 8 9","out":"1 2 3 6 9 8 7 4 5","hidden":true},{"in":"3 3\n1 2 3\n4 5 6\n7 8 9","out":"1 2 3 6 9 8 7 4 5","hidden":true},{"in":"3 3\n1 2 3\n4 5 6\n7 8 9","out":"1 2 3 6 9 8 7 4 5","hidden":true}],hints: ["Concept: Define boundaries (top, bottom, left, right) and peel off the matrix layer by layer.", "Algorithm: While top <= bottom and left <= right: traverse top row, right col, bottom row, left col. Update boundaries inwards after each.", "for (let i = left; i <= right; i++) result.push(matrix[top][i])"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "caesar-cipher", level: "Hard", title: "Caesar Cipher",
    desc: "Given a string S and an integer K, encrypt the string using Caesar Cipher — shift every alphabetic character forward by K positions in the alphabet. Non-alphabetic characters remain unchanged. Wrap around: 'z' shifted by 1 becomes 'a'.\n\nExample: S = 'Hello, World!', K = 3 → 'Khoor, Zruog!'\n\nConstraints:\n• 1 <= length of S <= 10^4\n• 0 <= K <= 25",
    fmt: "Print the encrypted string.",
    tests: [{"in":"Hello, World!\n3","out":"Khoor, Zruog!"},{"in":"abc\n1","out":"bcd"},{"in":"xyz\n2","out":"zab"},{"in":"Hello, World!\n3","out":"Khoor, Zruog!","hidden":true},{"in":"Hello, World!\n3","out":"Khoor, Zruog!","hidden":true},{"in":"Hello, World!\n3","out":"Khoor, Zruog!","hidden":true},{"in":"Hello, World!\n3","out":"Khoor, Zruog!","hidden":true},{"in":"Hello, World!\n3","out":"Khoor, Zruog!","hidden":true},{"in":"Hello, World!\n3","out":"Khoor, Zruog!","hidden":true},{"in":"Hello, World!\n3","out":"Khoor, Zruog!","hidden":true}],hints: ["Concept: Shift each letter's ASCII value by K, wrapping around the alphabet using modulo 26.", "Algorithm: Loop chars. If letter, shift by K. newCode = ((oldCode - base + K) % 26) + base. Reconstruct string.", "String.fromCharCode(((code - base + k) % 26) + base)"],
    nqtTag: "Repeated in NQT" },

  { track: "tcs-nqt", id: "run-length-encoding", level: "Hard", title: "Run-Length Encoding",
    desc: "Given a string S, compress it using Run-Length Encoding. Replace consecutive repeating characters with the character followed by its count. If a character appears only once, print just the character (no '1').\n\nExample: 'aaabbc' → 'a3b2c'\nExample: 'abcd' → 'abcd'\n\nConstraints:\n• 1 <= length of S <= 10^4\n• S contains only lowercase English letters.",
    fmt: "Print the compressed string.",
    tests: [{"in":"aaabbc","out":"a3b2c"},{"in":"abcd","out":"abcd"},{"in":"aaaaaa","out":"a6"},{"in":"aaabbc","out":"a3b2c","hidden":true},{"in":"aaabbc","out":"a3b2c","hidden":true},{"in":"aaabbc","out":"a3b2c","hidden":true},{"in":"aaabbc","out":"a3b2c","hidden":true},{"in":"aaabbc","out":"a3b2c","hidden":true},{"in":"aaabbc","out":"a3b2c","hidden":true},{"in":"aaabbc","out":"a3b2c","hidden":true}],hints: ["Concept: Count consecutive identical characters and append the character and its count to a result string.", "Algorithm: Initialize count = 1. Loop i from 1 to len. If S[i] == S[i-1], count++. Else append S[i-1] + (count>1?count:''), reset count=1.", "result += char + (count > 1 ? count : '')"],
    nqtTag: "Repeated in NQT" },

  { track: "tcs-nqt", id: "first-non-repeating-character", level: "Hard", title: "First Non-Repeating Character",
    desc: "Given a string S of lowercase English letters, find the first character that does not repeat anywhere in the string. Print the character and its 0-based index.\n\nIf all characters repeat, print 'None'.\n\nExample: 'aabbcde' → first non-repeating is 'c' at index 4.\n\nConstraints:\n• 1 <= length of S <= 10^5\n• S contains only lowercase English letters.",
    fmt: "Print the character and its index separated by a space. If none, print 'None'.",
    tests: [{"in":"aabbcde","out":"c 4"},{"in":"aabb","out":"None"},{"in":"stress","out":"t 1"},{"in":"aabbcde","out":"c 4","hidden":true},{"in":"aabbcde","out":"c 4","hidden":true},{"in":"aabbcde","out":"c 4","hidden":true},{"in":"aabbcde","out":"c 4","hidden":true},{"in":"aabbcde","out":"c 4","hidden":true},{"in":"aabbcde","out":"c 4","hidden":true},{"in":"aabbcde","out":"c 4","hidden":true}],hints: ["Concept: Count character frequencies in one pass, then find the first character with a frequency of exactly 1.", "Algorithm: Populate a frequency map. Iterate the string again; return the first char where map[char] == 1, along with its index.", "if (freq[s[i]] === 1) return `${s[i]} ${i}`"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "sort-0s-1s-2s", level: "Hard", title: "Sort 0s 1s 2s",
    desc: "Given an array of N integers containing only 0s, 1s, and 2s, sort the array in-place in a single pass without using any built-in sort function.\n\nThis is the Dutch National Flag problem. Use three pointers: low, mid, high.\n\nConstraints:\n• 1 <= N <= 10^5\n• Each element is 0, 1, or 2.",
    fmt: "Print the sorted array elements separated by single spaces.",
    tests: [{"in":"6\n0 2 1 2 0 1","out":"0 0 1 1 2 2"},{"in":"5\n2 0 2 1 1","out":"0 1 1 2 2"},{"in":"3\n2 1 0","out":"0 1 2"},{"in":"6\n0 2 1 2 0 1","out":"0 0 1 1 2 2","hidden":true},{"in":"6\n0 2 1 2 0 1","out":"0 0 1 1 2 2","hidden":true},{"in":"6\n0 2 1 2 0 1","out":"0 0 1 1 2 2","hidden":true},{"in":"6\n0 2 1 2 0 1","out":"0 0 1 1 2 2","hidden":true},{"in":"6\n0 2 1 2 0 1","out":"0 0 1 1 2 2","hidden":true},{"in":"6\n0 2 1 2 0 1","out":"0 0 1 1 2 2","hidden":true},{"in":"6\n0 2 1 2 0 1","out":"0 0 1 1 2 2","hidden":true}],hints: ["Concept: Use three pointers to partition the array into 0s on the left, 2s on the right, and 1s in the middle.", "Algorithm: Init low=0, mid=0, high=N-1. While mid <= high: if 0, swap(low, mid), low++, mid++. If 1, mid++. If 2, swap(mid, high), high--.", "if (arr[mid] === 0) { swap(low, mid); low++; mid++; }"],
    nqtTag: "Repeated in NQT" },

  { track: "tcs-nqt", id: "longest-common-prefix", level: "Hard", title: "Longest Common Prefix",
    desc: "Given N strings, find the longest common prefix shared among all of them. If there is no common prefix, print an empty line.\n\nInput: First line is N, followed by N strings one per line.\n\nExample: ['flower', 'flow', 'flight'] → 'fl'\n\nConstraints:\n• 1 <= N <= 200\n• 1 <= length of each string <= 200",
    fmt: "Print the longest common prefix. If none, print an empty line.",
    tests: [{"in":"3\nflower\nflow\nflight","out":"fl"},{"in":"3\ndog\ncar\nrace","out":""},{"in":"2\ninterspecies\ninterstellar","out":"inters"},{"in":"3\nflower\nflow\nflight","out":"fl","hidden":true},{"in":"3\nflower\nflow\nflight","out":"fl","hidden":true},{"in":"3\nflower\nflow\nflight","out":"fl","hidden":true},{"in":"3\nflower\nflow\nflight","out":"fl","hidden":true},{"in":"3\nflower\nflow\nflight","out":"fl","hidden":true},{"in":"3\nflower\nflow\nflight","out":"fl","hidden":true},{"in":"3\nflower\nflow\nflight","out":"fl","hidden":true}],hints: ["Concept: Find the common prefix of the lexicographically smallest and largest strings in the array.", "Algorithm: Sort the array of strings. Compare characters of the first and last string one by one. Stop when they differ.", "if (first[i] !== last[i]) break"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "subarray-with-given-sum", level: "Hard", title: "Subarray with Given Sum",
    desc: "Given an array of N non-negative integers and a target sum S, find a contiguous subarray that adds up to S. Print the 1-based start and end indices of the subarray.\n\nIf no such subarray exists, print -1.\nIf multiple subarrays exist, print the first one found (leftmost start).\n\nUse the sliding window technique for O(N) time.\n\nConstraints:\n• 1 <= N <= 10^5\n• 0 <= elements <= 10^4\n• 0 <= S <= 10^9",
    fmt: "Print two space-separated 1-based indices (start end). Print -1 if not found.",
    tests: [{"in":"5\n1 2 3 7 5\n12","out":"2 4"},{"in":"4\n1 4 0 0\n3","out":"1 2"},{"in":"3\n1 2 3\n10","out":"-1"},{"in":"5\n1 2 3 7 5\n12","out":"2 4","hidden":true},{"in":"5\n1 2 3 7 5\n12","out":"2 4","hidden":true},{"in":"5\n1 2 3 7 5\n12","out":"2 4","hidden":true},{"in":"5\n1 2 3 7 5\n12","out":"2 4","hidden":true},{"in":"5\n1 2 3 7 5\n12","out":"2 4","hidden":true},{"in":"5\n1 2 3 7 5\n12","out":"2 4","hidden":true},{"in":"5\n1 2 3 7 5\n12","out":"2 4","hidden":true}],hints: ["Concept: Expand a sliding window to increase the sum, and shrink it from the left to decrease the sum.", "Algorithm: Init left=0, sum=0. Loop right. sum += arr[right]. While sum > S, sum -= arr[left], left++. If sum == S, return [left+1, right+1].", "while (sum > target) sum -= arr[left++]"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "stack-using-queues", level: "Hard", title: "Stack Using Queues",
    desc: "Simulate a stack using two queues. Implement push and pop operations.\n\nInput: First line is N (number of operations). Each of the next N lines is either:\n• 'push X' — push integer X onto the stack\n• 'pop' — pop and print the top element. If the stack is empty, print 'Empty'.\n\nConstraints:\n• 1 <= N <= 1000\n• 1 <= X <= 10^4",
    fmt: "For each 'pop' operation, print the popped value or 'Empty', one per line.",
    tests: [{"in":"4\npush 1\npush 2\npop\npop","out":"2\n1"},{"in":"3\npush 5\npop\npop","out":"5\nEmpty"},{"in":"5\npush 3\npush 4\npush 5\npop\npop","out":"5\n4"},{"in":"4\npush 1\npush 2\npop\npop","out":"2\n1","hidden":true},{"in":"4\npush 1\npush 2\npop\npop","out":"2\n1","hidden":true},{"in":"4\npush 1\npush 2\npop\npop","out":"2\n1","hidden":true},{"in":"4\npush 1\npush 2\npop\npop","out":"2\n1","hidden":true},{"in":"4\npush 1\npush 2\npop\npop","out":"2\n1","hidden":true},{"in":"4\npush 1\npush 2\npop\npop","out":"2\n1","hidden":true},{"in":"4\npush 1\npush 2\npop\npop","out":"2\n1","hidden":true}],hints: ["Concept: Use one queue to accept new elements, then immediately cycle all previous elements behind the new one.", "Algorithm: Push new element to Q. Then, for (length - 1) times, dequeue an element and push it back into Q.", "for(let i=0; i<size-1; i++) q.push(q.shift())"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "word-frequency-count", level: "Hard", title: "Word Frequency Count",
    desc: "Given a paragraph of text, count the frequency of each word (case-insensitive). Print all words and their counts in descending order of frequency. If two words have the same frequency, sort them alphabetically.\n\nIgnore punctuation (.,!?;:) when identifying words.\n\nConstraints:\n• 1 <= length of input <= 10^4",
    fmt: "Print each word and its count separated by a colon, one per line, sorted by frequency desc then alphabetically.",
    tests: [{"in":"the cat sat on the mat the cat","out":"the:3\ncat:2\nmat:1\non:1\nsat:1"},{"in":"hello world hello","out":"hello:2\nworld:1"},{"in":"a b a b c","out":"a:2\nb:2\nc:1"},{"in":"the cat sat on the mat the cat","out":"the:3\ncat:2\nmat:1\non:1\nsat:1","hidden":true},{"in":"the cat sat on the mat the cat","out":"the:3\ncat:2\nmat:1\non:1\nsat:1","hidden":true},{"in":"the cat sat on the mat the cat","out":"the:3\ncat:2\nmat:1\non:1\nsat:1","hidden":true},{"in":"the cat sat on the mat the cat","out":"the:3\ncat:2\nmat:1\non:1\nsat:1","hidden":true},{"in":"the cat sat on the mat the cat","out":"the:3\ncat:2\nmat:1\non:1\nsat:1","hidden":true},{"in":"the cat sat on the mat the cat","out":"the:3\ncat:2\nmat:1\non:1\nsat:1","hidden":true},{"in":"the cat sat on the mat the cat","out":"the:3\ncat:2\nmat:1\non:1\nsat:1","hidden":true}],hints: ["Concept: Extract all words, count them using a map, and sort by frequency descending, then alphabetically.", "Algorithm: Match words with regex. Update map counts. Convert to array. Sort by count DESC, then word localeCompare ASC.", "entries.sort((a, b) => b.count - a.count || a.word.localeCompare(b.word))"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "next-greater-element", level: "Hard", title: "Next Greater Element",
    desc: "Given an array of N integers, for each element find the next greater element to its right. If no greater element exists for an element, output -1 for that position.\n\nExample: [4, 5, 2, 10, 8] → [5, 10, 10, -1, -1]\n\nUse a stack-based O(N) approach.\n\nConstraints:\n• 1 <= N <= 10^5\n• -10^9 <= elements <= 10^9",
    fmt: "Print N space-separated integers representing the next greater element for each position.",
    tests: [{"in":"5\n4 5 2 10 8","out":"5 10 10 -1 -1"},{"in":"4\n3 2 1 4","out":"4 4 4 -1"},{"in":"3\n1 1 1","out":"-1 -1 -1"},{"in":"5\n4 5 2 10 8","out":"5 10 10 -1 -1","hidden":true},{"in":"5\n4 5 2 10 8","out":"5 10 10 -1 -1","hidden":true},{"in":"5\n4 5 2 10 8","out":"5 10 10 -1 -1","hidden":true},{"in":"5\n4 5 2 10 8","out":"5 10 10 -1 -1","hidden":true},{"in":"5\n4 5 2 10 8","out":"5 10 10 -1 -1","hidden":true},{"in":"5\n4 5 2 10 8","out":"5 10 10 -1 -1","hidden":true},{"in":"5\n4 5 2 10 8","out":"5 10 10 -1 -1","hidden":true}],hints: ["Concept: Use a monotonic stack to keep track of elements that haven't found a greater element yet.", "Algorithm: Iterate from right to left. While stack top <= current, pop stack. If stack not empty, it's the answer. Push current.", "while(stack.length && stack.at(-1) <= curr) stack.pop()"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "decode-the-string", level: "Hard", title: "Decode the String",
    desc: "Given an encoded string in the format k[encoded_string], decode it by repeating the encoded_string exactly k times. You may assume the input is always valid and there are no extra white spaces. Encodings can be nested.\n\nExample: '3[a]2[bc]' → 'aaabcbc'\nExample: '2[ab3[c]]' → 'abcccabccc'\n\nConstraints:\n• 1 <= length of input <= 30\n• k is a positive integer\n• encoded_string contains only lowercase letters",
    fmt: "Print the decoded string.",
    tests: [{"in":"3[a]2[bc]","out":"aaabcbc"},{"in":"2[ab3[c]]","out":"abcccabccc"},{"in":"3[a2[b]]","out":"abbabbabb"}],hints: ["Concept: Use a stack to track string and multiplier context whenever nested brackets open and close.", "Algorithm: If digit, build multiplier. If '[', push multiplier and current string to stack. If ']', pop and multiply, append to popped string.", "currentStr = prevStr + currentStr.repeat(num)"],
    nqtTag: "Frequently Asked" },

  { track: "tcs-nqt", id: "12-to-24-hour-format", level: "Easy", title: "12 to 24 Hour Format",
    desc: "Given a time in 12-hour AM/PM format, convert it to military (24-hour) time.\n\nNote: 12:00:00AM on a 12-hour clock is 00:00:00 on a 24-hour clock. 12:00:00PM on a 12-hour clock is 12:00:00 on a 24-hour clock.\n\nInput Format:\nA single string containing the time (e.g. 07:05:45PM).\n\nOutput Format:\nThe time in 24-hour format.",
    fmt: "Print the correct output format as specified.",
    tests: [{"in":"07:05:45PM","out":"19:05:45"},{"in":"12:40:22AM","out":"00:40:22"},{"in":"12:45:54PM","out":"12:45:54"},{"in":"04:59:59AM","out":"04:59:59"}],
    hints: ["Concept: String parsing to extract hours, minutes, seconds, and the AM/PM modifier.", "Algorithm: Extract the first two characters as hours and check the last two characters for AM/PM. If PM and hour != 12, add 12. If AM and hour == 12, set hour to 00. Format and print the result.", "print(f'{hour:02d}:{minutes}:{seconds}')"],
    nqtTag: "Recently Asked" },

  { track: "tcs-nqt", id: "nth-best-selling-product", level: "Medium", title: "Nth Best Selling Product",
    desc: "Given a list of product IDs and an integer N, find the Nth best-selling product (the product with the Nth highest frequency). If frequencies are tied, the smaller product ID is considered to have higher rank.\n\nInput Format:\nFirst line: N\nSecond line: Space-separated product IDs.",
    fmt: "Print the correct output format as specified.",
    tests: [{"in":"2\n1 2 2 3 3 3","out":"2"},{"in":"1\n4 4 4 2 2","out":"4"},{"in":"3\n10 10 20 20 30 30","out":"30"}],
    hints: ["Concept: Frequency counting and sorting (or using a priority queue/min-heap).", "Algorithm: Count occurrences using a dictionary. Create a list of tuples `(-frequency, product_id)`. Sort this list or use `heapq.nsmallest`. The N-th element in the sorted list is the answer.", "sorted_items = sorted([(-freq, pid) for pid, freq in counts.items()])"],
    nqtTag: "Recently Asked" },

  { track: "tcs-nqt", id: "rank-transform-of-array", level: "Medium", title: "Rank Transform of Array",
    desc: "Given an array of integers, replace each element with its rank. The rank starts at 1 and represents how large the element is compared to others. If two elements are equal, their rank must be the same.\n\nInput Format:\nA single line of space-separated integers.\n\nOutput Format:\nSpace-separated ranks.",
    fmt: "Print the correct output format as specified.",
    tests: [{"in":"40 10 20 30","out":"4 1 2 3"},{"in":"100 100 100","out":"1 1 1"},{"in":"37 12 28 9 100 56 80 5 12","out":"5 3 4 2 8 6 7 1 3"}],
    hints: ["Concept: Hash maps and sorting for rank assignment.", "Algorithm: Create a copy of the array, remove duplicates (using a set), and sort it. Iterate through the sorted unique values and assign a rank (starting from 1) to each in a dictionary. Finally, map the original array values to their ranks.", "ranks = {val: i + 1 for i, val in enumerate(sorted(set(arr)))}"],
    nqtTag: "Recently Asked" },

  { track: "tcs-nqt", id: "largest-of-two-numbers", level: "Easy", title: "Largest of Two Numbers",
    desc: "Given two numbers separated by a space, find the largest without using built-in max functions.\n\nInput Format:\nTwo space-separated integers.\n\nOutput Format:\nThe largest integer.",
    fmt: "Print the correct output format as specified.",
    tests: [{"in":"45 92","out":"92"},{"in":"-5 -2","out":"-2"},{"in":"100 100","out":"100"}],
    hints: ["Concept: Basic conditional statements.", "Algorithm: Read two integers. Use an if-else statement to check if the first is greater than the second. Print the result.", "print(a if a > b else b)"],
    nqtTag: "Recently Asked" },

  { track: "tcs-nqt", id: "postfix-evaluation", level: "Medium", title: "Postfix Evaluation",
    desc: "Evaluate a postfix expression using a stack. The expression contains integers and the operators +, -, *, and /.\n\nInput Format:\nA single line of space-separated tokens.\n\nOutput Format:\nThe integer result of the evaluation. (Use integer division).\n\nConstraints:\n• Intermediate results fit within a 32-bit integer.",
    fmt: "Print the correct output format as specified.",
    tests: [{"in":"2 3 1 * + 9 -","out":"-4"},{"in":"100 200 + 2 / 5 * 7 +","out":"757"},{"in":"10 2 8 * + 3 -","out":"23"}],
    hints: ["Concept: Stack data structure for expression evaluation.", "Algorithm: Iterate through the tokens. If the token is a number, push it onto the stack. If it's an operator, pop the top two numbers, apply the operator (remembering order: `second_popped op first_popped`), and push the result. The final result is the only item left in the stack.", "stack.append(eval(f'{a} {token} {b}'))"],
    nqtTag: "Recently Asked" }
];
