// Import the nessesary stuff
// trenger sikkert noe mer her
import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import fetch from "node-fetch";

import { app } from "../backend/server.js";

describe("API Intergration Tests! :D", () => {

  describe("Positive Test Cases", () => {

    describe("Get study based on Id", () => {
      describe("Given that the passed studyId exist");
      it("should return a 200", async () => {
        const studyId = "67f3c5117481eea6b312880c"; // Id to our first study in the database
        const response = await fetch(
          `http://localhost:8080/api/studies/${studyId}`
        );
        const data = await response.json();

        assert.strictEqual(response.status, 200);
        assert.ok(data);
        assert.strictEqual(data._id, studyId);
      });
    });

    const dummyResearcher = {
      firstname: "Dummy",
      lastname: "Researcher",
      email: "dummy@researcher.com",
      username: "mia",
      password: "mia",
      institution: "NTNU",
    };

    describe("Log inn a researcher", () => {
      describe("Given that the user exist");
      it("should Log inn an researcher", async () => {
        const response = await fetch("http://localhost:8080/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: dummyResearcher.username,
            password: dummyResearcher.password,
          }),
        });

        const data = await response.json();

        console.log("Response status:", response.status);
        console.log("Response body:", data);

        assert.strictEqual(response.status, 200, "Expected status code 200");
        assert.strictEqual(data.message, "Login successful");
      });
    });
  });

  describe("Boundary Test Cases", () => {
    // create a question with max length in a question

  });

  describe("Egde Test Cases", () => {
    // registre a user no username
  });

  describe("Negative Test Cases", () => {
    // log inn a user that does not exist

    // regustre a user with sql injection
  });
});