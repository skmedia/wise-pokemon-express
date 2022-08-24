import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient({
  // log: ["query", "info", "warn", "error"],
});

async function createOrUpdatePokemon(data: any) {
  const types = data.types.map((t: { type: { name: string } }) => t.type.name);
  const pokemon = await prisma.pokemon.upsert({
    where: {
      name: data.name,
    },
    update: {
      name: data.name,
      types: types,
    },
    create: {
      name: data.name,
      types: types,
    },
  });

  return pokemon;
}

async function findPokemonById(id: number): Promise<any> {
  const pokemon = await prisma.pokemon.findUnique({
    where: {
      id: id,
    },
  });

  return pokemon;
}

async function findAll(sort: {
  field: Prisma.PokemonScalarFieldEnum;
  dir: Prisma.SortOrder;
}): Promise<any> {
  const orderBy: Prisma.PokemonOrderByWithRelationInput = {};
  orderBy[sort.field] = sort.dir;

  const pokemons = await prisma.pokemon.findMany({
    orderBy: orderBy,
  });

  return pokemons;
}

async function findAllv2(
  sort: { field: Prisma.PokemonScalarFieldEnum; dir: Prisma.SortOrder },
  offset: number,
  limit: number
): Promise<any> {
  const orderBy: Prisma.PokemonOrderByWithRelationInput = {};
  orderBy[sort.field] = sort.dir;

  const count = prisma.pokemon.count();
  const pokemons = prisma.pokemon.findMany({
    skip: offset,
    take: limit,
    orderBy: orderBy,
  });

  return await Promise.all([count, pokemons]).then((values: Array<any>) => {
    const [count, pokemons] = values;
    return { count, pokemons };
  });
}

async function search(q: string, limit: number): Promise<any> {
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
            path: "$",
            array_contains: q as string,
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      types: true,
      teams: {
        select: {
          team: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return pokemons;
}

export { findPokemonById, findAll, findAllv2, search, createOrUpdatePokemon };
