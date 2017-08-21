// Important: must have MongoDB running with seeded data.

const supertest = require("supertest");
const app = require("../app");
const expect = require("chai").expect;

describe("homepage", () => {
  let request;

  beforeEach(() => {
    request = supertest(app).get("/").set("Accept", "text/html");
  });

  // GET /
  // Response: success/200
  it("returns an HTML response", done => {
    request.expect("Content-Type", /html/).expect(200, done);
  });
});

describe("/undefined route", () => {
  let request;
  beforeEach(() => {
    request = supertest(app).get("/nsdkanfewrwerw");
  });

  // GET /nsdkanfewrwerw
  // Response: error/404
  it("returns an error/404 response", done => {
    request.expect(404, done);
  });
});
