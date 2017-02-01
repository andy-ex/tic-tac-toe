class TicTacToe {

    constructor() {
        this.currentPlayer = 'x';
        this.board = new Array(3);
        for (var i = 0; i < 3; ++i)
            this.board[i] = new Array(3).fill(null);
    }

    getCurrentPlayerSymbol() {
        return this.currentPlayer;
    }

    nextTurn(rowIndex, columnIndex) {
        if (!this.isFinished() && !this.board[rowIndex][columnIndex]) {
            this.board[rowIndex][columnIndex] = this.currentPlayer;
            this.currentPlayer = this.currentPlayer == 'x' ? 'o' : 'x';
        }
    }

    isFinished() {
        return this.isDraw() || this.getWinner() != null;
    }

    getWinner() {
        var winner = null; 
        var board = this.board;
        for (var i = 0; i < 3; ++i) {
            winner = winner || this.getValueIfAllEqual(board[i], board[i][0]);
            winner = winner || this.getValueIfAllEqual(board.map(row => row[i]), board[0][i]);         
        }

        winner = winner || this.getValueIfAllEqual(board.map((row, i) => row[i]), board[0][0]);
        winner = winner || this.getValueIfAllEqual(board.map((row, i) => row[row.length - i - 1]), board[0][board[0].length - 1]);

        return winner;
    }

    getValueIfAllEqual(array, value) {
        return array.every(v => v == value) ? value : null;
    }

    noMoreTurns() {
        for (var i in this.board)
            if (this.board[i].indexOf(null) > -1)
                return false;
        return true;
    }

    isDraw() {
        return this.noMoreTurns() && this.getWinner() == null;
    }

    getFieldValue(rowIndex, colIndex) {
        return this.board[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;
