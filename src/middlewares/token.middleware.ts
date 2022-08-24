import express from "express";

const mustHaveToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (
    req.headers.authorization &&
    req.headers.authorization === "Bearer " + process.env.TOKEN
  ) {
    return next();
  }

  res.status(401).json("access denied");
};

export default mustHaveToken;
