import { Request, Response, NextFunction } from "express";
import * as pokemonsService from "../service/pokemons.service";
import { createPagingMetadata } from "../service/paging-metadata.service";
import { Prisma } from "@prisma/client";

async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { sortInfo } = req.query;
    const pokemons = await pokemonsService.findAll(
      sortInfo as {
        field: Prisma.PokemonScalarFieldEnum;
        dir: Prisma.SortOrder;
      }
    );
    res.json(pokemons);
  } catch (err) {
    console.error(`Error`);
    next(err);
  }
}

async function listv2(req: Request, res: Response, next: NextFunction) {
  try {
    const { sortInfo, offset, limit } = req.query;
    const { count, data } = await pokemonsService.findAllv2(
      sortInfo as {
        field: Prisma.PokemonScalarFieldEnum;
        dir: Prisma.SortOrder;
      },
      Number(offset),
      Number(limit)
    );

    res.json({
      data: data,
      metadata: createPagingMetadata(req, count, Number(offset), Number(limit)),
    });
  } catch (err) {
    console.error(`Error`);
    next(err);
  }
}

async function detail(req: Request, res: Response, next: NextFunction) {
  try {
    const pokemon = await pokemonsService.findPokemonById(
      Number(req.params.id)
    );
    if (!pokemon) {
      return res.status(404).json("not found");
    }
    res.json(pokemon);
  } catch (err) {
    console.error(`Error`);
    next(err);
  }
}

async function search(req: Request, res: Response, next: NextFunction) {
  try {
    const { query, limit } = req.query;
    const pokemons = await pokemonsService.search(String(query), Number(limit));
    res.json(pokemons);
  } catch (err) {
    console.error(`Error`);
    next(err);
  }
}

export { search, detail, list, listv2 };
