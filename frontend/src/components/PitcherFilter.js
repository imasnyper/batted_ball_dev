import {getPlayerNames} from "../utils/utils";
import React, {useState} from "react";
import {GET_PITCHERS} from "../utils/queries";
import {useQuery} from "@apollo/react-hooks";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        }
    }
}


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    }
}));

export default function PitcherFilter(props) {
    const classes = useStyles();

    // set the value of the selected pitchers
    // if the user has set the value since loading the page, we load the value from props
    // else we set the value to the pitchers who show up in the initial batted ball query
    const pitcherProps = props.pitchers.length !== 0 ? props.pitchers : getPlayerNames(props.data.battedBalls.edges, 'pitcher')

    const [selectedPitchers, setSelectedPitchers] = useState(pitcherProps)
    const [changed, setChanged] = useState(false)

    const {data, loading, error} = useQuery(GET_PITCHERS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    const pitchers = data.getPitchers.edges

    const handleChange = (event) => {
        event.persist()
        setSelectedPitchers(event.target.value)
        setChanged(true)
    }

    const handleSelectAll = () => {
        setSelectedPitchers(getPlayerNames(pitchers, 'player'))
        setChanged(true)
    }

    const handleSelectNone = () => {
        setSelectedPitchers([])
        setChanged(true)
    }

    return <Grid item>
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="pitcher-select">Pitcher(s)</InputLabel>
            <Select
                multiple
                value={selectedPitchers}
                onChange={handleChange}
                input={<Input id="pitcher-select"/>}
                MenuProps={MenuProps}
            >
                {pitchers.map(edge => (
                    <MenuItem key={edge.node.player.id} value={edge.node.player.name}>
                        {edge.node.player.name}
                    </MenuItem>
                ))}
            </Select>
            <div>
                <Button onClick={handleSelectNone}>Select None</Button>
                <Button onClick={handleSelectAll}>Select All</Button>
                <Button
                    variant="contained"
                    disabled={!changed}
                    color="primary"
                    onClick={() => props.onPitcherChange(selectedPitchers)}
                >
                    Apply
                </Button>
            </div>
        </FormControl>
    </Grid>
}