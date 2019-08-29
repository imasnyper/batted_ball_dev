import React from 'react';
import {Paper} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import {getDataDateRange} from "../utils/utils";
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip'
import 'rc-slider/assets/index.css'

const createSliderWithTooltip = Slider.createSliderWithTooltip
const Range = createSliderWithTooltip(Slider.Range)
const Handle = Slider.Handle

const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={true}
            placement={"top"}
            key={index}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    )
}

const useStyles = makeStyles(theme => ({
    paper: {
        height: theme.spacing(12),
        backgroundColor: theme.palette.secondary.main
    },
}));

export default function ChartFilter(props) {
    console.log(props.data)
    const classes = useStyles()
    let [minDate, maxDate] = getDataDateRange(props.data)

    minDate = new Date(minDate)
    maxDate = new Date(maxDate)

    const handleChange = (valueTuple) => {
        props.onDateRangeChange(valueTuple[0] * 1000, valueTuple[1] * 1000)
    }

    return <Grid container>
        <Range defaultValue={[minDate / 1000, maxDate / 1000]}
               min={new Date("2017-04-03") / 1000}
               max={new Date("2017-10-10") / 1000}
               step={86400}
               onAfterChange={values => handleChange(values)}
               tipFormatter={value => `${new Date(value * 1000)}`}
        />
    </Grid>
}

{/*<div onClick={() => props.onDateRangeChange(minDate, maxDate)}>Click to change dates?</div>*/}