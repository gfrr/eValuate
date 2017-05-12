const dotenv = require('dotenv');

dotenv.config();
dotenv.load();

module.exports = {
  //apikey
  setAPIkey:(req, res, next)=>{
    res.locals.API_KEY = process.env.API_KEY;
    next();
  },
  //this method saves the current user in the global scope
  //so it can be accessed  without passing it while rendering the page
  setCurrentUser: (req, res, next)=> {
    if(req.isAuthenticated()){
      res.locals.currentUser = req.user;
      res.locals.isUserLoggedIn = true;
    } else {
      res.locals.isUserLoggedIn = false;
    }
    next();
  },
  //this method checks if a user is logged in, it also checks
  //the authorization level of the user
  //the third argument if is set to 1 locks the authorization level only
  //for that user type, i.e only owners can sell products -> checkLoggedIn(redirectPath, "Owner", 1);

  checkLoggedIn: (redirectPath, authLevel = "User", exclusive = 0) => {

    return (req, res, next)=> {
      const roles = ['User','Owner', 'Professional', 'Admin'];

      if(req.isAuthenticated()){
        const checkLevel = roles.indexOf(authLevel);
        const currentLevel = roles.indexOf(req.user.role);
        if(exclusive)
          if(currentLevel == checkLevel) next();
          else res.redirect(redirectPath);
        else
          if(currentLevel >= checkLevel) next();
          else res.redirect(redirectPath);
      }
      else res.redirect(redirectPath);

    };
  },

};
