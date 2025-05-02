/*

Use parts of the code from the Lecture about intergration testing The code
is similiar structured to how our Teacher showed us in from this repo https://github.com/aliakseix/IDG2671_25_unit.testing

*/

// Import the nessesary stuff
import { describe, it, before, after, beforeEach } from "node:test";
import assert from "node:assert";
import fetch from "node-fetch";
import mongoose from "mongoose";

// import neccesary files
import Researcher from "../backend/models/researcherSchema.js";
import { app } from "../backend/server.js";

const PORT = process.env.PORT;
const backendUrl = `http://localhost:${PORT}`;
let server;

// Start server before running tests
before(async () => {
  console.log("Starting the server...");
  server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Before each test delete carlos
beforeEach(async () => {
  const deleteResult = await Researcher.deleteOne({ username: "Car" });
  console.log("Deleted user result:", deleteResult);

});

// After the whole test clear the database off stuff i added
after(async () => {
  console.log("Running cleanup...");

  try {
    // Delete the test user if it exists
    const deleteResult = await Researcher.deleteOne({ username: "Car" });
    console.log("Cleanup result:", deleteResult);

    // Close the server
    if (server) {
      server.close(() => {
        console.log("Server closed.");
        process.exit(0); 
      });
    }

    // Disconnect from the database
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("Database connection closed.");
    }
  } catch (error) {
    console.error("Error during cleanup:", error);
    process.exit(1);
  }
});

describe("API Intergration Tests! :D", () => {

  describe("Positive Test Cases", () => {

  describe("Get study based on Id, GET", () => {
    describe("Given that the passed studyId exists", () => {
      it("It should return a 200", async () => {
        const studyId = "67f3c5117481eea6b312880c"; // Id to our first study in the database
        const response = await fetch(`${backendUrl}/api/studies/${studyId}`);
        const data = await response.json();

        assert.strictEqual(response.status, 200);
        assert.ok(data);
        assert.strictEqual(data._id, studyId);
      });
    });
  });

  describe("Log in a researcher, POST", () => {
    describe("Given that the researcher account exits");
      it("It should return a 200 and login the researcher", async () => {
      const response = await fetch(`${backendUrl}/api/users/login`, {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          username: "mia",
          password: "mia",
        }),
      });

      const data = await response.json();

      // console.log("Response status:", response.status);
      // console.log("Response body:", data);

      assert.strictEqual(response.status, 200, "Expected status code 200");
      assert.strictEqual(data.message, "Login successful");
      });
    });
  });

  describe("Boundary Test Cases", () => {

    describe("Create a user with a password that has the minimun length required off 5 chara, POST", () => {
      describe("Given that user does not exist in the database", () => {
        it("It should succeed and return 201", async () => {
          const response = await fetch(`${backendUrl}/api/users/signup`, {
            method: "POST",

            headers: { "Content-Type": "application/json" },

            body: JSON.stringify({
              firstName: "Carlos",
              lastName: "Teacher",
              username: "Car",
              email: "carlos@gmail.com",
              password: "12345",
              institution: "NTNU",
            }),
          });

          const data = await response.json();

          // console.log("Response status:", response.status);
          // console.log("Response body:", data);

          assert.strictEqual(response.status, 201, "Expected status code 201");
          assert.strictEqual(data.message, "User registered successfully!");
        });
      });
    });
  });

  describe("Egde Test Cases", () => {

    describe("Register a user with no username, POST", () => {
      it("It should fail and return a 400 when createing a user", async () => {
      const response = await fetch(`${backendUrl}/api/users/signup`, {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          firstName: "Carlos",
          lastName: "Teacher",
          username: "",
          email: "carlos@gmail.com",
          password: "12345",
          institution: "NTNU",
          }),
        });

        const data = await response.json();

        // console.log("Response status:", response.status);
        // console.log("Response body:", data);

        assert.strictEqual(response.status, 400, "Expected status code 400");
        assert.strictEqual(data.errors[0].msg,"Invalid value", `Expected error message "Invalid value" but got instead"${data.errors[0].msg}"`);
      });
    });
  });

  describe("Negative Test Cases", () => {
    describe("Log in a user that does not exist, POST", () => {
      it("it should fail and return a 400", async () => {
        const response = await fetch(`${backendUrl}/api/users/login`, {
          method: "POST",

          headers: { "Content-Type": "application/json" },

          body: JSON.stringify({
            username: "fakeuser",
            password: "whatever",
          }),
        });

        const data = await response.json();

        // console.log("Response status:", response.status);
        // console.log("Response body:", data);

        assert.strictEqual(response.status, 400);
        assert.strictEqual(data.message, "Invalid credentials");
      });
    });
  });
});
