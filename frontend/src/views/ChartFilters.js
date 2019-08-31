import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip'
import 'rc-slider/assets/index.css'
import BatterFilter from "../components/BatterFilter";
import {useQuery} from "@apollo/react-hooks";
import {ALL_BATTERS} from "../queries";

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
    const classes = useStyles()
    let [minDate, maxDate] = props.dateRange

    minDate = new Date(minDate)
    maxDate = new Date(maxDate)

    const handleDateChange = (valueTuple) => {
        props.onDateRangeChange(valueTuple[0] * 1000, valueTuple[1] * 1000)
    }

    const handleBatterChange = (batters) => {
        props.onBatterChange(batters)
    }

    return <Grid container>
        <Range defaultValue={[minDate / 1000, maxDate / 1000]}
               min={new Date("2017-04-03") / 1000}
               max={new Date("2017-10-10") / 1000}
               step={86400}
               onAfterChange={values => handleDateChange(values)}
               tipFormatter={value => `${new Date(value * 1000)}`}
        />
        <BatterFilter
            apolloClient={props.apolloClient}
            onBatterChange={handleBatterChange}
            data={props.data}
            batters={props.batters}
        />
        <p># Batted Balls Loaded: {props.data.battedBallsBetweenDates.edges.length}</p>
    </Grid>
}