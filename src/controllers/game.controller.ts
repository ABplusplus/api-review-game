import { Body, Controller, Get, Patch, Post, Route, Tags } from "tsoa";
import { GameDTO } from "../dto/game.dto";
import { gameService } from "../services/game.service";

@Route("games")
@Tags("Games")
export class GameController extends Controller {
  @Get("/")
  public async getAllGames(): Promise<GameDTO[]> {
    return gameService.getAllGames();
  }

  @Get("{id}")
  public async getGameById(id: number): Promise<GameDTO | null> {
    return gameService.getGameById(id);
  }
  
  
  @Post("/")
  public async createGame(
    @Body() requestBody: GameDTO
  ): Promise<GameDTO> {
    const { title, console } = requestBody;
    if (!console || typeof console.id !== 'number') {
      let err =new Error("Console ID is required and must be a number");
      (err as any).status = 400;
      throw err;
    }
    return gameService.createGame(title, console.id); 
  }


  @Patch("{id}")
  public async updateGame(
    @Body() requestBody: GameDTO,
    @Patch() id: number
  ): Promise<GameDTO | null> {
    const { title, console } = requestBody;
    if (!console || typeof console.id !== 'number') {
      let err =new Error("Console ID is required and must be a number");
      (err as any).status = 400;
      throw err;
    }
    return gameService.updateGame(id, title, console.id);
  }

}

