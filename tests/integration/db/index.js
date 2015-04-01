var expect = require("chai").expect;
var db = require('../../../db');
describe("Database", function () {
    it('should create test document', function (done) {
        var b = new db.models.Board({title: 'asda'});
        b.save(function (err, obj) {
            if (err) {
                console.log(err);
            }
            console.log(obj);
            done();
        });
    });

    it('should delete test document', function (done) {
        db.models.Board.find({title: boardName}).remove(function (err) {
            console.log(err);
            done();
        });
    });
});