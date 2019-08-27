import React from 'react';
import {Paper} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import {getDataDateRange} from "../utils/utils";

const useStyles = makeStyles(theme => ({
    paper: {
        height: theme.spacing(12),
        backgroundColor: theme.palette.secondary.main
    },
}));

export default function ChartFilter(props) {
    const classes = useStyles()
    const [minDate, maxDate] = getDataDateRange(props.data)

    console.log(minDate + ", " + maxDate);

    const handleChange = (event, valueTuple) => {
        props.onDateRangeChange(valueTuple[0], valueTuple[1])
    }

    return <Grid container>

        <Slider value={[minDate, maxDate]}
                valueLabelDisplay={"auto"}
                aria-labelledby={"range-slider"}
                onChange={handleChange}
        />
    </Grid>
}