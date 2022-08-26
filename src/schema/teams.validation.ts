import { Schema } from "express-validator";
import { findTeamById } from "./../service/teams.service";

// The location of the field, can be one or more of body, cookies, headers,
// params or query.
// If omitted, all request locations will be checked

const createTeamsSchema: Schema = {
  name: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "name is mandatory",
      options: { ignore_whitespace: true },
      bail: true,
    },
  },
};

const showTeamDetailSchema: Schema = {
  id: {
    in: ["params"],
    notEmpty: {
      errorMessage: "id is mandatory",
      options: { ignore_whitespace: true },
      bail: true,
    },
    custom: {
      options: async (value) => {
        const team = await findTeamById(Number(value));
        if (!team) {
          return Promise.reject("team not found");
        }
      },
    },
    isInt: true,
    toInt: true,
  },
};

const assignPokemonsSchema: Schema = {
  id: {
    in: ["params"],
    notEmpty: {
      errorMessage: "id is mandatory",
      options: { ignore_whitespace: true },
      bail: true,
    },
    custom: {
      options: async (value) => {
        const team = await findTeamById(Number(value));
        if (!team) {
          return Promise.reject("team not found");
        }
      },
    },
    isInt: true,
    toInt: true,
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
