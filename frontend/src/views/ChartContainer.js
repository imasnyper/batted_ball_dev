import {useQuery} from "@apollo/react-hooks";
import {BATTED_BALLS_QUERY} from "../queries";
import {CircularProgress} from "@material-ui/core";
import React from "react";
import Grid from "@material-ui/core/Grid";
import ChartFilters from "./ChartFilters";
import SprayChart from "./SprayChart";
import ZonePlot from "./ZonePlot";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ResponsiveContainer from "recharts/es6/component/ResponsiveContainer";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(1),
        [theme.breakpoints.up(1500)]: {
            width: 1400
        }
    },
    chartFilters: {
        marginTop: theme.spacing(10)
    },
    progress: {
        margin: theme.spacing(2),
        marginTop: theme.spacing(10),
        color: theme.palette.secondary.main
    },
}));

export default function ChartContainer(props) {
    const {loading, error, data, fetchMore} = useQuery(BATTED_BALLS_QUERY, {
        notifyOnNetworkStatusChange: true
    });

    const classes = useStyles();

    if (loading) return <CircularProgress className={classes.progress}/>
    if (error) {
        console.log(error)
        return <p>Error :(</p>
    }

    const onLoadMore = () => {
        fetchMore({
            variables:{
                cursor: data.allBattedBalls.pageInfo.endCursor
            },
            updateQuery: (previousData, newData) => {
                const oldEdges = previousData.allBattedBalls.edges;
                const newEdges = newData.fetchMoreResult.allBattedBalls.edges;
                const pageInfo = newData.fetchMoreResult.allBattedBalls.pageInfo;

                console.log(oldEdges)
                console.log(newEdges)

                return newEdges.length
                    ? {
                        allBattedBalls: {
                            __typename: previousData.allBattedBalls.__typename,
                            edges: [...previousData.allBattedBalls.edges, ...newEdges],
                            pageInfo
                        }
                    }
                    : previousData;
            }
        })
        console.log(fetchMore)
    }

    let newData = onLoadMore()

    return <div>
        <Grid className={classes.chartFilters} alignItems={"center"} justify={"center"} container>
            <ChartFilters/>
        </Grid>
        <Grid className={classes.container} alignItems={"flex-start"} justify={"center"} spacing={2} container>
            <Grid item sm={12} md={6}>
                <Grid item>
                    <ResponsiveContainer>
                        <SprayChart data={data}/>
                    </ResponsiveContainer>
                </Grid>
            </Grid>
            <Grid item sm={12} md={6}>
                <Grid item>
                    <ResponsiveContainer height={600}>
                        <ZonePlot data={data}/>
                    </ResponsiveContainer>
                </Grid>
            </Grid>
        </Grid>
    </div>
}