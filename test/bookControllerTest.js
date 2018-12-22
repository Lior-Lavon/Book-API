const should = require('should');
const sinon = require('sinon');

describe('Book controller test:', () => {
  describe('Post', () => {
    it('should not allow an empty title on post', () => {
      var Book = (Book) => { this.save = () = {} }
      var req = {
        body: {
          author: 'Lior'
        }
      }
      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      }

      var bookController = require('../books/controller')(Book);
      
      bookController.post(req, res);

      res.status.calledWith(400).should.equal(true, 'Bed status' + res.status.args[0][0]);
      res.send.calledWith('Title is requiered').should.equal(true);
    })
  })
});

