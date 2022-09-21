export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn;
  // res.locals.loggedIn = Boolean(req.session.loggedIn); 과 같음
  res.locals.loggedInUser = req.session.user;
  res.locals.siteName = "Wetube";
  next();
};
