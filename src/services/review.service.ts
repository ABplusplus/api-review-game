import { ReviewDTO } from "../dto/review.dto";
//import { Game } from "../models/game.model";
import { Review } from "../models/review.model";
import { notFound } from "../error/NotFoundError";

export class ReviewService {

    public async getAllReviews(): Promise<ReviewDTO[]> {
        return Review.findAll();
        
    }

    public async getReviewById(id: number): Promise<ReviewDTO | null> {
        const review = await Review.findByPk(id);
        if (!review) {
            notFound("Review not found");
        } else {
            return Review.findByPk(id);
        }
    }

    public async createReview(
        game_id: number,
        rating: number,
        review_text: string
    ): Promise<ReviewDTO> {
        return Review.create({ game_id: game_id, rating: rating, review_text: review_text });
    }

    public async updateReview(id: number, game_id: number, rating: number, review_text: string): Promise<ReviewDTO | null> {
        const review = await Review.findByPk(id);
        if (review) {
        if (game_id) review.game_id = game_id;
        if (rating) review.rating = rating;
        if (review_text) review.review_text = review_text;
        await review.save();
        return review;
        }
        else{
        notFound("Review not found");
        }
    }
}

export const reviewService = new ReviewService();