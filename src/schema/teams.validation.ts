import { Schema } from "express-validator";
import { findTeamById, findTeamByName } from "./../service/teams.service";

const createTeamsSchema: Schema = {
  name: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "name is mandatory",
      options: { ignore_whitespace: true },
      bail: true,
    },
    custom: {
      options: async (value) => {
        const team = await findTeamByName(String(value));
        if (team) {
          throw new Error("team exists");
        }
      },
    },
  },
};

const showTeamDetailSchema: Schema = {
  id: {
    isInt: {
      errorMessage: "id must be a number",
      bail: true,
    },
    toInt: true,
    in: ["params"],
    notEmpty: {
      errorMessage: "id is mandatory",
      options: { ignore_whitespace: true },
      bail: true,
    },
  },
};

const assignPokemonsSchema: Schema = {
  id: {
    isInt: {
      errorMessage: "id must be a number",
      bail: true,
    },
    toInt: true,
    in: ["params"],
    notEmpty: {
      errorMessage: "id is mandatory",
      options: { ignore_whitespace: true },
      bail: true,
    },
    custom: {
      options: async (value) => {
        try {
          await findTeamById(Number(value));
        } catch (e) {
          throw new Error("team not found");
        }
      },
    },
  },
  pokemons: {
    in: ["body"],
    notEmpty: {
      errorMessage: "pokemons should be a list of pokemon ids",
      options: { ignore_whitespace: true },
      bail: true,
    },
    toArray: true,
    isArray: {
      errorMessage: "pokemons should be a list of max 6 pokemon ids",
      bail: true,
      options: {
        min: 1,
        max: 6,
      },
    },
    custom: {
      bail: true,
      options: async (value) => {
        const unique = Array.from(new Set(value));
        if (unique.length !== value.length) {
          throw new Error("pokemon list not unique");
        }
        if (unique.some((id: unknown) => typeof id !== "number")) {
          throw new Error("all pokemon ids should be a number");
        }
      },
    },
  },
};

const listTeamsSchema: Schema = {
  sort: {
    in: ["query"],
    isIn: {
      errorMessage: "sort is not valid",
      options: [["id-asc", "id-desc", "name-asc", "name-desc"]],
      bail: true,
    },
    notEmpty: {
      errorMessage: "sort is mandatory",
      options: { ignore_whitespace: true },
      bail: true,
    },
  },
};

export {
  createTeamsSchema,
  showTeamDetailSchema,
  assignPokemonsSchema,
  listTeamsSchema,
};
