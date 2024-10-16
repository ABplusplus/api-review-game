import { Controller, Get, Post, Body, Patch, Delete, Route, Tags } from "tsoa";
import { ReviewDTO } from "../dto/review.dto";
import { reviewService } from "../services/review.service";
@Route("reviews")
@Tags("Reviews")


export class ReviewController extends Controller {

    @Get("/")
    public async getAllReviews(): Promise<ReviewDTO[]> {
        return reviewService.getAllReviews();
    }

    @Get("{id}")
    public async getReviewById(id: number): Promise<ReviewDTO | null> {
        return reviewService.getReviewById(id);
    }

    @Post("/")
    public async createReview(
        @Body() requestBody: ReviewDTO
    ): Promise<ReviewDTO> {
        const { game_id, rating, review_text } = requestBody;
        return reviewService.createReview(game_id, rating, review_text);
    }

    @Patch("{id}")
    public async updateReview(
        @Body() requestBody: ReviewDTO,
        id: number
    ): Promise<ReviewDTO | null> {
        const { game_id, rating, review_text } = requestBody;
        return reviewService.updateReview(id, game_id, rating, review_text);
    }

    @Delete("{id}")
    public async deleteReview(id: number): Promise<void> {
        await reviewService.deleteReview(id);
    }

}



