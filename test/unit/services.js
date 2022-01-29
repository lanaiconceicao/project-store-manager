const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const productService = require('../../services/productService');
const salesService = require('../../services/salesService');

describe('Testing productService and saleService', () => {
  beforeEach(async () => {
    const query = [[]];

    sinon.stub(connection, 'query').resolves(query);
  });

  afterEach(async () => connection.query.restore());

  describe('testing getAll function from productService', () => {
    it('returns an array', async () => {
      const response = await productService.getAll();

      expect(response).to.be.an('array');
    });

    it('contains an empty array', async () => {
      const response = await productService.getAll();

      expect(response).to.be.empty;
    });
  });

  describe('testing add function from productService', () => {
    it('returns an object', async () => {
      const result = { name: 'Iphone 11 pro', quantity: 20 };
      const response = await productService.add(result);

      expect(response).to.be.an('object');
    });
  });

  describe('testing getById function from productService', () => {
    it('returns null', async () => {
      const response = await productService.getById();

      expect(response).to.be.null;
    });
  });

  describe('testing update function from productService', () => {
    it('returns an object that has "name" as undefined', async () => {
      const response = await productService.update({ id: 1, quantity: 2 });

      expect(response).to.be.an('object');
      expect(response.name).to.be.undefined;
    });
  });

  describe('testing update function from productService', () => {
    it('returns an object', async () => {
      const response = await productService.update({ id: 1, quantity: 2 });

      expect(response).to.be.an('object');
    });
  });

  describe('testing remove function from productService', () => {
    it('returns an object and getAll has null as value', async () => {
      const getAll = await productService.getAll();
      const response = await productService.remove(1);

      expect(getAll).to.be.an('array');
      expect(getAll).to.be.empty;
      expect(response).to.be.undefined;
    });
  });

  describe('testing getAll function from salesService', () => {
    it('returns an array', async () => {
      const response = await salesService.getAll();

      expect(response).to.be.an('array');
    });
  });

  describe('testing getById function from salesService', () => {
    it('returns an empty value', async () => {
      const response = await salesService.getById();

      expect(response).to.be.null;
    });
  });

  describe('testing getAll function from salesService', () => {
    it('returns an array', async () => {
      const response = await salesService.getAll();

      expect(response).to.be.an('array');
    });
  });

  describe('testing remove function from salesService', () => {
    it('returns an object and getAll has null as value', async () => {
      const getAll = await salesService.getAll();
      const response = await salesService.remove();

      expect(getAll).to.be.an('array');
      expect(getAll).to.be.empty;
      expect(response).to.be.null;
    });
  });

  describe('testing update function from salesService', () => {
    it('returns undefined', async () => {
      const response = await salesService.update({ id: 1, quantity: 2 });

      expect(response).to.be.undefined;
    });
  });

  describe('testing add function from salesService', () => {
    it('returns an object', async () => {
      const sale = [
        {
          "product_id": "product_id",
          "quantity": "product_quantity",
        }
      ];
      const response = await salesService.add(sale);

      expect(response).to.be.an('array');
    });
  });
});