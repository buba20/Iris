var expect = require('chai').expect;

describe("Database", function () {

    it('should open connection to database ', function () {
        var db = require('../../../db');
        //db.closeConnection();
    });

    it('should create test document', function (done) {
        var db = require('../../../db');
        var b = new db.models.Board({title: 'asda'});
        b.save(function (err, obj) {
            if (err) {
                console.log(err);
            }
            console.log(obj);
            done();

        });
    })
});