import {getPlayerTeamNodes, getPlayerTeamNames} from "../utils/utils";
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
        maxWidth: 275,
    },
    noSelect: {
        userSelect: "none"
    }
}));

export default function PitcherTeamFilter(props) {
    const classes = useStyles();

    const pitcherTeamProps = props.pitcherTeams.length !== 0 ?
        props.pitcherTeams :
        getPlayerTeamNames(props.data.battedBalls.edges, "pitcher");

    const [selectedPitcherTeams, setSelectedPitcherTeams] = useState(pitcherTeamProps);
    const [changed, setChanged] = useState(false);

    const {data, loading, error} = useQuery(GET_PITCHERS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const pitchers = data.getPitchers.edges
    const pitcherTeams = getPlayerTeamNodes(pitchers, "pitcher")

    const handleChange = (event) => {
        event.persist()
        console.log(changed)
        setSelectedPitcherTeams(event.target.value);
        setChanged(true);
    }

    const handleSelectAll = () => {
        setSelectedPitcherTeams(pitcherTeams.map((team) => team.name))
        setChanged(true)
    };

    const handleSelectNone = () => {
        setSelectedPitcherTeams([])
        setChanged(true)
    };

    return <Grid item>
        <FormControl className={classes.formControl}>
            <InputLabel
                className={classes.noSelect}
                htmlFor="pitcher-team-select"
            >
                {selectedPitcherTeams.length === 1 ? "Pitcher Team" : "Pitcher Teams"}
            </InputLabel>
            <Select
                multiple
                value={selectedPitcherTeams}
                onChange={handleChange}
                input={<Input id="pitcher-team-select"/>}
                MenuProps={MenuProps}
            >
                {pitcherTeams.map(team => (
                    <MenuItem key={team.id} value={team.name}>
                        {team.name}
                    </MenuItem>
                ))}
            </Select>
            <div>
                <Button size="small" onClick={handleSelectNone}>Select None</Button>
                <Button size="small" onClick={handleSelectAll}>Select All</Button>
                <Button
                    size="small"
                    variant="contained"
                    disabled={!changed}
                    color="primary"
                    onClick={() => props.onPitcherTeamChange(selectedPitcherTeams)}
                >
                    Apply
                </Button>
            </div>
        </FormControl>
    </Grid>
}