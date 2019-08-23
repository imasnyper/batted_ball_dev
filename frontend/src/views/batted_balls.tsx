import { Card, Col, Divider, Icon, Input, Row, Spin } from 'antd'
import {useQuery} from '@apollo/react-hooks'
import React from 'react'
import BATTED_BALLS_QUERY from '../queries'

export default function BattedBalls(props: any) {
    const {loading, error, data} = useQuery(BATTED_BALLS_QUERY);

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error :(</p>

    console.log(data.allBattedBalls.edges)
    // @ts-ignore
    // eslint-disable-next-line array-callback-return
    return data.allBattedBalls.edges.map(({id, pitchername, battername, pitchSpeed, launchSpeed}) => {
        // eslint-disable-next-line no-unused-expressions
        <div key={id}>
            <p>
                Pitcher: {pitchername}
                Batter: {battername}
                Pitch Speed: {pitchSpeed}
                Launch Speed: {launchSpeed}
            </p>
        </div>
    })
}
