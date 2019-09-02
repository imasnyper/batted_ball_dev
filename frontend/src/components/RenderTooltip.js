import Paper from "@material-ui/core/Paper";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {convertKeyForDisplay, convertStringForDisplay} from "../utils/utils";


const useStyles = makeStyles(theme => ({
    paper: {
       padding: "6px 6px 6px 6px"
    },
    p: {
        textTransform: "capitalize",
        fontSize: "10px"
    }
}));

export default function RenderTooltip(props) {
    const classes = useStyles()
    const {active} = props

    if (active) {
        const kvPairs = Object.entries(props.payload[0].payload)
        return <Paper className={classes.paper}>

            {kvPairs.map((pair, index) => (
                <p key={index} className={classes.p}>
                    {convertKeyForDisplay(pair[0])}: {convertStringForDisplay(pair[1])}
                </p>
            ))}
        </Paper>
    }
    return null
}