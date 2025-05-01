/* 
  Use parts of the code from the Lecture about intergration testing The code 
  is similiar structured to how our Teacher showed us in from this repo https://github.com/aliakseix/IDG2671_25_unit.testing
*/

// Import the nessesary stuff
import { describe, it, before, after, beforeEach } from "node:test";
import assert from "node:assert";
import fetch from "node-fetch";

import { app } from "../backend/server.js";
import connectDB from "../backend/config/db.js";
import Researcher from "../backend/models/researcherSchema.js";

const PORT = process.env.PORT;
const backendUrl = `http://localhost:${PORT}`;

// Before test connect to the database
before(async () => {
  console.log("Connecting to the database...");
  await connectDB(); 
  console.log("Successfully connected to MongoDB");
});

beforeEach(async () => {
  const deletedUsername = await Researcher.deleteOne({ username: "Car" });
  const deletedEmail = await Researcher.deleteOne({ email: "carlos@gmail.com" });
  console.log("Deleted username:", deletedUsername);
  console.log("Deleted email:", deletedEmail);
});

// after each test or the whole test clear the database off stuff i added
after(async () => {    
  // Delete the carlos from the database
  const result = await Researcher.deleteOne({ username: "Car" });
  console.log("Deleted user:", result);

  // Check if the user was deleted
  assert.strictEqual(result.deletedCount, 1, "Expected one user to be deleted");
});

describe("API Intergration Tests! :D", () => {

  describe("Positive Test Cases", () => {

    describe("Get study based on Id", () => {
      describe("Given that the passed studyId exists", () => {
        it("should return a 200", async () => {
          const studyId = "67f3c5117481eea6b312880c"; // Id to our first study in the database

          const response = await fetch(`${backendUrl}/api/studies/${studyId}`);
          const data = await response.json();

          assert.strictEqual(response.status, 200);
          assert.ok(data);
          assert.strictEqual(data._id, studyId);
        });
      });
    });

    const dummyResearcher = {
      username: "mia",
      password: "mia",
    };

    describe("Log in a researcher", () => {
      describe("given that the researcher account exits");
      it("should log in a researcher", async () => {
        const response = await fetch(`${backendUrl}/api/users/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: dummyResearcher.username,
            password: dummyResearcher.password,
          }),
        });

        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Response body:", data);

        assert.strictEqual(response.status, 200, "Expected status code 200");
        assert.strictEqual(data.message, "Login successful");
      });
    });
  });

  describe("Boundary Test Cases", () => {
  
  describe("Create a user with a password that has the minimun length required off 5 chara", () =>{
    describe("given that this user does not already exist in the database", () =>{
      it("should create be able to create a user with the minimun rquired password", async () => {
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
        console.log("Response status:", response.status);
        console.log("Response body:", data);
  
        assert.strictEqual(response.status, 201, "Expected status code 201");
        assert.strictEqual(data.message, "User registered successfully!");
      });
    });
  });
});

    // cretate user with password with min length

  describe("Egde Test Cases", () => {
      // registre a user no username

    describe("Register a user with no username", () =>{
      it("It should fail createing a user", async () => {
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
        console.log("Response status:", response.status);
        console.log("Response body:", data);
  
        assert.strictEqual(response.status, 400, "Expected status code 400");
        assert.strictEqual( // litt usikker på denne
          data.errors[0].msg,
          "Invalid value",
          `Expected error message "Invalid value" but got "${data.errors[0].msg}"`
        );
      });
    });
  });
  
    describe("Negative Test Cases", () => {
      // log inn a user that does not exist
      // regustre a user with sql injection
    });
  });
