import {getPlayerNames} from "../utils/utils";
import React, {useState} from "react";
import {GET_BATTERS} from "../utils/queries";
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
}


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 260,
        maxWidth: 260,
    },
    noSelect: {
        userSelect: "none",
    }
}));

export default function BatterFilter(props) {
    const classes = useStyles();

    const batterProps = props.batters.length !== 0 ? props.batters : getPlayerNames(props.data.battedBalls.edges, 'batter')

    const [selectedBatters, setSelectedBatters] = useState(batterProps);
    const [changed, setChanged] = useState(false);

    const {data, loading, error} = useQuery(GET_BATTERS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const batters = data.getBatters.edges;

    const handleChange = (event) => {
        event.persist();
        setSelectedBatters(event.target.value);
        setChanged(true);
    };

    const handleSelectAll = () => {
        setSelectedBatters(getPlayerNames(batters, 'player'))
        setChanged(true)
    };

    const handleSelectNone = () => {
        setSelectedBatters([])
        setChanged(true)
    };

    return <Grid item>
        <FormControl className={classes.formControl}>
            <InputLabel
                className={classes.noSelect}
                htmlFor="batter-select"
            >
                {selectedBatters.length === 1 ? "Batter" : "Batters"}
            </InputLabel>
            <Select
                multiple
                value={selectedBatters}
                onChange={handleChange}
                input={<Input id="batter-select"/>}
                MenuProps={MenuProps}
            >
                {batters.map(edge => (
                    <MenuItem key={edge.node.player.id} value={edge.node.player.name}>
                        {edge.node.player.name}
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
                    onClick={() => props.onBatterChange(selectedBatters)}
                >
                    Apply
                </Button>
            </ButtonGroup>
        </FormControl>
    </Grid>
}