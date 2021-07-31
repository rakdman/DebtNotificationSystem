const express = require('express')
const app = express()

const passport = require('passport')

const session = require('express-session')

// const User = require('./models/User')

const facebookStrategy = require('passport-facebook').Strategy

// HTTPS Secure website code
const https = require('https')
const fs = require('fs')

const options = {
    key : fs.readFileSync('key.pem','utf8'),
    cert : fs.readFileSync('cert.pem','utf8')
}


app.set("view engine","ejs")
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session()); 

passport.use(new facebookStrategy({

    // pull in our app id and secret from our auth.js file
    // clientID        : "########yourclientid############",
    clientID        : "369106464611069",
    // clientSecret    : "#############yourclientsecret##########",
    clientSecret    : "6ad3cea328cf92d1c9d94ca901c3a98e",
    // callbackURL     : "https://localhost:5000",
    callbackURL     : "https://localhost:5000/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)','email']

},// facebook will send back the token and profile
function(token, refreshToken, profile, done) {

    // asynchronous
    process.nextTick(function() {
        // console.log(profile._json)
        console.log(profile._json.first_name)
        console.log(profile._json.last_name)
        console.log(profile._json.email)
        return done(profile.id)
        // // find the user in the database based on their facebook id
        // User.findOne({ 'uid' : profile.id }, function(err, user) {

        //     console.log('user found!!!!!!!!!!')
        

        //     // if there is an error, stop everything and return that
        //     // ie an error connecting to the database
        //     if (err)
        //         return done(err);

        //     // if the user is found, then log them in
        //     if (user) {
        //         console.log("user found")
        //         console.log(user)
        //         return done(null, user); // user found, return that user
        //     } else {
        //         // if there is no user found with that facebook id, create them
        //         var newUser            = new User();

        //         // set all of the facebook information in our user model
        //         newUser.uid    = profile.id; // set the users facebook id                   
        //         newUser.token = token; // we will save the token that facebook provides to the user                    
        //         newUser.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
        //         newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
        //         newUser.gender = profile.gender
        //         newUser.pic = profile.photos[0].value
        //         // save our user to the database

        //         console.log('Going to save the user details in Database')
        //         newUser.save(function(err) {
        //             if (err)
        //                 throw err;

        //             // if successful, return the new user
        //             return done(null, newUser);
        //         });
        //     }

        // }
        // );

    }
    )

}));

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
    
// });

// // used to deserialize the user
// passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//         done(err, user);
//     });
// });

// app.get('/profile', isLoggedIn, function(req, res) {
//     console.log(req.user)
//     res.render('profile', {
//         user : req.user // get the user out of session and pass to template
//     });
// });

// app.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });

// route middleware to make sure
// function isLoggedIn(req, res, next) {

// 	// if user is authenticated in the session, carry on
//     console.log('User authenticated')
// 	if (req.isAuthenticated())
// 		return next();

// 	// if they aren't redirect them to the home page
// 	res.redirect('/');
// }

app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

app.get('/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

// app.get('/',(req,res) => {
//     res.render("index")
// })

// app.listen(5000,() => {
//     console.log("App is listening on Port 5000")
// })


// https.createServer(options, function (req, res) {
//     res.writeHead(200)
//     res.end("Hello World \n")
// } ).listen(5000)

// https.createServer(options, app ).listen(5000,() => {
//          console.log("App is listening on Port 5000")
//      })