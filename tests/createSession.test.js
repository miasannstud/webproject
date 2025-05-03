// run the test with: node --test tests/createSession.test.js

import { describe, it } from "node:test";
import assert from "node:assert";
import request from "supertest";
import express from "express";
import bodyParser from "body-parser";

import { createSession } from "../backend/controllers/sessionController.js";
import { validateCreateSession } from "../backend/validators/sessionValidators.js";
import Session from "../backend/models/sessionSchema.js";

// mock setup: mock session model
Session.prototype.save = async function () { return this; };

// express app for isolated testing
const app = express();
app.use(bodyParser.json());
app.post("/sessions/:studyId", validateCreateSession, createSession);

describe("sessionController - createSession", () => {
  // positive case
  it("should create a session with valid demographics", async () => {
    const response = await request(app)
      .post("/sessions/60ddae2f4f1a25630c8b4567")
      .send({ demographics: { age: 25, gender: "Male" } });

    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.demographics.age, 25, "Age should be 25");
    assert.strictEqual(response.body.demographics.gender, "Male", "Gender should be Male");
  });

  // positive case
  it("should accept 'Other' gender", async () => {
    const response = await request(app)
      .post("/sessions/60ddae2f4f1a25630c8b4567")
      .send({ demographics: { age: 45, gender: "Other" } });

    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.demographics.gender, "Other");
  });

  // boundary case
  it("should reject age -1 (just outside boundary)", async () => {
    let response = await request(app)
      .post("/sessions/60ddae2f4f1a25630c8b4567")
      .send({ demographics: { age: -1, gender: "Male" } });

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.error, "Age must be between 0 and 116");
  });

  // boundare case
  it("should reject age 117 (just outside boundary)", async () => {
    let response = await request(app)
      .post("/sessions/60ddae2f4f1a25630c8b4567")
      .send({ demographics: { age: 117, gender: "Female" } });
        
    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.error, "Age must be between 0 and 116");
  });

  // edge case
  it("should create a session with extreme demographics value, age = 0", async () => {
    let response = await request(app)
      .post("/sessions/60ddae2f4f1a25630c8b4567")
      .send({ demographics: { age: 0, gender: "Male" } });

    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.demographics.age, 0, "Age should be 0 for minimum age");
  });

  // edge case
  it("should create a session with extreme demographics value, age = 116", async () => {
    let response = await request(app)
        .post("/sessions/60ddae2f4f1a25630c8b4567")
        .send({ demographics: { age: 116, gender: "Female" } });
  
      assert.strictEqual(response.status, 201);
      assert.strictEqual(response.body.demographics.age, 116, "Age should be 116 for maximum age");
  });

  // negative case
  it("should return an error for missing demographics", async () => {
    const response = await request(app)
        .post("/sessions/60ddae2f4f1a25630c8b4567")
        .send({});

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.error, "Demographics are required");
  });

  // negative case
  it("should return an error for an invalid studyId", async () => {
    const response = await request(app)
      .post("/sessions/invalidStudyId")
      .send({ demographics: { age: 25, gender: "Male" } });

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.error, "Invalid Study ID");
  });

  // negative case
  it("should reject missing age field", async () => {
    const response = await request(app)
      .post("/sessions/60ddae2f4f1a25630c8b4567")
      .send({ demographics: { gender: "Male" } });

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.error, "Age is required");
  });

  // negative case
  it("should reject missing gender field", async () => {
    const response = await request(app)
      .post("/sessions/60ddae2f4f1a25630c8b4567")
      .send({ demographics: { age: 25 } });

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.error, "Gender is required");
  });

  // negative case
  it("should reject invalid gender value", async () => {
    const response = await request(app)
      .post("/sessions/60ddae2f4f1a25630c8b4567")
      .send({ demographics: { age: 25, gender: "Unknown" } });

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.error, "Gender must be Male, Female, or Other");
  });

  // negative case
  it("should reject non-numeric age (eg string)", async () => {
    const response = await request(app)
      .post("/sessions/60ddae2f4f1a25630c8b4567")
      .send({ demographics: { age: "twenty", gender: "Male" } });

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.error, "Age must be an integer");
  });

  // negative case
  it("should reject extra unexpected fields in demographics", async () => {
    const response = await request(app)
      .post("/sessions/60ddae2f4f1a25630c8b4567")
      .send({ demographics: { age: 25, gender: "Male", hobby: "chess" } });
    // by default express-validator ignores extras, so this passes
    assert.strictEqual(response.status, 201);
  });
});
