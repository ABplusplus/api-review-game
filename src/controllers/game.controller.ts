import { Body, Controller, Get, Patch, Post, Delete, Route, Tags } from "tsoa";
import { GameDTO } from "../dto/game.dto";
import { gameService } from "../services/game.service";
import { reviewService } from "../services/review.service";
import { ReviewDTO } from "../dto/review.dto";

@Route("games")
@Tags("Games")
export class GameController extends Controller  {
  @Get("/")
  public async getAllGames(): Promise<GameDTO[]> {
    return gameService.getAllGames();
  }

  @Get("{id}")
  public async getGameById(id: number): Promise<GameDTO | null> {
    return gameService.getGameById(id);
  }
  
  @Get("{id}/reviews")
  public async getReviewsByGameId(id: number): Promise< ReviewDTO[] | null> {
    return reviewService.getReviewsByGameId(id);
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


  @Delete("{id}")
  public async deleteGame(id: number): Promise<void> {
    await gameService.deleteGame(id);
  }
}

