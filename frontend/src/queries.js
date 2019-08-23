import gql from 'graphql-tag'

export const BATTED_BALLS_QUERY = gql`
    {
        allBattedBalls(first: 50) {
            edges {
                node {
                    id
                    battername
                    pitchername
                    date
                    pitchSpeed
                    launchSpeed
                }
            }
        }
    }
`

export default BATTED_BALLS_QUERY