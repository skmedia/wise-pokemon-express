import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type TeamWithPokemons = Prisma.PromiseReturnType<typeof findTeamWithPokemons>;

async function findTeamWithPokemons(id: number) {
  const team = await prisma.team.findUniqueOrThrow({
    include: {
      pokemons: true,
    },
    where: {
      id: id,
    },
  });

  return team;
}

async function createTeam(teamToAdd: any): Promise<any> {
  const team = await prisma.team.upsert({
    where: {
      name: teamToAdd.name,
    },
    update: {
      name: teamToAdd.name,
    },
    create: {
      name: teamToAdd.name,
    },
  });

  return team;
}

async function findTeamById(id: number): Promise<any> {
  const team = await prisma.team.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      pokemons: {
        select: {
          pokemon: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (team) {
    return {
      id: team.id,
      name: team.name,
      pokemons: team.pokemons.map((p) => p.pokemon.name),
    };
  }

  return team;
}

async function findAll(): Promise<any> {
  const teams = await prisma.team.findMany();

  return teams;
}

const assignPokemonsToTeam = async (
  id: number,
  pokemons: number[]
): Promise<any> => {
  const team: TeamWithPokemons = await findTeamById(id);

  await prisma.team.update({
    data: {
      pokemons: {
        deleteMany: team.pokemons.map(({ teamId, pokemonId }) => {
          return {
            pokemonId: pokemonId,
            teamId: teamId,
          };
        }),
        createMany: {
          skipDuplicates: true,
          data: pokemons.map((id) => {
            return { pokemonId: id };
          }),
        },
      },
    },
    where: {
      id: id,
    },
  });

  return findTeamById(id);
};

export { createTeam, findTeamById, findAll, assignPokemonsToTeam };
