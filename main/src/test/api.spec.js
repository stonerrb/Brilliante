const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server').app

chai.use(chaiHttp)
const expect = chai.expect;

describe('Brillante Jewels API', () => {  // all test cases for API
  
  describe('GET /gold-price', () => {
    it('should retrieve the gold price', (done) => {
        chai
            .request(app)
            .get('/gold-price')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('gold_price');
                const goldPrice = res.body.gold_price;
                expect(goldPrice).to.be.a('number');
                expect(goldPrice).to.be.gte(100);
                expect(goldPrice).to.be.lte(1000); 
                done();
            });
        })
  }),

  describe('POST /golditem', () => {
    it('should add gold item', (done) => {
      const item = {
        name : "Test1",
        grams: 100
      }
      chai
        .request(app)
        .post('/gold-item')
        .send(item)
        .end((err,res) => {
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('grams')
          done()
        })
    })
  }),

  describe('PUT /updategolditem',() => {
    it('should update the item',(done) => {
      chai
        .request(app)
        .put('/update-price/64db2cde9914b21023640465')
        .end((err,res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('grams')
          done()
        })
    })
  }),

  describe('GET /gold-prices', () => {
    it('should return curr and best gold prices', (done) => {
        chai
            .request(app)
            .get('/gold-prices?itemId=64da50e6f874a4410e184614')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.have.property('currentPrice');
                expect(res.body[0]).to.have.property('bestPriceWithinTimeRange');
                done();
            });
    });
});
})