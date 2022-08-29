import { Prisma, Pokemon } from "@prisma/client";
import prisma from "./../prisma.client";

type PokemonWithoutDetails = Omit<
  Pokemon,
  "createdAt" | "updatedAt" | "details"
>;

type PokemonInListing = {
  id: number;
  name: string;
  types: { type: { name: string }; slot: string };
  sprites: { front_default: string };
};

const pokemonInListingMapper = (
  pokemon: PokemonWithoutDetails
): PokemonInListing => {
  const frontSprite = (pokemon.sprites as { front_default: string })
    .front_default;

  return {
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types as { type: { name: string }; slot: string },
    sprites: {
      front_default: frontSprite,
    },
  };
};

async function findPokemonById(id: number) {
  const pokemon = await prisma.pokemon.findUnique({
    where: {
      id: id,
    },
  });

  if (!pokemon) {
    return null;
  }

  return {
    id: pokemon.id,
    name: pokemon.name,
    ...(pokemon.details as Object),
  };
}

async function findAll(sort: {
  field: Prisma.PokemonScalarFieldEnum;
  dir: Prisma.SortOrder;
}): Promise<PokemonInListing[]> {
  const orderBy: Prisma.PokemonOrderByWithRelationInput = {};
  orderBy[sort.field] = sort.dir;

  const pokemons: PokemonWithoutDetails[] = await prisma.pokemon.findMany({
    select: {
      id: true,
      name: true,
      types: true,
      sprites: true,
    },
    orderBy: orderBy,
  });

  const data = pokemons.map(pokemonInListingMapper);

  return data;
}

async function findAllv2(
  sort: { field: Prisma.PokemonScalarFieldEnum; dir: Prisma.SortOrder },
  offset: number,
  limit: number
): Promise<{ count: number; data: PokemonInListing[] }> {
  const orderBy: Prisma.PokemonOrderByWithRelationInput = {};
  orderBy[sort.field] = sort.dir;

  const count: Promise<number> = prisma.pokemon.count();
  const pokemons: Promise<Pokemon[]> = prisma.pokemon.findMany({
    skip: offset,
    take: limit,
    orderBy: orderBy,
  });

  return Promise.all([count, pokemons]).then((values: [number, Pokemon[]]) => {
    const count: number = values[0];
    const pokemons = values[1];

    const data = pokemons.map(pokemonInListingMapper);

    return { count, data };
  });
}

async function search(q: string, limit: number): Promise<PokemonInListing[]> {
  const pokemons = await prisma.pokemon.findMany({
    take: limit,
    where: {
      OR: [
        {
          name: {
            contains: q as string,
          },
        },
        {
          types: {
            path: "$[*].type.name",
            array_contains: q as string,
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      types: true,
      sprites: true,
    },
  });

  return pokemons.map(pokemonInListingMapper);
}

export { findPokemonById, findAll, findAllv2, search };
