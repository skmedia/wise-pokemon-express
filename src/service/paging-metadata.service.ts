import { Request } from "express";

const createPagingMetadata = (
  req: Request,
  total: number,
  offset: number,
  limit: number
) => {
  const pages = Math.ceil(total / limit);
  const page = Math.ceil((offset - 1) / limit + 1);
  const nextOffset = offset + limit <= total ? offset + limit : offset;
  const previousOffset = Math.max(offset - limit, 0);

  const url = req.protocol + "://" + req.get("host") + req.url;
  const nextUrl = new URL(url);
  nextUrl.searchParams.set("offset", String(nextOffset));
  const prevUrl = new URL(url);
  prevUrl.searchParams.set("offset", String(previousOffset));

  return {
    next: String(nextUrl),
    previous: String(prevUrl),
    total: total,
    pages: pages,
    page: page,
  };
};

export { createPagingMetadata };
