
import { validationResult } from "express-validator";
import { body, query, param } from "express-validator";

export const createUserValidator = [
  body("firstname")
    .notEmpty()
    .withMessage("Firstname is required"),

  body("lastname")
    .notEmpty()
    .withMessage("Lastname is required"),

  body("username")
    .isString()
    .notEmpty()
    .withMessage("Username is required")

    .custom(async (value) => {
      const user = await UserCollection.findOne({ username: value});
      if (user) {
        throw new Error("Username already in use");
      }
    }),

  body("email")
    .isEmail()
    .notEmpty()
    .withMessage("Email is required")

    .custom(async (value) => {
      const user = await UserCollection.findOne({password: value});
      if (user) {
        throw new Error("Email already in use");
      }
    }),

  body("birthdate")
    .isDate()
    .notEmpty()
    .withMessage("Birthdate is required"),

  body("password")
    .isString()
    .notEmpty()
    .withMessage("Password is required"),
];

// const findUserValidator = [
//   param("userid")
//     .isMongoId()
//     .withMessage("Invalid User ID or user is not alive"),
// ];

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

  query("SearchValue")
  .isString()
  .notEmpty()
  .withMessage("search value is required")
];