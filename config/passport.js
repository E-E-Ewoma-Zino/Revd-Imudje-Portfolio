// configure passport
const LocalStrategy = require("passport-local").Strategy;
const Users = require(__dirname + "../../model/Users");


module.exports = (passport) => {
	passport.use(Users.createStrategy());
	// THIS WAS WHAT I USE IN FIXING THE PASSPORT AUTHENTICATION ISSUE
	passport.use(new LocalStrategy({
		usernameField: 'email',
	}, Users.authenticate()));

	passport.serializeUser(Users.serializeUser());
	passport.deserializeUser(Users.deserializeUser());
}

/* While using this passport you require */
// passport
// passport-local
// A user Schema
/* In user model file you need */
// passport-local-mongoose
// then add this: userSchema.plugin(passportLocalMongoose);