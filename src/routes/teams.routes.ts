import express from "express";
import validate from "../middlewares/validate.middleware";
import mustHaveToken from "../middlewares/token.middleware";
import { checkSchema } from "express-validator";
import * as teamsController from "../controllers/teams.controller";
import * as teamsValidationSchema from "../schema/teams.validation";

const router = express.Router();

router.post(
  "/api/v1/teams",
  [
    mustHaveToken,
    validate(checkSchema(teamsValidationSchema.createTeamsSchema)),
  ],
  teamsController.create
);

router.get(
  "/api/v1/teams",
  [mustHaveToken, validate(checkSchema(teamsValidationSchema.listTeamsSchema))],
  teamsController.list
);

router.get(
  "/api/v1/teams/:id",
  [
    mustHaveToken,
    validate(checkSchema(teamsValidationSchema.showTeamDetailSchema)),
  ],
  teamsController.detail
);

router.post(
  "/api/v1/teams/:id",
  [
    mustHaveToken,
    validate(checkSchema(teamsValidationSchema.assignPokemonsSchema)),
  ],
  teamsController.assignPokemons
);

export default router;
