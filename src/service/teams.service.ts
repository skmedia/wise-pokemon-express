import { PrismaClient, Team, PokemonsOnTeams } from "@prisma/client";

const prisma = new PrismaClient();

type TeamWithPokemonsRelation = Team & {
  pokemons: PokemonsOnTeams[];
};

type TeamWithPokemonIds = {
  id: number;
  name: string;
  pokemons: number[];
};

const teamWithPokemonsMapper = (
  team: TeamWithPokemonsRelation
): TeamWithPokemonIds => {
  return {
    id: team.id,
    name: team.name,
    pokemons: team.pokemons.map((p: PokemonsOnTeams) => p.pokemonId),
  };
};

async function createTeam(teamToAdd: { name: string }): Promise<Team> {
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

async function findTeamById(id: number): Promise<TeamWithPokemonIds | null> {
  const team = await prisma.team.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      pokemons: true,
    },
  });

  if (team) {
    return teamWithPokemonsMapper(team);
  }

  return null;
}

async function findAll(): Promise<TeamWithPokemonIds[]> {
  const teams: TeamWithPokemonsRelation[] = await prisma.team.findMany({
    include: {
      pokemons: true,
    },
  });

  return teams.map(teamWithPokemonsMapper);
}

const assignPokemonsToTeam = async (
  id: number,
  pokemons: number[]
): Promise<TeamWithPokemonIds | null> => {
  const team: TeamWithPokemonsRelation = await prisma.team.findFirstOrThrow({
    include: {
      pokemons: true,
    },
    where: { id: id },
  });

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
