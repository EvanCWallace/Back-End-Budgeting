/**
 * Description:
 *                  The user router handles all routes related to website user accounts,
 *                  including creating, updating & deleting user accounts. User accounts
 *                  also contain the budgeting "envelope" objects that are the focus of
 *                  this website.  Routes involving user envelopes are passed to the envelope router.
 * 
 * Created:         04/11/2022
 * Author:          Evan Wallace
 * 
 * 
 *                              Task Order
 *                              
 *    Task 01: Clear Database (Mostly for testing purposes)     Line: 29
 *    Task 02: Retrieve user information or return 404          Line: 34
 *    Task 03: Get all Users                                    Line: 42
 *    Task 04: Get User by UserID                               Line: 43
 *    Task 05: Create User                                      Line: 44
 *    Task 06: Update user by ID                                Line: 58
 *    Task 07: Delete user by ID                                Line: 64
 *    Task 08: Pass envelope routes to envelopeRouter           Line: 69
 */
module.exports = userRouter;
const express = require('express');
const userRouter = express.Router();
const db = require('./db');
const envelopeRouter = require('./envelopes');

userRouter.delete('/all', (req, res, next) => {
    const ready = db.resetDB();
    if (ready)  { res.send(); }
    if (!ready) { res.status(500).send(); }
})
userRouter.param('userID', (req, res, next, id) => {
    const user = db.getUserByUserID(id);
    if (user) {
        req.user = user;
        next();
    }
    if(!user){res.status(404).send();}
});
userRouter.get('/', (req, res, next) => { res.send(db.users.slice(0)); });
userRouter.get('/:userID', (req, res, next) => {res.send(req.user);});
userRouter.post('/', (req, res, next) => {
    user = db.createUser(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.userID,
        req.body.secret,
        req.body.pay,
        req.body.payday,
        req.body.frequency
    );
    if (user)   {res.status(201).send(user);}
    if (!user)  {res.status(400).send();}
});
userRouter.put('/:userID', (req, res, next) => {
    user = req.user;
    const updated = user.updateUser(req.body.type, req.body.info);
    if (updated)  { res.status(201).send(user); }
    if (!updated) { res.status(400).send();}
});
userRouter.delete('/:userID', (req, res, next) => {
    deleted = db.deleteUser(req.user.userID);
    if (deleted)  {res.status(204).send();}
    if (!deleted) {res.status(400).send();}
});
userRouter.use('/:userID/envelopes', envelopeRouter);
