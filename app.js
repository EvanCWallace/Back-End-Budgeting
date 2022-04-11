/**
 * Description:
 *              In the shell prompt, type the command 'node app.js' to intialize
 *              the database, this will load the necessary middleware and start
 *              the server.
 *              Note: This will includ the user router middleware
 * 
 * Creation:    04/11/2022
 * Author:      Evan Wallace
 */

//---------------------Variable field---------------------//
const express     = require('express');
const app         = express();
const db          = require('./db');
const userRouter  = require('./user');
const bodyParser  = require('body-parser');
const PORT        = process.env.PORT || 3000;
//---------------------Variable field---------------------//

/**
 *                        Task Order
 *  
 *  Task 01: Intialize the Database                     Line: 29
 *  Task 02: Load the nessecary bodyParser middleware   Line: 30
 *  Task 03: Forward the user router to userRouter      Line: 31
 *  Task 04: Run The Server                             Line: 32
 */
db.initialize(); 
app.use(bodyParser.json());
app.use('/user', userRouter);
app.listen(PORT, console.log(`Server listening at ${PORT}`));
