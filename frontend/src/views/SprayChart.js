import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import ScatterChart from "recharts/es6/chart/ScatterChart";
import Scatter from "recharts/es6/cartesian/Scatter";
import XAxis from "recharts/es6/cartesian/XAxis";
import YAxis from "recharts/es6/cartesian/YAxis";
import Tooltip from "recharts/es6/component/Tooltip";
import Legend from "recharts/es6/component/Legend";


const useStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(2)
    },
}));

export default function SprayChart(props) {
    const singles = props.data.allBattedBalls.edges.map(edge => {
        let data = {}
        if (edge.node.resultType === "single") {
            data['landingLocationX'] = Number(edge.node.landingLocationX)
            data['landingLocationY'] = Number(edge.node.landingLocationY)
        }
        return data
    });

    const doubles = props.data.allBattedBalls.edges.map(edge => {
        let data = {}
        if (edge.node.resultType === "double") {
            data['landingLocationX'] = Number(edge.node.landingLocationX)
            data['landingLocationY'] = Number(edge.node.landingLocationY)
        }
        return data
    });

    const triples = props.data.allBattedBalls.edges.map(edge => {
        let data = {}
        if (edge.node.resultType === "triple") {
            data['landingLocationX'] = Number(edge.node.landingLocationX)
            data['landingLocationY'] = Number(edge.node.landingLocationY)
        }
        return data
    });

    const homeRuns = props.data.allBattedBalls.edges.map(edge => {
        let data = {}
        if (edge.node.resultType === "home_run") {
            data['landingLocationX'] = Number(edge.node.landingLocationX)
            data['landingLocationY'] = Number(edge.node.landingLocationY)
        }
        return data
    });

    const otherBattedBalls = props.data.allBattedBalls.edges.map(edge => {
        let data = {}
        if (
            edge.node.resultType !== "single" &&
            edge.node.resultType !== "double" &&
            edge.node.resultType !== "triple" &&
            edge.node.resultType !== "home_run"
        ) {
            data['landingLocationX'] = Number(edge.node.landingLocationX)
            data['landingLocationY'] = Number(edge.node.landingLocationY)
        }
        return data
    });


    return (
        <div>
            <Typography align={"center"} variant={"h6"}>Spray Chart</Typography>
            <ScatterChart width={600} height={600}>
                <Legend/>
                <XAxis type={"number"} dataKey={"landingLocationX"}/>
                <YAxis type={"number"} dataKey={"landingLocationY"}/>
                <Tooltip/>
                <Scatter name={"Singles"} data={singles} fill={"yellow"}/>
                <Scatter name={"Doubles"} data={doubles} fill={"green"}/>
                <Scatter name={"Triples"} data={triples} fill={"orange"}/>
                <Scatter name={"Home Runs"} data={homeRuns} fill={"red"}/>
                <Scatter name={"Other"} data={otherBattedBalls} fill={"#ccc"}/>
            </ScatterChart>
        </div>
    )
}
