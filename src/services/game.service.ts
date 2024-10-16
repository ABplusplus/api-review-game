import { GameDTO } from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { Review } from "../models/review.model";
import { notFound } from "../error/NotFoundError";


export class GameService {
  public async getAllGames(): Promise<GameDTO[]> {
    return Game.findAll({
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
  }
  

  public async getGameById(id: number): Promise<GameDTO | null> {
    const game = await Game.findByPk(id) 
    if(!game) {
      notFound("Game not found");
    }else{
      return Game.findByPk(id);
    }
  }

  getGamesByConsoleId(id: number): Promise<Console | null> {
    const console = Console.findByPk(id, {
      include: [
        {
          model: Game,
          as: "games",
        },
      ],
    });
    if (!console) {
      notFound("Console not found");
    }
    return console;
  }

  
  public async createGame( title: string, consoleId: number): Promise<GameDTO> {
    return Game.create({ title: title, console_id: consoleId });
  }


  public async updateGame(id: number, title: string, consoleId: number): Promise<GameDTO | null> {
    const game = await Game.findByPk(id);

    const console = await Console.findByPk(consoleId);
    if (!console) {
      throw { status: 400, message: "Invalid Console ID" };
    }
    
    if (game) {
      game.title = title;
      game.console_id = consoleId;
      await game.save();
      return game;
    }
    else{
      notFound("Game not found");
    }
  }
  
  public async deleteGame(id: number): Promise<void> {
    const game = await Game.findByPk(id);
    if (!game) {
      notFound("Game not found");
    }
    const reviews = await Review.findAll({ where: { game_id: id } });
    if (reviews.length > 0) {
      throw {status : 409 , message : "Cannot delete game because reviews exist for this game"};
    }
    await game.destroy();

  }

}

export const gameService = new GameService();
