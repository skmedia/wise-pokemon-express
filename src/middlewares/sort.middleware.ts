import express from "express";

const sort = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.query.sort && String(req.query.sort).includes("-")) {
    const [field, dir] = (req.query.sort as string).split("-");
    req.query.sortInfo = { field: field, dir: dir };
  }

  return next();
};

export default sort;
