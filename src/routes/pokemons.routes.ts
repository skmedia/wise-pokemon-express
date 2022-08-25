import express from "express";
import validate from "../middlewares/validate.middleware";
import parseSortField from "../middlewares/sort-field-parser.middleware";
import { checkSchema } from "express-validator";
import * as pokemonsController from "../controllers/pokemons.controller";
import * as pokemonsValidationSchema from "../schema/pokemons.validation";

const router = express.Router();

router.get(
  "/api/v1/pokemons",
  [
    parseSortField,
    validate(checkSchema(pokemonsValidationSchema.listPokemonsSchema)),
  ],
  pokemonsController.list
);

router.get(
  "/api/v2/pokemons",
  [
    parseSortField,
    validate(checkSchema(pokemonsValidationSchema.listPokemonsV2Schema)),
  ],
  pokemonsController.listv2
);

router.get(
  "/api/v1/search",
  validate(checkSchema(pokemonsValidationSchema.searchSchema)),
  pokemonsController.search
);

router.get(
  "/api/v1/pokemons/:id",
  validate(checkSchema(pokemonsValidationSchema.showPokemonDetailSchema)),
  pokemonsController.detail
);

export default router;
