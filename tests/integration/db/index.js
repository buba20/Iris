var expect = require('chai').expect;
var db = require('../../../db')();
describe("Database", function () {
    var boardName = 'TestBoard';
    it('should create test document', function (done) {

        var b = new db.models.Board({
            title: boardName,
            regions: [new db.models.Region({
                title: 'Test region',
                notes: [new db.models.Note({content: 'test note'})]
            })]
        });


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
        })
    })
});