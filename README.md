# Back-End-Budgeting
The Envelope Budgeting Backend is a toy API created with Node.js and Express to demonstrate my ability to build, debug, and maintain the backend of a functional website.

The Envelope Budgeting Backend is a RESTful API that allows one to create user accounts and build a budgeting profile for each user based on "envelope" objects that maintain balances for different purposes and can be updated to deposit, withdraw, or transfer funds.

The Envelope Budgeting Backend comes with a working database that automatically maintains a back-up of all data in a .json file so the server can be turned off and on without losing data.

All routes have been tested for correct responses to requests with proper as well as improper data. The project is several steps short of production, but is a good representation of my skills with Express and node.js.

# Features
The included routes allow one to create, retrieve, modify and delete any number of user accounts. Within each account, routes are provided to create, retrieve, modify and delete any number of personal budgeting "envelopes" objects, each with a specified budgeting category (ie "groceries", "vacation", etc) and a balance that represents funds allocated for that purpose. Functionality is provided to deposit or withdraw funds from envelopes to represent spending in various categories. Functionality is also provided to transfer funds from one "envelope" to another . All of this is designed to assist a user with personal finances and planning.

The functionality with the routes works seemlessly with the database, which provides a User class and methods for creating, retrieving, modifying and deleting users. The user objects themselves contain methods for creating, retrieving, modifying and deleting "envelope" objects. The database is designed to automatically save essential information about the users and envelopes in a users.json file, so that data is preserved even when the server is down. Checks at every step ensure that data is correct. A route is included to "reset" the database for testing purposes, as data will persist after the server is stopped and restarted.
