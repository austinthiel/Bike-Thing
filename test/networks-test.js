// Important: must have MongoDB running with seeded data.

const supertest = require("supertest");
const app = require("../app");
const expect = require("chai").expect;

// Helper functions for assertion
function isObject(res) {
  expect(res).to.be.an("object");
}

function hasBody(res) {
  expect(res).to.have.property("body");
}

describe("/networks route", () => {
  let request;
  beforeEach(() => {
    request = supertest(app).get("/networks").set("Accept", "application/json");
  });

  // GET /networks
  // Response: success/200
  it("returns a JSON response", done => {
    request
      .expect("Content-Type", /json/)
      .expect(isObject)
      .expect(hasBody)
      .expect(hasArrayLength)
      .expect(200, done);

    function hasArrayLength(res) {
      expect(res.body).be.an("array").and.to.have.lengthOf(550);
    }
  });
});

describe("/networks/:_id route", () => {
  let request;
  beforeEach(() => {
    request = supertest(app);
  });

  // GET /networks/5993a2be0d43ff1e8c7f72e0
  // Response: success/200
  it("returns an existing network", done => {
    function hasExistingNetwork(res) {
      expect(res.body).to.eql(network);
    }

    const network = {
      company: ["Cyacle Bicycle Rental LLC"],
      location: {
        city: "Abu Dhabi",
        country: "AE",
        latitude: 24.450278,
        longitude: 54.39
      },
      name: "ADCB Bikeshare",
      _id: "5993a2be0d43ff1e8c7f72e0"
    };

    request
      .get("/networks/" + network._id)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(isObject)
      .expect(hasBody)
      .expect(hasExistingNetwork)
      .expect(200, done);
  });

  // GET /networks/zxzxzxzxxzxxzcacas
  // Response: error/404
  it("returns an error/404 for a non-existing network", done => {
    function doesNotHaveExistingNetwork(res) {
      expect(res.body).to.not.eql(network);
    }

    const network = {
      _id: "zxzxzxzxxzxxzcacas"
    };

    request
      .get("/networks/" + network._id)
      .expect("Content-Type", /text/)
      .expect(isObject)
      .expect(hasBody)
      .expect(doesNotHaveExistingNetwork)
      .expect(500, done);
  });
});
