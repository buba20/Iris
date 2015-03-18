var boards = [
    {
        _id: "111111111111",
        name: "Board 1"
    },
    {
        _id: "222222222222222222222222",
        name: "Board 2"
    }
];

var boardController = function() {
    this.getAllBoards = function() {
        return boards;
    };
    this.getBoardById = function(id) {
        return boards.filter(function(board) { return board._id === id; });
    };

    return this;
};

module.exports = boardController();