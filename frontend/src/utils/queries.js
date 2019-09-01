import gql from 'graphql-tag'

export const returnFields = `
    id
    date
    gamepk
    homeTeam{
      id
      name
    }
    awayTeam {
      id
      name
    }
    park{
      id
      name
    }
    batter {
      id
      player {
        id
        name
        team {
          id
          name
        }
        side
      }
    }
    pitcher {
      id
      player {
        id
        name
        team {
          id
          name
        }
        side
      }
    }
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
    query battedBallsBetweenDates($dateRange: [String], $endCursor: String, $batters: [String], $pitchers: [String]) {
        battedBallsBetweenDates(first: 100, after: $endCursor, dateRange: $dateRange, batters: $batters, pitchers: $pitchers) {
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


export const GET_BATTERS = gql`
    query getBatters($sort: String, $batters: [String]){
      getBatters(sort: $sort, batters: $batters) { 
        edges {
          node {
            player {
              id
              name
              team {
                id
                name
              }
              side
            }
          }
        }
      }
    }    
`;


export const GET_PITCHERS = gql`
    query getPitchers($sort: String, $pitchers: [String]){
        getPitchers(sort: $sort, batters: $pitchers) {
            edges {
                node {
                    player {
                        id
                        name
                        team {
                            id
                            name
                        }
                        side
                    }
                }
            }
        }
    }
`;