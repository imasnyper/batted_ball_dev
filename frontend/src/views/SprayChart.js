import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import ScatterChart from "recharts/es6/chart/ScatterChart";
import Scatter from "recharts/es6/cartesian/Scatter";
import XAxis from "recharts/es6/cartesian/XAxis";
import YAxis from "recharts/es6/cartesian/YAxis";
import Tooltip from "recharts/es6/component/Tooltip";
import Legend from "recharts/es6/component/Legend";
import { organizeData } from "../utils/utils";
import RenderTooltip from "../components/RenderTooltip"
import {CartesianGrid, ReferenceDot} from "recharts";


export default function SprayChart(props) {
    const useStyles = makeStyles(theme => ({
        progress: {
            margin: theme.spacing(2)
        },
        chartBackground: {
            backgroundImage: `url("https://prod-gameday.mlbstatic.com/responsive-gameday-assets/1.2.0/images/fields/13.svg")`,
            backgroundSize: "440px 440px",
            backgroundPosition: "110px 20px",
            backgroundRepeat: "no-repeat",
        },
        noSelect: {
            userSelect: "none",
        },
        paper: {
            padding: "3px 6px"
        }
    }));

    const dataBaseName = "landingLocation"
    const propsData = props.data
    const [singles, doubles, triples, homeRuns, hitByPitch, outs, sac_fly] = organizeData(propsData, dataBaseName, "Y")
    const classes = useStyles()


    return (
        <div>
            <Typography className={classes.noSelect} align={"center"} variant={"h6"}>Spray Chart</Typography>
            <ScatterChart width={600} height={600} className={classes.chartBackground}>
                <Legend />
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    tick={false}
                    type="number"
                    scale="linear"
                    domain={[-350, 350]}
                    dataKey={dataBaseName + "X"}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={false}
                    type="number"
                    scale="linear"
                    domain={[-200, 500]}
                    dataKey={dataBaseName + "Y"}
                />
                <Tooltip
                    content={<RenderTooltip />}
                    viewBox={{x: 0, y: 500}}
                />
                {/*<ReferenceDot x={0} y={0} />*/}
                {/*<ReferenceDot x={-231.931} y={231.931} />*/}
                {/*<ReferenceDot x={231.931} y={231.931} />*/}
                {/*<ReferenceDot x={0} y={400} />*/}
                <Scatter name={"Singles"} data={singles} fill={"yellow"}/>
                <Scatter name={"Doubles"} data={doubles} fill={"green"}/>
                <Scatter name={"Triples"} data={triples} fill={"orange"}/>
                <Scatter name={"Home Runs"} data={homeRuns} fill={"red"}/>
                <Scatter name={"Hit By Pitch"} data={hitByPitch} fill={"pink"}/>
                <Scatter name={"Outs"} data={outs} fill={"#ccc"}/>
                <Scatter name={"Sac Flies"} data={sac_fly} fill={"purple"}/>
                {/*<Scatter*/}
                {/*    name={"Foul Lines"}*/}
                {/*    data={[*/}
                {/*        {"landingLocationX": -341.641, "landingLocationY": 341.641},*/}
                {/*        {"landingLocationX": 0, "landingLocationY": 0},*/}
                {/*        {"landingLocationX": 341.641, "landingLocationY": 341.641}*/}
                {/*    ]}*/}
                {/*    line*/}
                {/*    fill={"#000"}*/}
                {/*/>*/}
            </ScatterChart>
        </div>
    )
}
