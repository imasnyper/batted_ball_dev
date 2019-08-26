import gql from 'graphql-tag'

export const BATTED_BALLS_QUERY = gql`
    query allBattedBalls($endCursor: String) {
        allBattedBalls(first:100, after: $endCursor){
            edges {
                node {
                    id
                    date, 
                    gamepk, 
                    hometeamid, 
                    hometeamname, 
                    awayteamid, 
                    awayteamname, 
                    parkid, 
                    park, 
                    batterid, 
                    battername, 
                    batside, 
                    batterteamid, 
                    pitcherid, 
                    pitchername, 
                    pitcherteamid, 
                    pitchside, 
                    balls, 
                    strikes, 
                    resultType, 
                    pitchType, 
                    pitchSpeed, 
                    zoneLocationX, 
                    zoneLocationZ, 
                    launchSpeed, 
                    launchVertAng, 
                    launchHorizAng, 
                    landingLocationX, 
                    landingLocationY, 
                    hangTime
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }  
`;

export default {BATTED_BALLS_QUERY}