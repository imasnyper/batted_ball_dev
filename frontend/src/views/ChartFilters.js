import React, {useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import BatterFilter from "../components/BatterFilter";
import PitcherFilter from "../components/PitcherFilter";
import {Typography} from "@material-ui/core";
import {convertDateRange} from "../utils/utils";
import PitcherTeamFilter from "../components/PitchingTeamFilter";
import BatterTeamFilter from "../components/BattingTeamFilter";
import ResultTypeFilter from "../components/ResultTypeFilter";

const createSliderWithTooltip = Slider.createSliderWithTooltip
const Range = createSliderWithTooltip(Slider.Range)

const useStyles = makeStyles(theme => ({
    noSelect: {
        userSelect: "none",
    },
    filters: {
        padding: "0 3% 0 3%"
    }
}));

const dateToString = (date) => {
    return date.toISOString().split("T")[0]
};

const valueToDate = (value) => {
    return dateToString(new Date(value * 1000))
};

export default function ChartFilter(props) {
    const classes = useStyles()

    const [[minDate, maxDate], setDateRange] = useState(props.dateRange)

    const handleDateChange = (valueTuple) => {
        props.onDateRangeChange(valueTuple[0] * 1000, valueTuple[1] * 1000)
    };

    const handleMove = (valueTuple) => {
        let [minDate, maxDate] = valueTuple
        minDate *= 1000;
        maxDate *= 1000;
        setDateRange(convertDateRange([minDate, maxDate]))
    };

    const handleBatterChange = (batters) => {
        props.onBatterChange(batters)
    };

    const handlePitcherChange = (pitcher) => {
        props.onPitcherChange(pitcher)
    };

    const handleBatterTeamChange = (batterTeams) => {
        props.onBatterTeamChange(batterTeams)
    };

    const handlePitcherTeamChange = (pitcherTeams) => {
        props.onPitcherTeamChange(pitcherTeams)
    };

    const handleResultTypeChange = (resultTypes) => {
        props.onResultTypeChange(resultTypes)
    };

    return <Grid className={classes.filters} container justify="center">
        <Grid container>
            <Typography className={classes.noSelect} variant="subtitle1">Date Range: {valueToDate(new Date(minDate) / 1000)} - {valueToDate(new Date(maxDate) / 1000)}</Typography>
            <Range defaultValue={[new Date(minDate) / 1000, new Date(maxDate) / 1000]}
                   min={new Date("2017-04-03") / 1000}
                   max={new Date("2017-10-02") / 1000}
                   step={86400}
                   pushable={86400}
                   trackStyle={[{backgroundColor: '#e8291c'}]}
                   handleStyle={[{backgroundColor: '#134a8e', border: 'solid 1px #134a8e'}]}
                   onChange={values => handleMove(values)}
                   onAfterChange={values => handleDateChange(values)}
                   tipFormatter={value => `${valueToDate(value)}`}
                   className={classes.range}
            />
        </Grid>
        <Grid container justify="center">
            <Grid item>
                <BatterFilter
                    onBatterChange={handleBatterChange}
                    data={props.data}
                    batters={props.batters}
                />
            </Grid>
            <Grid item>
                <PitcherFilter
                    onPitcherChange={handlePitcherChange}
                    data={props.data}
                    pitchers={props.pitchers}
                />
            </Grid>
            <Grid item>
                <ResultTypeFilter
                    onResultTypeChange={handleResultTypeChange}
                    data={props.data}
                    resultTypes={props.resultTypes}
                />
            </Grid>
            <Grid item>
                <BatterTeamFilter
                    onBatterTeamChange={handleBatterTeamChange}
                    data={props.data}
                    batterTeams={props.batterTeams}
                />
            </Grid>
            <Grid item>
                <PitcherTeamFilter
                    onPitcherTeamChange={handlePitcherTeamChange}
                    data={props.data}
                    pitcherTeams={props.pitcherTeams}
                />
            </Grid>
        </Grid>
    </Grid>
}