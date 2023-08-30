const authchk = (req, res, next) => {
  if (req.headers["accesstoken"] == undefined) {
    res.status(404).send("User Unauthorized");
    return;
  }
  next();
};

export { authchk };
