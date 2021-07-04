import { gql } from "@apollo/client";
import { REVIEW_POST_FRAGMENT } from "./fragments";

export const AUTHORIZE = gql`
 mutation Authorize($credentials: AuthorizeInput){
    authorize(credentials : $credentials){
        accessToken
    }
 }
`;

export const CREATE_REVIEW = gql`
mutation CreateReview($review: CreateReviewInput){
    createReview(review: $review){
        ...ReviewCore
    }
}
${REVIEW_POST_FRAGMENT}
`;
