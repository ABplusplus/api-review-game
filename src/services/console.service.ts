import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { Review } from "../models/review.model";
import { notFound } from "../error/NotFoundError";


export class ConsoleService {

  public async getAllConsoles(): Promise<Console[]> {
    return await Console.findAll();
  }

  public async getConsoleById(id: number): Promise<Console | null> {
    const console = await Console.findByPk(id);
    if (!console) {
      notFound("Console not found");
    }
    else {
      return Console.findByPk(id);    }
  }

  public async createConsole(
    name: string,
    manufacturer: string
  ): Promise<Console> {
    return Console.create({ name: name, manufacturer: manufacturer });
  }

  
  public async deleteConsole(id: number): Promise<void> {
    const console = await Console.findByPk(id);
    if (!console) {
      notFound("Console not found");
    }
    
    const games = await Game.findAll({
       where: {
         console_id: id 
        } 
      });
    
    
    const gameIds = games.map(game => game.id);
    const reviews = await Review.findAll({
       where: { 
        game_id: gameIds
       } 
      });
  
    if (reviews.length > 0) {
      throw {status : 409 , message : "Cannot delete game because reviews exist for this game"};
    }
  
    
    await console.destroy();
  
  }

  // Met à jour une console
  public async updateConsole(
    id: number,
    name?: string,
    manufacturer?: string
  ): Promise<Console | null> {
    const console = await Console.findByPk(id);
    if (console) {
      if (name) console.name = name;
      if (manufacturer) console.manufacturer = manufacturer;
      await console.save();
      return console;
    }
    else{
      notFound("Console not found");
    }
  }

}

export const consoleService = new ConsoleService();
