const express = require("express");
const userSchema = require("../models/user");
const router = express.Router();

// create user

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object 
 *      properties: 
 *        firstname:
 *          type: string
 *          description: the user firstname 
 *        lastname:
 *          type: string 
 *          description: the user lastname 
 *        email:
 *          type: string
 *          description: the user email 
 *        favoriteColor:
 *          type: string
 *          description: the favorite color
 *        birthday:
 *          type: string
 *          description: the birthday
 *      required:
 *        - firstname
 *        - lastname
 *        - email
 *        - favoriteColor
 *        - birthday
 */

/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: create a new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: new user created!
 */

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: return all users
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: all users!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */
router.post("/users", (req, res) => {
  const user = userSchema(req.body);
  console.log(user);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all users

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: return all users
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: all users!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */

router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a user

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    summary: return a user
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the user id
 *    responses:
 *      200:
 *        description: a user!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: user not found
 * 
 */

router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update a user

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: update a user
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: user updated!
 *      404:
 *        description: user not found
 * 
 */

router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, favoriteColor, birthday } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { firstname, lastname, email, favoriteColor, birthday } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Delete a user

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    summary: delete a user
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the user id
 *    responses:
 *      200:
 *        description: user deleted
 *      404:
 *        description: user not found
 * 
 */

router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
