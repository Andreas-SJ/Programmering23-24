// Constants
const EMPTY = 0;
const PLAYER_X = 1;
const PLAYER_O = 2;

// Represents a Tic Tac Toe board
class Board {
    constructor() {
        this.cells = [
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY]
        ];
    }

    // Print the board
    display() {
        const boardElement = document.getElementById("board");
        boardElement.innerHTML = "";
        this.cells.forEach((row, i) => {
            row.forEach((cell, j) => {
                const cellElement = document.createElement("div");
                cellElement.classList.add("cell");
                cellElement.textContent = cell === PLAYER_X ? "X" : cell === PLAYER_O ? "O" : "";
                cellElement.addEventListener("click", () => this.makeMove(i, j));
                boardElement.appendChild(cellElement);
            });
        });
    }

    // Make a move
    makeMove(row, col) {
        if (this.cells[row][col] === EMPTY) {
            this.cells[row][col] = PLAYER_X;
            this.display();
            if (this.isWinner(PLAYER_X)) {
                alert("Gratullerer, du vant!");
                this.reset();
            } else if (this.isFull()) {
                alert("Da vart d no uavgjort da..");
                this.reset();
            } else {
                this.makeComputerMove();
            }
        }
    }

    // Make a move for the computer
    makeComputerMove() {
        const bestMove = this.minimax(0, true);
        this.cells[bestMove.row][bestMove.col] = PLAYER_O;
        this.display();
        if (this.isWinner(PLAYER_O)) {
            alert("Satan du sug, du tapt mot nåkka som ikke en gang lev");
            this.reset();
        } else if (this.isFull()) {
            alert("Da vart d no uavgjort da..");
            this.reset();
        }
    }

    // Minimax algorithm with alpha-beta pruning
    minimax(depth, maximizingPlayer) {
        if (this.isWinner(PLAYER_X)) {
            return { score: -10 + depth };
        } else if (this.isWinner(PLAYER_O)) {
            return { score: 10 - depth };
        } else if (this.isFull()) {
            return { score: 0 };
        }

        const moves = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.cells[i][j] === EMPTY) {
                    this.cells[i][j] = maximizingPlayer ? PLAYER_O : PLAYER_X;
                    const move = { row: i, col: j };
                    move.score = this.minimax(depth + 1, !maximizingPlayer).score;
                    this.cells[i][j] = EMPTY;
                    moves.push(move);
                }
            }
        }

        if (maximizingPlayer) {
            const bestMove = moves.reduce((acc, curr) => (curr.score > acc.score ? curr : acc), { score: Number.NEGATIVE_INFINITY });
            return bestMove;
        } else {
            const bestMove = moves.reduce((acc, curr) => (curr.score < acc.score ? curr : acc), { score: Number.POSITIVE_INFINITY });
            return bestMove;
        }
    }

    // Check if a player has won
    isWinner(player) {
        for (let i = 0; i < 3; i++) {
            if (this.cells[i][0] === player && this.cells[i][1] === player && this.cells[i][2] === player) {
                return true;
            }
            if (this.cells[0][i] === player && this.cells[1][i] === player && this.cells[2][i] === player) {
                return true;
            }
        }
        if (this.cells[0][0] === player && this.cells[1][1] === player && this.cells[2][2] === player) {
            return true;
        }
        if (this.cells[0][2] === player && this.cells[1][1] === player && this.cells[2][0] === player) {
            return true;
        }
        return false;
    }

    // Check if the board is full
    isFull() {
        return this.cells.every(row => row.every(cell => cell !== EMPTY));
    }

    // Reset the board
    reset() {
        this.cells = [
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY]
        ];
        this.display();
    }
}

// Initialize the game
const board = new Board();

// Display the initial board
board.display();