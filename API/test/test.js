const expect = require("chai").expect;
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe("Users and Companies tests", function() {

    let base_url = "http://localhost:5001/"
    let admin_token;
    let adminUser = {
        email: "user@email.com",
        password: "password"
    }
    let notAnUser = {
        email: "testuser@email.com",
        password: "123456"
    }

    before(() => {
        chai.request(base_url)
            .post("login")
            .send(adminUser)
            .end((err, res) => {
                // console.log(res.body.token)
                admin_token = res.body.token;
                expect(res.status).to.equal(201);
            });

    })

    it("should not login with incorrect credentials", function(done) {
        chai.request(base_url)
            .post('login')
            .send(notAnUser)
            .end((err, res) => {
                expect(res.status).to.equal(401);
                done();
            });
    });

    it("should login with correct credentials", function(done) {
        chai.request(base_url)
            .post('login')
            .send(adminUser)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                done();
            });
    });

    it("should return a company with an admin_token and correct cnpj", function(done) {
        chai.request(base_url)
            .get('company/19131243000197')
            .set({ Authorization: `Bearer ${admin_token}` })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });

    it("should not return a company without an admin_token and correct cnpj", function(done) {
        chai.request(base_url)
            .get('company/19131243000197')
            .end((err, res) => {
                expect(res.status).to.equal(401);
                done();
            });
    });

    it("should not return a company with an admin_token and incorrect cnpj", function(done) {
        chai.request(base_url)
            .get('company/1913124300019')
            .set({ Authorization: `Bearer ${admin_token}` })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });

    it("should create a company with an admin_token and correct cnpj", function(done) {
        chai.request(base_url)
            .post('company/19131243000197')
            .set({ Authorization: `Bearer ${admin_token}` })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });

    it("should not create a company with an admin_token and incorrect cnpj", function(done) {
        chai.request(base_url)
            .post('company/1913124300019')
            .set({ Authorization: `Bearer ${admin_token}` })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });

    it("should not create a company without an admin_token and correct cnpj", function(done) {
        chai.request(base_url)
            .post('company/19131243000197')
            .end((err, res) => {
                expect(res.status).to.equal(401);
                done();
            });
    });

    it("should edit a company's fantasy name with an admin_token and correct cnpj", function(done) {
        chai.request(base_url)
            .put('company/19131243000197')
            .set({ Authorization: `Bearer ${admin_token}` })
            .send({"nome_fantasia": "Novo Nome"})
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });

    it("should not edit a company's fantasy name without an admin_token and correct cnpj", function(done) {
        chai.request(base_url)
            .put('company/1913124300019')
            .send({"nome_fantasia": "Novo Nome"})
            .end((err, res) => {
                expect(res.status).to.equal(401);
                done();
            });
    });

    it("should not edit a company's fantasy name with an admin_token and incorrect cnpj", function(done) {
        chai.request(base_url)
            .put('company/1913124300017')
            .set({ Authorization: `Bearer ${admin_token}` })
            .send({"nome_fantasia": "Novo Nome"})
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });
    it("should delete a with an admin_token and correct cnpj", function(done) {
        chai.request(base_url)
            .post('company/delete/19131243000197')
            .set({ Authorization: `Bearer ${admin_token}` })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });

    it("should not delete a without an admin_token and correct cnpj", function(done) {
        chai.request(base_url)
            .post('company/delete/19131243000197')
            .end((err, res) => {
                expect(res.status).to.equal(401);
                done();
            });
    });

    it("should not delete a with an admin_token and incorrect cnpj", function(done) {
        chai.request(base_url)
            .post('company/delete/1913124300019')
            .set({ Authorization: `Bearer ${admin_token}` })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });

});


