const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;

const chaiHttp = require('chai-http');
// https://medium.com/desenvolvimento-com-node-js/testes-de-integra%C3%A7%C3%A3o-para-aplica%C3%A7%C3%B5es-node-js-com-mocha-e-chai-610a1ba15e1b

const Importer = require('mysql-import');
require('dotenv').config();

const models = require('../../models');
const { connection, productModel, salesModel } = models;

chai.use(chaiHttp);


// TESTING PRODUCTS

describe('Testing products and sales table', () => {
  const product = {
    name: 'Iphone 11 pro',
    quantity: 1,
  };
  const url = `http://localhost:${process.env.PORT}`;

  beforeEach(async () => {
    const insertId = [{ insertId: 1 }];

    sinon.stub(connection, 'query').resolves(insertId);
  });

  afterEach(async () => connection.query.restore());

  describe('Testing quantity parameter', () => {
    it('has name but it has not quantity parameter -> quantity is null', () => {
      chai
        .request(url)
        .post('/products')
        .send({ name: 'Iphone 11 pro' })
        .then((res) => {
          expect(res.body).to.not.be.empty;
          expect(res).to.have.status(400);
          expect(res.body).to.have.a.property('error');
        })
        .catch((err) => {
          expect(err).to.not.be.null;
        });
    });

    it('has name and a string quantity as parameter', () => {
      chai
        .request(url)
        .post('/products')
        .send({ name: 'Iphone 11 pro', quantity: '1' })
        .then((res) => {
          expect(res.body).to.not.be.empty;
          expect(res).to.have.status(422);
          expect(res.body).to.have.a.property('error');
        })
        .catch((err) => {
          expect(err).to.not.be.null;
        });
    });

    it('has name and quantity is a number equal or less than 0', () => {
      chai
        .request(url)
        .post('/products')
        .send({ name: 'Iphone 11 pro', quantity: 0 })
        .then((res) => {
          expect(res.body).to.not.be.empty;
          expect(res).to.have.status(422);
          expect(res.body).to.have.a.property('error');
        })
        .catch((err) => {
          expect(err).to.not.be.null;
        });
    });
  });

  describe('When a product is successfully created (name and quantity are right)', () => {
    it('returns id, name and quantity as a response', async () => {
      const response = await productModel.add(product.name, product.quantity);
      expect(response).to.not.be.null;
      chai
        .request(url)
        .post('/products')
        .send(product)
        .then((res) => {
          expect(res.body).to.not.be.empty;
          expect(res).to.have.status(201);
          expect(res.body).to.not.have.a.property('error');
          expect(res.body).to.have.a.property('id');
          expect(res.body).to.have.a.property('name');
          expect(res.body).to.have.a.property('quantity');
          expect(res.body).to.be.an('object');
        })
        .catch((err) => {
          expect(err).to.be.null;
        });
    });
  });

  describe('tests the method GET -> route /products', () => {
    it('returns all products', async () => {
      const response = await productModel.getAll();
      expect(response).to.not.be.null;
      chai
        .request(url)
        .get('/products')
        .then((res) => {
          expect(res.body).to.not.be.empty;
          expect(res).to.have.status(200);
          expect(res.body).to.not.have.a.property('error');
          expect(res.body).to.be.an('array');
        })
        .catch((err) => {
          expect(err).to.be.null;
        });
    });
    
    it('tests the method GET -> route /products/:id', async () => {
      let response;

      chai
        .request(url)
        .post('/products')
        .send(product)
        .then((res) => {
          expect(res.body).to.not.be.empty;
          expect(res).to.have.status(201);
          expect(res.body).to.not.have.a.property('error');
          expect(res.body).to.have.a.property('id');
          expect(res.body).to.have.a.property('name');
          expect(res.body).to.have.a.property('quantity');
          expect(res.body).to.be.an('object');
        })
        .catch((err) => {
          expect(err).to.be.null;
        });

      response = await productModel.getById(1);

      chai
        .request(url)
        .get('/products/1')
        .then((res) => {
          expect(res.body).to.not.be.empty;
          expect(res).to.have.status(200);
          expect(res).to.be.equal(response);
          expect(res.body).to.have.a.property('id').equal(1);
          expect(res.body).to.not.have.a.property('error');
          expect(res.body).to.be.an('array');
        })
        .catch((err) => {
          expect(err).to.be.null;
        });
    });
  });

  describe('tests the method PUT -> route /products', () => {
    it('When a product is successfully updated', async () => {
      let response;

      chai
        .request(url)
        .post('/products')
        .send(product)
        .then((res) => {
          expect(res.body).to.not.be.empty;
          expect(res).to.have.status(201);
          expect(res.body).to.not.have.a.property('error');
          expect(res.body).to.have.a.property('id');
          expect(res.body).to.have.a.property('name');
          expect(res.body).to.have.a.property('quantity');
          expect(res.body).to.be.an('object');
        })
        .catch((err) => {
          expect(err).to.be.null;
        });

      response = await productModel.update(1);

      chai
        .request(url)
        .put('/products/1')
        .send({ id: 1, name: 'Iphone 11 pro', quantity: 3 })
        .then((res) => {
          expect(res.body).to.not.be.empty;
          expect(res).to.have.status(200);
          expect(res).to.be.equal(response);
          expect(res.body).to.have.a.property('id').equal(1);
          expect(res.body).to.not.have.a.property('error');
          expect(res.body).to.be.an('array');
        })
        .catch((err) => {
          expect(err).to.be.null;
        });
    });

    it('When a product is successfully removed', async () => {
      let result;

      chai
        .request(url)
        .post('/products')
        .send(product)
        .then((res) => {
          expect(res.body).to.not.be.empty;
          expect(res).to.have.status(201);
          expect(res.body).to.not.have.a.property('error');
          expect(res.body).to.have.a.property('id');
          expect(res.body).to.have.a.property('name');
          expect(res.body).to.have.a.property('quantity');
          expect(res.body).to.be.an('object');
        })
        .catch((err) => {
          expect(err).to.be.null;
        });

      result = await productModel.remove(1);

      chai
        .request(url)
        .delete('/products/1')
        .then((res) => {
          expect(res.body).to.not.be.empty;
          expect(res).to.have.status(200);
          expect(res).to.be.equal(response);
          expect(res.body).to.have.a.property('id').equal(1);
          expect(res.body).to.not.have.a.property('error');
          expect(res.body).to.be.an('array');
        })
        .catch((err) => {
          expect(err).to.be.null;
        });
    });
  });

  const sale = [
    {
      product_id: 1,
      quantity: 2,
    },
  ];

  // TESTING SALES

  describe('Testing add function from salesModel', async () => {
    const response = await salesModel.add(sale);
    expect(response).to.not.be.null;
    chai
      .request(url)
      .post('/sales')
      .send(sale)
      .then((res) => {
        expect(res.body).to.not.be.empty;
        expect(res).to.have.status(201);
        expect(res.body).to.not.have.a.property('error');
        expect(res.body).to.be.an('object');
      })
      .catch((err) => {
        expect(err).to.be.null;
      });
  });

  describe('Testing getAll function from salesModel', async () => {
    const response = await salesModel.getAll();
    expect(response).to.not.be.null;
    chai
      .request(url)
      .get('/sales')
      .then((res) => {
        expect(res.body).to.not.be.empty;
        expect(res).to.have.status(200);
        expect(res.body).to.not.have.a.property('error');
        expect(res.body).to.be.an('array');
      })
      .catch((err) => {
        expect(err).to.be.null;
      });
  });

  describe('Testing getById function from salesModel', async () => {
    let response;

    chai
      .request(url)
      .post('/sales')
      .send(sale)
      .then((res) => {
        expect(res.body).to.not.be.empty;
        expect(res).to.have.status(201);
        expect(res.body).to.not.have.a.property('error');
        expect(res.body).to.be.an('object');
      })
      .catch((err) => {
        expect(err).to.be.null;
      });

    response = await salesModel.getById(1);

    chai
      .request(url)
      .get('/sales/1')
      .then((res) => {
        expect(res.body).to.not.be.empty;
        expect(res).to.have.status(200);
        expect(res.body).to.not.have.a.property('error');
        expect(res.body).to.be.an('object');
        expect(res).to.be.equal(response);
      })
      .catch((err) => {
        expect(err).to.be.null;
      });
  });

  describe('Testing update function from salesModel', async () => {
    let response;
    chai
      .request(url)
      .post('/sales')
      .send(sale)
      .then((res) => {
        expect(res.body).to.not.be.empty;
        expect(res).to.have.status(201);
        expect(res.body).to.not.have.a.property('error');
        expect(res.body).to.be.an('object');
      })
      .catch((err) => {
        expect(err).to.be.null;
      });

      response = await salesModel.update(1);

      chai
      .request(url)
      .put('/sales/1')
      .send({ id: 1, quantity: 3 })
      .then((res) => {
        expect(res.body).to.not.be.empty;
        expect(res).to.have.status(200);
        expect(res.body).to.not.have.a.property('error');
        expect(res.body).to.be.an('object');
        expect(res).to.be.equal(response);
      })
      .catch((err) => {
        expect(err).to.be.null;
      });
  });

  describe('Testing remove function from salesModel', async () => {
    let response;

    chai
      .request(url)
      .post('/sales')
      .send(sale)
      .then((res) => {
        expect(res.body).to.not.be.empty;
        expect(res).to.have.status(201);
        expect(res.body).to.not.have.a.property('error');
        expect(res.body).to.be.an('object');
      })
      .catch((err) => {
        expect(err).to.be.null;
      });

    response = await salesModel.remove(1);

    chai
      .request(url)
      .delete('/sales/1')
      .send(sale)
      .then((res) => {
        expect(res.body).to.not.be.empty;
        expect(res).to.have.status(201);
        expect(res.body).to.not.have.a.property('error');
        expect(res.body).to.be.an('object');
      })
      .catch((err) => {
        expect(err).to.be.null;
      });
  });

  describe('Testing getAllFromSalesProduct function from salesProduct', async () => {
    const response = await salesModel.getAllFromSalesProduct();
    expect(response).to.not.be.null;
    chai
      .request(url)
      .get('/sales')
      .then((res) => {
        expect(res.body).to.not.be.empty;
        expect(res).to.have.status(200);
        expect(res.body).to.not.have.a.property('error');
        expect(res.body).to.be.an('array');
      })
      .catch((err) => {
        expect(err).to.be.null;
      });
  });
});