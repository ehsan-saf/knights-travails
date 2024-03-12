const moves = [
  [1, 2],
  [2, 1],
  [-1, 2],
  [1, -2],
  [-2, 1],
  [2, -1],
  [-1, -2],
  [-2, -1],
];

const xMoves = [1, 2, -1, 1, -2, 2, -1, -2];
const yMoves = [2, 1, 2, -2, 1, -1, -2, -1];

export default class board {
  constructor() {
    this.list = {};
  }

  addPath(x, y) {
    if (!this.list[x]) {
      this.list[x] = [];
    }
    if (!this.list[y]) {
      this.list[y] = [];
    }
    this.list[x].push(y);
    this.list[y].push(x);
  }

  knightMoves(start, end) {
    let s = this.solve(start, end);
  }

  solve(start, end) {
    let visited = new Set();
    let q = [];
    const pre = new Array(8).fill(null).map(() => new Array(null).fill(0));
    q.push(start);
    visited.add(start);
    while (q.length > 0) {
      let node = q.shift();
      if (node[0] === end[0] && node[1] === end[1]) {
        break;
      }
      let possibleMoves = this.getMoves(node);
      for (const move of possibleMoves) {
        let formatedMove = `${move[0]}${move[1]}`;
        if (!visited.has(formatedMove)) {
          q.push(move);
          visited.add(formatedMove);
          pre[move[0]][move[1]] = node;
        }
      }
    }
    console.log();
    console.log("------------------");
    this.reconstructPath(start, end, pre);
  }

  getMoves(node) {
    let moves = [];
    for (let i = 0; i <= 7; i++) {
      let path = [node[0] + xMoves[i], node[1] + yMoves[i]];
      if (path[0] >= 0 && path[0] <= 7 && path[1] >= 0 && path[1] <= 7) {
        moves.push(path);
      }
    }
    return moves;
  }

  reconstructPath(start, end, parent) {
    // Create an empty list to store the path coordinates
    const path = [];

    // Start backtracking from the end node
    let currentRow = end[0];
    let currentCol = end[1];

    // Backtrack until we reach the starting node
    while (currentRow !== start[0] || currentCol !== start[1]) {
      // Add current node to the path
      path.push([currentRow, currentCol]);

      // Move to the parent node
      const [parentRow, parentCol] = parent[currentRow][currentCol];
      currentRow = parentRow;
      currentCol = parentCol;
    }

    // Add the starting node to the path
    path.push([currentRow, currentCol]);

    // Reverse the path for correct order
    path.reverse();

    path.forEach((p) => console.log(p));
  }
}

let b = new board();

b.knightMoves([0, 0], [7, 7]);
