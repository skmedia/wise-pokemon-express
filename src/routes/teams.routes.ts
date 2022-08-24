import express from "express";
import validate from "../middlewares/validate.middleware";
import mustHaveToken from "../middlewares/token.middleware";
import { checkSchema } from "express-validator";
import {
  create,
  detail,
  list,
  assignPokemons,
} from "../controllers/teams.controller";
import {
  createTeamsSchema,
  showTeamDetailSchema,
  assignPokemonsSchema,
  listTeamsSchema,
} from "../schema/teams.validation";

const router = express.Router();

router.post(
  "/api/v1/teams",
  [mustHaveToken, validate(checkSchema(createTeamsSchema))],
  create
);

router.get(
  "/api/v1/teams",
  [mustHaveToken, validate(checkSchema(listTeamsSchema))],
  list
);

router.get(
  "/api/v1/teams/:id",
  [mustHaveToken, validate(checkSchema(showTeamDetailSchema))],
  detail
);

router.post(
  "/api/v1/teams/:id",
  [mustHaveToken, validate(checkSchema(assignPokemonsSchema))],
  assignPokemons
);

export default router;
