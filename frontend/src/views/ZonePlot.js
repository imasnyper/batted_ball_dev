import React, {useState} from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import ScatterChart from "recharts/es6/chart/ScatterChart";
import XAxis from "recharts/es6/cartesian/XAxis";
import YAxis from "recharts/es6/cartesian/YAxis";
import Tooltip from "recharts/es6/component/Tooltip";
import Scatter from "recharts/es6/cartesian/Scatter";
import Legend from "recharts/es6/component/Legend";
import CartesianGrid from "recharts/es6/cartesian/CartesianGrid";
import ReferenceArea from "recharts/es6/cartesian/ReferenceArea";
import {organizeData} from "../utils/utils";
import RenderTooltip from "../components/RenderTooltip";

const useStyles = makeStyles(theme => ({
    noSelect: {
        userSelect: "none",
    }
}));

export default function ZonePlot(props) {
    const classes = useStyles()
    const dataBaseName = "zoneLocation"
    const [singles, doubles, triples, homeRuns, hitByPitch, outs, sacFly] = organizeData(props.data, dataBaseName, "Z")

    return (
        <div>
            <Typography className={classes.noSelect} align={"center"} variant={"h6"}>Zone Plot</Typography>
            <ScatterChart width={600} height={600}>
                <Legend/>
                <CartesianGrid/>
                <XAxis type={"number"} domain={[-3, 3]} ticks={[-3, -2, -1, 0, 1, 2, 3]} dataKey={"zoneLocationX"}/>
                <YAxis type={"number"} domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} dataKey={"zoneLocationZ"}/>
                <Tooltip content={<RenderTooltip />}/>
                <ReferenceArea x1={-1} x2={1} y1={1.5} y2={3.5}/>
                <Scatter name={"Singles"} data={singles} fill={"yellow"}/>
                <Scatter name={"Doubles"} data={doubles} fill={"green"}/>
                <Scatter name={"Triples"} data={triples} fill={"orange"}/>
                <Scatter name={"Home Runs"} data={homeRuns} fill={"red"}/>
                <Scatter name={"Hit By Pitch"} data={hitByPitch} fill={"pink"}/>
                <Scatter name={"Outs"} data={outs} fill={"#ccc"}/>
                <Scatter name={"Sac Flies"} data={sacFly} fill={"purple"}/>
            </ScatterChart>
        </div>
    )
}
