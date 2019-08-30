import gql from 'graphql-tag'

export const returnFields = `
    id
    date
    gamepk
    hometeamid
    hometeamname
    awayteamid
    awayteamname
    parkid
    park
    batterid
    battername
    batside
    batterteamid
    pitcherid
    pitchername
    pitcherteamid
    pitchside
    balls
    strikes
    resultType
    pitchType
    pitchSpeed
    zoneLocationX
    zoneLocationZ
    launchSpeed
    launchVertAng
    launchHorizAng
    landingLocationX
    landingLocationY
    hangTime
`;

export const BATTED_BALLS_QUERY = gql`
    query allBattedBalls($endCursor: String) {
        allBattedBalls(first:100, after: $endCursor){
            edges {
                node {
                    ${returnFields}
                }
                cursor
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }  
`;

export const LAST_BATTED_BALLS = gql`
    query allBattedBalls($endCursor: String) {
        allBattedBalls(last:100, after: $endCursor){
            edges {
                node {
                    ${returnFields}
                }
                cursor
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }  
`;

export const BATTED_BALLS_BETWEEN_DATES = gql`
    query battedBallsBetweenDates($dateRange: [String], $endCursor: String) {
        battedBallsBetweenDates(first: 100, after: $endCursor, dateRange: $dateRange) {
            edges {
                node {
                    ${returnFields}
                }
                cursor
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
`;