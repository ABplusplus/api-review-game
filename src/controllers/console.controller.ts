import { Controller, Get, Post, Delete, Route, Path, Body, Tags, Patch } from "tsoa";
import { consoleService } from "../services/console.service";
import { ConsoleDTO } from "../dto/console.dto";
import { gameService } from "../services/game.service";


@Route("consoles")
@Tags("Consoles")
export class ConsoleController extends Controller {

  @Get("/")
  public async getAllConsole(): Promise<ConsoleDTO[]> {
    return consoleService.getAllConsoles();
  }


  @Get("{id}")
  public async getConsoleById(@Path() id: number): Promise<ConsoleDTO | null> {
    return consoleService.getConsoleById(id);
  }

  @Get("{id}/games")
  public async getGamesByConsoleId(@Path() id: number): Promise<ConsoleDTO | null> {
    return gameService.getGamesByConsoleId(id);
  }

  @Post("/")
  public async createConsole(
    @Body() requestBody: ConsoleDTO
  ): Promise<ConsoleDTO> {
    const { name, manufacturer } = requestBody;
    return consoleService.createConsole(name, manufacturer);
  }
  

  @Delete("{id}")
  public async deleteConsole(@Path() id: number): Promise<void> {
    await consoleService.deleteConsole(id);
  }


  @Patch("{id}")
  public async updateConsole(
    @Path() id: number,
    @Body() requestBody: ConsoleDTO
  ): Promise<ConsoleDTO | null> {
    const { name, manufacturer } = requestBody;
    return consoleService.updateConsole(id, name, manufacturer);
  }


}