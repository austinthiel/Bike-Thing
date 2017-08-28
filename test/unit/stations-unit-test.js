// Important: must have MongoDB running with seeded data.

const supertest = require("supertest");
const app = require("../../app");
const expect = require("chai").expect;

// Helper functions for assertion
function isObject(res) {
  expect(res).to.be.an("object");
}

function hasBody(res) {
  expect(res).to.have.property("body");
}

describe("unit /stations/:_id route", () => {
  let request;
  beforeEach(() => {
    request = supertest(app)
  });

  // GET /stations/6435602c7151bc587e0d15a2c5dc99ab
  // Response: success/200
  it("returns an existing station", done => {
    function hasExistingStation(res) {
      expect(res.body).to.eql(station);
    }

    const station = {
      empty_slots: 5,
      free_bikes: 6,
      _id: "5993a2bf0d43ff1e8c7f72e1",
      latitude: 24.537567,
      longitude: 54.42835099999999,
      name: "St. Regis",
      is_closed: true,
      is_safe: true,
      network_id: "5993a2be0d43ff1e8c7f72e0"
    };

    request
      .get("/stations/" + station._id)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(isObject)
      .expect(hasBody)
      .expect(hasExistingStation)
      .expect(200, done);
  });

  // GET /stations/xvzvzvxzvdsvsv
  // Response: error/404
  it("returns an error/404 for a non-existing network", done => {
    function doesNotHaveExistingStation(res) {
      expect(res.body).to.not.eql(station);
    }

    const station = {
      _id: "xvzvzvxzvdsvsv"
    };

    request
      .get("/stations/" + station._id)
      .expect("Content-Type", /text/)
      .expect(isObject)
      .expect(hasBody)
      .expect(doesNotHaveExistingStation)
      .expect(500, done);
  });
});
