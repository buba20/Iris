var boards = [
    {
        id: 1,
        name: "Board 1"
    },
    {
        id: 2,
        name: "Board 2"
    }
];

var boardController = function() {
    this.getAllBoards = function() {
        return boards;
    };
    this.getBoardById = function(id) {
        return boards.filter(function(board) { return board.id === id; });
    };

    return this;
};

module.exports = boardController();