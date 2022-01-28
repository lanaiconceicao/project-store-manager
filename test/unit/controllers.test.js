// const sinon = require('sinon');
// const { expect } = require('chai');

// const ProductService = require('../../services/productService');
// const ProductController = require('../../controllers/productController');

// describe("Ao chamar o controller de add", () => {
//   describe("quando o payload informado não é válido", () => {
//     const response = {};
//     const request = {};

//     beforeEach(() => {
//       request.body = {};

//       response.status = sinon.stub().returns(response);
//       response.send = sinon.stub().returns();

//       sinon.stub(ProductService, "add").resolves(false);
//     });

//     afterEach(() => {
//       ProductService.add.restore();
//     });

//     it("é chamado o status com o código 400", async () => {
//       await ProductController.add(request, response);

//       expect(response.status.calledWith(400)).to.be.equal(true);
//     });

//     it('é chamado o json com a mensagem "Dados inválidos"', async () => {
//       await ProductController.add(request, response);

//       expect(response.json.calledWith("Product not found")).to.be.equal(true);
//     });
//   });
// });
