import gql from 'graphql-tag'

export const BATTED_BALLS_QUERY = gql`
    {
        allBattedBalls(first:100) {
            edges {
                node {
                    id
                    battername
                    pitchername
                    date
                    resultType
                    pitchSpeed
                    pitchType
                    launchSpeed
                    landingLocationX
                    landingLocationY
                    zoneLocationX
                    zoneLocationZ
                }
            }
        }
    }  
`;

export default {BATTED_BALLS_QUERY}