//NB  ikke ferdig!!

import { validationResult } from "express-validator";
import { body, query, param } from "express-validator";

// const ResearcherSchema = new Schema({
//     "firstName":   { type: String, required: true},
//     "lastName":    { type: String, required: true},
//     "username":    { type: String, required: true, unique: true},
//     "email":       { type: String, required: true, unique: true},
//     "password":    { type: String, required: true},
//     "institution": { type: String, enum:["NTNU", "Other"]},
//     "createdAt":   { type: Date, default: Date.now,}
// });

// app.post(
//     '/create-user',
//     body('email').custom(async value => {
//       const user = await UserCollection.findUserByEmail(value);
//       if (user) {
//         throw new Error('Email already in use');
//       }
//     }),
//     body('username').custom(async value => {
//       const user = await UserCollection.findUserByUsername(value);
//       if (user) {
//         throw new Error('Username already in use');
//       }
//     }),
//     (req, res) => {
//       // Handle the request
//     },
//   );

export const createUserValidator = [
  body("firstname").notEmpty().withMessage("Firstname is required"),

  body("lastname").notEmpty().withMessage("Lastname is required"),

  body("username")
    .isString()
    .notEmpty()
    .withMessage("Username is required")
    .custom(async (value) => {
      const user = await UserCollection.findUserByUsername(value);
      if (user) {
        throw new Error("Username already in use");
      }
    }),

    body("email")
      .isEmail()
      .notEmpty()
      .withMessage("Email is required")
      .custom(async (value) => {
        const user = await UserCollection.findUserByEmail(value);
        if (user) {
          throw new Error("Email already in use");
        }
      }),

  body("birthdate").isDate().notEmpty().withMessage("Birthdate is required"),

  body("password").isString().notEmpty().withMessage("Password is required"),

];

const findUserValidator = [
  param("userid")
    .isMongoId()
    .withMessage("Invalid User ID or user is not alive"),
];

const searchByAllowedOptions = [
  "firstname",
  "surname",
  "username",
  "email",
  "birthdate",
];

const findUsersValidatorArr = [
  query("searchBy")
    .isString()
    .isIn(searchByAllowedOptions)
    .withMessage(
      "Invalid searchBy option. Allowed options are: " +
        searchByAllowedOptions.join(", ")
    ),

  query("SearchValue"),
];