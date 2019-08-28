import React from 'react';
import './App.css';
import AppHeader from "./views/AppHeader";
import ChartContainer from "./views/ChartContainer";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid";
// import {ThemeProvider} from '@material-ui/styles'
import makeStyles from "@material-ui/core/styles/makeStyles";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#5175bf',
            main: '#134a8e',
            dark: '#5175bf',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff6448',
            main: '#e8291c',
            dark: '#ad0000',
            contrastText: '#000'
        }
    }
});

function App() {
    return <MuiThemeProvider theme={theme}>
        <AppHeader/>
        <Grid container justify={"center"}>
            <ChartContainer/>
        </Grid>
    </MuiThemeProvider>;
}

export default App;
