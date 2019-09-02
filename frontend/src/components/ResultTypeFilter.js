import {getPlayerNames, getResultTypes, RESULT_TYPES, splitUnderScoredString} from "../utils/utils";
import React, {useState} from "react";
import {GET_RESULT_TYPES} from "../utils/queries";
import {useQuery} from "@apollo/react-hooks";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        }
    }
};


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 260,
        maxWidth: 260,
    },
    noSelect: {
        userSelect: "none",
    },
    capitalize: {
        textTransform: "capitalize",
    }
}));

export default function ResultTypeFilter(props) {
    const classes = useStyles();

    // currently selected values for filter.
    // either a value passed from props else the values present in the data
    const resultTypesProps = props.resultTypes.length !== 0 ?
        props.resultTypes :
        getResultTypes(props.data.battedBalls.edges)

    // state for the filter. set to the currently selected values calculated above
    const [selectedResultTypes, setSelectedResultTypes] = useState(resultTypesProps);
    // tracks if the value has changed since render.
    const [changed, setChanged] = useState(false);

    // all possible values for filter
    let resultTypes = RESULT_TYPES;

    // set the local state for the filter value to what the user selected
    const handleChange = (event) => {
        event.persist();
        setSelectedResultTypes(event.target.value);
        setChanged(true);
    };

    // set the local state for the filter value to all possible values
    const handleSelectAll = () => {
        setSelectedResultTypes(resultTypes)
        setChanged(true)
    };

    // set the local state for the filter value to an empty array
    const handleSelectNone = () => {
        setSelectedResultTypes([])
        setChanged(true)
    };

    const handleSubmit = () => {
        props.onResultTypeChange(selectedResultTypes)
    }

    return <Grid item>
        <FormControl className={classes.formControl}>
            <InputLabel
                className={classes.noSelect}
                htmlFor="result-type-select"
            >
                {selectedResultTypes.length === 1 ? "Result Type" : "Result Types"}
            </InputLabel>
            <Select
                multiple
                className={classes.capitalize}
                value={selectedResultTypes}
                onChange={handleChange}
                input={<Input id="result-type-select"/>}
                MenuProps={MenuProps}
            >
                {resultTypes.map((resultType, index) => (
                    <MenuItem className={classes.capitalize} key={index} value={resultType}>
                        {splitUnderScoredString(resultType)}
                    </MenuItem>
                ))}
            </Select>
            <ButtonGroup>
                <Button size="small" onClick={handleSelectNone}>Select None</Button>
                <Button size="small" onClick={handleSelectAll}>Select All</Button>
                <Button
                    size="small"
                    variant="contained"
                    disabled={!changed}
                    color="primary"
                    onClick={handleSubmit}
                >
                    Apply
                </Button>
            </ButtonGroup>
        </FormControl>
    </Grid>
}