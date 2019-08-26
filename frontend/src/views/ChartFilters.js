import React from 'react';
import {Paper} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles(theme => ({
    paper: {
        height: theme.spacing(12),
        backgroundColor: theme.palette.secondary.main
    },
}));

export default function ChartFilter(props) {
    const classes = useStyles()

    return <Grid container>
        <Slider value={[10, 50]}
                valueLabelDisplay={"auto"}
                aria-labelledby={"range-slider"}
        />
    </Grid>
}