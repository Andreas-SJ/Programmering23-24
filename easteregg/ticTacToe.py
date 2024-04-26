# Tic Tac Toe game with Minimax algorithm

EMPTY = 0
PLAYER_X = 1
PLAYER_O = 2

# Represents a Tic Tac Toe board
class Board:
    def __init__(self):
        self.cells = [[EMPTY, EMPTY, EMPTY],
                      [EMPTY, EMPTY, EMPTY],
                      [EMPTY, EMPTY, EMPTY]]

    # Print the board
    def display(self):
        for row in self.cells:
            print(" | ".join(map(self._symbol, row)))
            print("-" * 5)

    # Convert cell value to symbol
    def _symbol(self, cell):
        symbols = [' ', 'X', 'O']
        return symbols[cell]

    # Check if the board is full
    def is_full(self):
        return all(cell != EMPTY for row in self.cells for cell in row)

    # Check if a player has won
    def is_winner(self, player):
        for row in self.cells:
            if all(cell == player for cell in row):
                return True
        for col in range(3):
            if all(self.cells[row][col] == player for row in range(3)):
                return True
        if all(self.cells[i][i] == player for i in range(3)):
            return True
        if all(self.cells[i][2 - i] == player for i in range(3)):
            return True
        return False

    # Get available moves
    def available_moves(self):
        moves = []
        for i in range(3):
            for j in range(3):
                if self.cells[i][j] == EMPTY:
                    moves.append((i, j))
        return moves

    # Make a move
    def make_move(self, move, player):
        self.cells[move[0]][move[1]] = player


# Minimax algorithm with alpha-beta pruning
def minimax(board, depth, maximizing_player, alpha, beta):
    if board.is_winner(PLAYER_X):
        return -10 + depth, None
    elif board.is_winner(PLAYER_O):
        return 10 - depth, None
    elif board.is_full():
        return 0, None

    if maximizing_player:
        max_eval = float('-inf')
        best_move = None
        for move in board.available_moves():
            board.make_move(move, PLAYER_O)
            eval, _ = minimax(board, depth + 1, False, alpha, beta)
            board.make_move(move, EMPTY)
            if eval > max_eval:
                max_eval = eval
                best_move = move
            alpha = max(alpha, eval)
            if beta <= alpha:
                break
        return max_eval, best_move
    else:
        min_eval = float('inf')
        best_move = None
        for move in board.available_moves():
            board.make_move(move, PLAYER_X)
            eval, _ = minimax(board, depth + 1, True, alpha, beta)
            board.make_move(move, EMPTY)
            if eval < min_eval:
                min_eval = eval
                best_move = move
            beta = min(beta, eval)
            if beta <= alpha:
                break
        return min_eval, best_move


# Main function to play the game
def main():
    board = Board()
    current_player = PLAYER_X

    while True:
        board.display()

        if current_player == PLAYER_X:
            print("Din tur:")
            row = int(input("Enter row (0, 1, 2): "))
            col = int(input("Enter column (0, 1, 2): "))
            move = (row, col)
            if move not in board.available_moves():
                print("Haha, nice try; d trekket går nok ikke")
                continue
        else:
            print("Dataen sin tur:")
            _, move = minimax(board, 0, True, float('-inf'), float('inf'))

        board.make_move(move, current_player)

        if board.is_winner(current_player):
            board.display()
            if current_player == PLAYER_X:
                print("Gratullerer, du vant!")
            else:
                print("Satan du sug, du tapt mot nåkka som ikke en gang lev")
            break
        elif board.is_full():
            board.display()
            print("Da vart d no uavgjort da..")
            break

        current_player = PLAYER_X if current_player == PLAYER_O else PLAYER_O


if __name__ == "__main__":
    main()
