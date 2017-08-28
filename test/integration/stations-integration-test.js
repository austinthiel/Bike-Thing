// Important: must have MongoDB running

const supertest = require("supertest");
const app = require("../../app");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("integration -- /stations/:_id route", () => {
  let request;
  beforeEach(() => {
    request = supertest(app);
  });

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

  it("GET a station and return its JSON", done => {
    request
      .get("/stations/" + station._id)
      .expect(station)
      .expect(200)
      .end(done);
  });

  it("PUT a station with valid empty_slots and return its updated JSON", done => {
    request
      .put("/stations/" + station._id)
      .send({ empty_slots: 2 })
      .expect(function(res) {
        expect(res.body.empty_slots).to.be.equal(2);
      })
      .expect(200)
      .end(done);
  });

  it("PUT a station with invalid empty_slots and return a 500 error", done => {
    request
      .put("/stations/" + station._id)
      .send({ empty_slots: -1 })
      .expect(500)
      .end(done);
  });

  it("PUT a station with valid is_closed and return its updated JSON", done => {
    request
      .put("/stations/" + station._id)
      .send({ is_closed: false })
      .expect(function(res) {
        expect(res.body.is_closed).to.be.equal(false);
      })
      .expect(200)
      .end(done);
  });

  it("PUT a station with invalid is_closed and return a 500 error", done => {
    request
      .put("/stations/" + station._id)
      .send({ is_closed: 1 })
      .expect(500)
      .end(done);
  });

  it("PUT a station with valid is_safe and return its updated JSON", done => {
    request
      .put("/stations/" + station._id)
      .send({ is_safe: false })
      .expect(function(res) {
        expect(res.body.is_safe).to.be.equal(false);
      })
      .expect(200)
      .end(done);
  });

  it("PUT a station with invalid is_safe and return a 500 error", done => {
    request
      .put("/stations/" + station._id)
      .send({ is_safe: 1 })
      .expect(500)
      .end(done);
  });

  it("GET a non-existing station and return a 500 error", done => {
    request.get("/stations/zxzxzxzxxzxxzcacas").expect(500).end(done);
  });
});
