import express from "express";
import validate from "../middlewares/validate.middleware";
import sort from "../middlewares/sort.middleware";
import { checkSchema } from "express-validator";
import {
  detail,
  list,
  search,
  listv2,
} from "../controllers/pokemons.controller";

import {
  showPokemonDetailSchema,
  listPokemonsSchema,
  listPokemonsV2Schema,
  searchSchema,
} from "../schema/pokemons.validation";

const router = express.Router();

router.get(
  "/api/v1/pokemons",
  [sort, validate(checkSchema(listPokemonsSchema))],
  list
);

router.get(
  "/api/v2/pokemons",
  [sort, validate(checkSchema(listPokemonsV2Schema))],
  listv2
);

router.get("/api/v1/search", validate(checkSchema(searchSchema)), search);

router.get(
  "/api/v1/pokemons/:id",
  validate(checkSchema(showPokemonDetailSchema)),
  detail
);

export default router;
