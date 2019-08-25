import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import ScatterChart from "recharts/es6/chart/ScatterChart";
import XAxis from "recharts/es6/cartesian/XAxis";
import YAxis from "recharts/es6/cartesian/YAxis";
import Tooltip from "recharts/es6/component/Tooltip";
import Scatter from "recharts/es6/cartesian/Scatter";
import Legend from "recharts/es6/component/Legend";
import CartesianGrid from "recharts/es6/cartesian/CartesianGrid";

const useStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(2)
    },
}));

export default function ZonePlot(props) {
    const singles = props.data.allBattedBalls.edges.map(edge => {
        let data = {}
        if (edge.node.resultType === "single") {
            data['zoneLocationX'] = Number(edge.node.zoneLocationX)
            data['zoneLocationZ'] = Number(edge.node.zoneLocationZ)
        }
        return data
    });

    const doubles = props.data.allBattedBalls.edges.map(edge => {
        let data = {}
        if (edge.node.resultType === "double") {
            data['zoneLocationX'] = Number(edge.node.zoneLocationX)
            data['zoneLocationZ'] = Number(edge.node.zoneLocationZ)
        }
        return data
    });

    const triples = props.data.allBattedBalls.edges.map(edge => {
        let data = {}
        if (edge.node.resultType === "triple") {
            data['zoneLocationX'] = Number(edge.node.zoneLocationX)
            data['zoneLocationZ'] = Number(edge.node.zoneLocationZ)
        }
        return data
    });

    const homeRuns = props.data.allBattedBalls.edges.map(edge => {
        let data = {}
        if (edge.node.resultType === "home_run") {
            data['zoneLocationX'] = Number(edge.node.zoneLocationX)
            data['zoneLocationZ'] = Number(edge.node.zoneLocationZ)
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
            data['zoneLocationX'] = Number(edge.node.zoneLocationX)
            data['zoneLocationZ'] = Number(edge.node.zoneLocationZ)
        }
        return data
    });

    return (
        <div>
            <Typography align={"center"} variant={"h6"}>Zone Plot</Typography>
            <ScatterChart width={600} height={600}>
                <Legend/>
                <CartesianGrid/>
                <XAxis type={"number"} domain={[-3, 3]} ticks={[-3, -2, -1, 0, 1, 2, 3]} dataKey={"zoneLocationX"}/>
                <YAxis type={"number"} domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} dataKey={"zoneLocationZ"}/>
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
