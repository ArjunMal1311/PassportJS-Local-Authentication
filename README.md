# PassportJS-Local-Authentication
An Authentication system using Node.js, Express, and Passport.js (Local Strategy)

This is a simple example application that demonstrates how to use Passport JS with Node.js and Express to implement local authentication with username and password. The application uses Passport Local Strategy to authenticate users and MongoDB for persistent data storage.


# Passport JS Authentication Guide
Configuration

The application requires a few configuration steps before it can be used. Here are the main configuration steps:

1. Database connection: The application uses MongoDB for data storage. You'll need to set up a MongoDB connection and set the MONGO_URI environment variable to the connection string.
2. Passport Local Strategy: The application uses Passport Local Strategy to authenticate users with a username and password. You'll need to configure the strategy in config/passport.js by setting the username and password options, as well as the verifyCallback function.
3. Session secret: The application uses sessions to keep users logged in. You'll need to set the SECRET environment variable to a secret string of your choice.

# Working of Passport JS Local Strategy
1. When a user submits their login credentials, the callback function defined in the LocalStrategy is invoked, and it receives the username and password entered by the user as arguments. The callback function should then use these credentials to check if the user exists in your application's database and if the password is correct.
2. If the user is successfully authenticated, you should invoke the done function with the authenticated user object. If the user is not authenticated, you should invoke the done or CallBack function with false.
3. If the user is successfully authenticated, Passport will automatically create a session for the user, and the user object will be stored in the req.user property. This will allow you to access the user's information in subsequent requests.

# Usage
To use the application, follow these steps:

1. Register a new user by visiting the /register page and filling out the registration form.
2. Log in by visiting the /login page and entering your username and password.

# Contact
If you have any questions or comments about this application, please contact me at hiarjun.malhotra2002@gmail.com
