import { gql } from "@apollo/client";
import { REVIEW_POST_FRAGMENT } from "./fragments";
import { USER_CORE } from "./fragments";

export const AUTHORIZE = gql`
  mutation Authorize($credentials: AuthorizeInput) {
    authorize(credentials: $credentials) {
      user{
        username
      }
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      ...ReviewCore
    }
  }
  ${REVIEW_POST_FRAGMENT}
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      ...UserDetails
    }
  }
  ${USER_CORE}
`;
