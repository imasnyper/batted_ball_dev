import React, {useState} from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import ScatterChart from "recharts/es6/chart/ScatterChart";
import Scatter from "recharts/es6/cartesian/Scatter";
import XAxis from "recharts/es6/cartesian/XAxis";
import YAxis from "recharts/es6/cartesian/YAxis";
import Tooltip from "recharts/es6/component/Tooltip";
import Legend from "recharts/es6/component/Legend";
import { organizeData } from "../utils/utils";


export default function SprayChart(props) {
    const useStyles = makeStyles(theme => ({
        progress: {
            margin: theme.spacing(2)
        },
        chartBackground: {
            backgroundImage: `url("https://prod-gameday.mlbstatic.com/responsive-gameday-assets/1.2.0/images/fields/14.svg")`,
            backgroundSize: "500px 500px",
            backgroundPosition: "91px 40px",
            backgroundRepeat: "no-repeat"
        }
    }));

    const dataBaseName = "landingLocation"
    const [singles, doubles, triples, homeRuns, hitByPitch, outs] = organizeData(props.data, dataBaseName, "Y")
    const classes = useStyles()

    return (
        <div>
            <Typography align={"center"} variant={"h6"}>Spray Chart</Typography>
            <ScatterChart width={600} height={500} className={classes.chartBackground}>
                <Legend/>
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    tick={false}
                    type={"number"}
                    domain={[-300, 300]}
                    dataKey={dataBaseName + "X"}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={false}
                    type={"number"}
                    domain={[0, 500]}
                    dataKey={dataBaseName + "Y"}
                />
                <Tooltip payload={[{battername: 'something'}]} />
                {/*<ReferenceDot x={0} y={0} />*/}
                {/*<ReferenceDot x={-231.931} y={231.931} />*/}
                {/*<ReferenceDot x={231.931} y={231.931} />*/}
                {/*<ReferenceDot x={0} y={400} />*/}
                <Scatter name={"Singles"} data={singles} strokeWidth={1} fill={"yellow"}/>
                <Scatter name={"Doubles"} data={doubles} strokeWidth={1} fill={"green"}/>
                <Scatter name={"Triples"} data={triples} strokeWidth={1} fill={"orange"}/>
                <Scatter name={"Home Runs"} data={homeRuns} strokeWidth={1} fill={"red"}/>
                <Scatter name={"Hit By Pitch"} data={hitByPitch} strokeWidth={1} fill={"pink"}/>
                <Scatter name={"Outs"} data={outs} strokeWidth={1} fill={"#ccc"}/>
            </ScatterChart>
        </div>
    )
}
