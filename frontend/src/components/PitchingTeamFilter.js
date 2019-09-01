import {getPitcherTeams, getPlayerTeamNodes, getPlayerTeamNames} from "../utils/utils";
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

export default function PitcherTeamFilter(props) {
    const classes = useStyles();

    console.log(props.pitcherTeams)

    const pitcherTeamProps = props.pitcherTeams.length !== 0 ? props.pitcherTeams : getPlayerTeamNames(props.data.battedBallsBetweenDates.edges, "pitcher");

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
        setSelectedPitcherTeams(getPlayerTeamNames(pitcherTeams))
    }

    const handleSelectNone = () => {
        setSelectedPitcherTeams([])
    }

    return <Grid item>
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="pitcher-team-select">Pitcher Team(s)</InputLabel>
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
                <Button onClick={handleSelectNone}>Select None</Button>
                <Button onClick={handleSelectAll}>Select All</Button>
                <Button
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