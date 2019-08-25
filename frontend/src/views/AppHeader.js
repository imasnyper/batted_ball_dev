import React from 'react';
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles(theme => ({
    appBar: {
        backgroundColor: theme.palette.primary.main
    },
    text: {
        color: theme.palette.primary.contrastText
    }
}))

export default function AppHeader(props) {
    const classes = useStyles();

    return (
        <AppBar position={"absolute"} className={classes.appBar}>
            <Toolbar>
                <Typography className={classes.text} align='center' variant='h4'>Batted Ball Visualisation</Typography>
            </Toolbar>
        </AppBar>
    )
}