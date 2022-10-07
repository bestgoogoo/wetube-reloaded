export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn;
  //---------------------------- No.1 위에 것과 동일
  // if (req.session.loggedIn) {
  //   res.locals.loggedIn = true;
  // }
  //---------------------------- No.2 위에 것과 동일
  // res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  res.locals.siteName = "Wetube";
  console.log(res.locals);
  next();
};
