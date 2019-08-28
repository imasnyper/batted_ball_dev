import React from 'react';
import {Paper} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import {Slider} from "@material-ui/core";
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

    const handleChange = (event, valueTuple) => {
        console.log(event)
        console.log(valueTuple)
        props.onDateRangeChange(valueTuple[0], valueTuple[1])
    }

    const handleDragEnd = () => {
        this.props.update(getDataDateRange(props.data))
    }

    return <Grid container>
        <Slider value={[minDate / 1000, maxDate / 1000]}
                onChange={handleChange}
                onDragEnd={handleDragEnd}
                valueLabelDisplay={"on"}
                min={new Date("2017-04-03") / 1000}
                max={new Date("2017-10-10") / 1000}
                step={86400}
        />
    </Grid>
}

{/*<div onClick={() => props.onDateRangeChange(minDate, maxDate)}>Click to change dates?</div>*/}