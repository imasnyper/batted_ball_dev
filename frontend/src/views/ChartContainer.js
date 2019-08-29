import {useLazyQuery, useQuery} from "@apollo/react-hooks";
import {BATTED_BALLS_QUERY, LAST_BATTED_BALLS, BATTED_BALLS_BETWEEN_DATES} from "../queries";
import {CircularProgress} from "@material-ui/core";
import React, {useEffect, useState} from "react";
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
        marginTop: theme.spacing(15)
    },
    progress: {
        margin: theme.spacing(2),
        marginTop: theme.spacing(10),
        color: theme.palette.secondary.main
    },
}));



export default function ChartContainer(props) {
    const {loading, error, data, fetchMore, refetch} = useQuery(BATTED_BALLS_BETWEEN_DATES, {
        notifyOnNetworkStatusChange: true
    });

    const classes = useStyles();

    if (loading) return <CircularProgress className={classes.progress}/>
    if (error) return <p>Error :(</p>

    // console.log(data)
    // console.log(new Date(data.battedBallsBetweenDates.edges[0].node.date))
    // console.log(new Date(data.battedBallsBetweenDates.edges[data.battedBallsBetweenDates.edges.length - 1].node.date))

    const onLoadMore = () => {
        fetchMore({
            variables: {
                endCursor: data.battedBallsBetweenDates.pageInfo.endCursor
            },
            updateQuery: (previousData, newData) => {
                const newEdges = newData.fetchMoreResult.battedBallsBetweenDates.edges;
                const pageInfo = newData.fetchMoreResult.battedBallsBetweenDates.pageInfo;

                return newEdges.length
                    ? {
                        battedBallsBetweenDates: {
                            __typename: previousData.battedBallsBetweenDates.__typename,
                            edges: [...previousData.battedBallsBetweenDates.edges, ...newEdges],
                            pageInfo
                        }
                    }
                    : previousData;
            }
        })
    }

    const onDateRangeChange = (startDate, endDate) => {
        console.log(startDate)
        console.log(endDate)
        startDate = new Date(startDate)
        endDate = new Date(endDate)
        console.log(startDate)
        console.log(endDate)
        startDate = String(startDate.toISOString().split("T")[0])
        endDate = String(endDate.toISOString().split("T")[0])
        refetch({
            dateRange: [startDate, endDate]
        })
    }

    return <div>
        <Grid className={classes.chartFilters} alignItems={"center"} justify={"center"} container>
            <ChartFilters data={data} onDateRangeChange={onDateRangeChange}/>
        </Grid>
        <Grid item>
            <button onClick={() => onLoadMore()}>Load More</button>
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