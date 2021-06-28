import { gql } from "@apollo/client";

export const Authorize = gql`
 mutation Authorize($credentials: AuthorizeInput){
    authorize(credentials : $credentials){
        accessToken
    }
 }
`;
