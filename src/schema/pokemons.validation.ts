import { Schema } from "express-validator";
import { findPokemonById } from "./../service/pokemons.service";

const showPokemonDetailSchema: Schema = {
  id: {
    in: ["params"],
    notEmpty: {
      errorMessage: "id is mandatory",
      options: { ignore_whitespace: true },
      bail: true,
    },
    custom: {
      options: async (value) => {
        const team = await findPokemonById(Number(value));
        if (!team) {
          return Promise.reject("Pokemon does not exist");
        }
      },
    },
    isInt: true,
    toInt: true,
  },
};

const listPokemonsSchema: Schema = {
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

const listPokemonsV2Schema: Schema = {
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
  limit: {
    in: ["query"],
    notEmpty: {
      errorMessage: "limit is mandatory",
      options: { ignore_whitespace: true },
      bail: true,
    },
    isInt: true,
    toInt: true,
  },
  offset: {
    in: ["query"],
    notEmpty: {
      errorMessage: "offset is mandatory",
      options: { ignore_whitespace: true },
      bail: true,
    },
    isInt: true,
    toInt: true,
  },
};

const searchSchema: Schema = {
  query: {
    in: ["query"],
    notEmpty: {
      errorMessage: "query is mandatory",
      options: { ignore_whitespace: true },
      bail: true,
    },
  },
  limit: {
    in: ["query"],
    notEmpty: {
      errorMessage: "limit is mandatory",
      bail: true,
    },
    isInt: true,
    toInt: true,
  },
};

export {
  showPokemonDetailSchema,
  listPokemonsSchema,
  listPokemonsV2Schema,
  searchSchema,
};
