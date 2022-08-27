import { PokemonFromApi } from "../types/pokemon-from-api";
import prisma from "./../prisma.client";

function createDetails(pokemon: PokemonFromApi) {
  const {
    back_default,
    back_female,
    back_shiny,
    back_shiny_female,
    front_default,
    front_female,
    front_shiny,
    front_shiny_female,
  } = pokemon.sprites;
  const sprites = {
    back_default,
    back_female,
    back_shiny,
    back_shiny_female,
    front_default,
    front_female,
    front_shiny,
    front_shiny_female,
  };

  return {
    weight: pokemon.weight,
    height: pokemon.height,
    order: pokemon.order,
    species: pokemon.species.name,
    sprites: sprites,
    form: pokemon.forms.shift()?.name,
    moves: pokemon.moves.map((move) => {
      return {
        move: move.move.name,
        version_group_details: move.version_group_details.map((vgd) => {
          return {
            level_learned_at: vgd.level_learned_at,
            move_learn_method: vgd.move_learn_method.name,
            version_group: vgd.version_group.name,
          };
        }),
      };
    }),
    types: pokemon.types.map((type) => {
      return {
        type: {
          name: type.type.name,
        },
        slot: type.slot,
      };
    }),
    abilities: pokemon.abilities.map((ability) => {
      return {
        ability: ability.ability.name,
        is_hidden: ability.is_hidden,
        slot: ability.slot,
      };
    }),
    stats: pokemon.stats.map((stat) => {
      return {
        base_stat: stat.base_stat,
        effort: stat.effort,
        stat: stat.stat.name,
      };
    }),
  };
}

async function createOrUpdatePokemon(data: PokemonFromApi) {
  const details = createDetails(data);

  const pokemon = await prisma.pokemon.upsert({
    where: {
      id: data.id,
    },
    update: {
      name: data.name,
      types: details.types,
      sprites: details.sprites,
      details: details,
    },
    create: {
      id: data.id,
      name: data.name,
      types: details.types,
      sprites: details.sprites,
      details: details,
    },
  });

  return pokemon;
}

export default createOrUpdatePokemon;
