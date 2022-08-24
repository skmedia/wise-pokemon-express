import { Request, Response, NextFunction } from "express";
import * as teamsService from "../service/teams.service";

interface PokemonInput {
  name: string;
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const teamToAdd: PokemonInput = req.body;
    const team = await teamsService.createTeam(teamToAdd);
    res.json(team);
  } catch (err) {
    console.error(`Error`);
    next(err);
  }
}

async function detail(req: Request, res: Response, next: NextFunction) {
  try {
    const team = await teamsService.findTeamById(Number(req.params.id));

    res.json(team);
  } catch (err) {
    console.error(`Error`);
    next(err);
  }
}

async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const teams = await teamsService.findAll();

    res.json(teams);
  } catch (err) {
    console.error(`Error`);
    next(err);
  }
}

async function assignPokemons(req: Request, res: Response, next: NextFunction) {
  try {
    const team = await teamsService.assignPokemonsToTeam(
      Number(req.params.id),
      req.body.pokemons
    );
    res.json(team);
  } catch (err) {
    console.error(`Error`);
    next(err);
  }
}

export { create, detail, list, assignPokemons };
