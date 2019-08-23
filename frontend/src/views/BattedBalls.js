import { Card, Col, Divider, Icon, Input, Row, Spin } from 'antd'
import {useQuery} from '@apollo/react-hooks'
import React from 'react'
import BATTED_BALLS_QUERY from '../queries'

export default function BattedBalls(props) {
    const {loading, error, data} = useQuery(BATTED_BALLS_QUERY);

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error :(</p>

    console.log(data.allBattedBalls.edges[0])
    // @ts-ignore
    // eslint-disable-next-line array-callback-return
    return data.allBattedBalls.edges.map(({node}) => {
        // eslint-disable-next-line no-unused-expressions
        <div key={node.id}>
            <p>
                Pitcher: {node.pitchername}
                Batter: {node.battername}
                Pitch Speed: {node.pitchSpeed}
                Launch Speed: {node.launchSpeed}
            </p>
        </div>
    })
}
