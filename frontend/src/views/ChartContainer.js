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
import {convertDateRange} from "../utils/utils";

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

    const onLoadMore = () => {
        const [startDate, endDate] = dateRange
        console.log(startDate, endDate)
        console.log(typeof data.battedBallsBetweenDates.pageInfo.endCursor)
        fetchMore({
            variables: {
                endCursor: data.battedBallsBetweenDates.pageInfo.endCursor,
                dateRange: [startDate, endDate]
            },
            updateQuery: (previousData, {fetchMoreResult}) => {
                console.log(previousData)
                console.log(fetchMoreResult)
                const newEdges = fetchMoreResult.battedBallsBetweenDates.edges;
                const pageInfo = fetchMoreResult.battedBallsBetweenDates.pageInfo;

                console.log(newEdges)

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

    useEffect(() => {
        if(data && data.battedBallsBetweenDates && data.battedBallsBetweenDates.edges.length < 1000 && data.battedBallsBetweenDates.pageInfo.hasNextPage) { onLoadMore() }
    })

    const [dateRange, setDateRange] = useState(["2017-04-02", "2017-04-05"])

    const classes = useStyles();

    if (loading) return <CircularProgress className={classes.progress}/>
    if (error) return <p>Error :(</p>

    console.log(data.battedBallsBetweenDates)
    console.log(data.battedBallsBetweenDates.pageInfo.endCursor)



    const onDateRangeChange = (startDate, endDate) => {
        const [sD, eD] = convertDateRange([startDate, endDate])
        setDateRange([sD, eD])
        refetch({
            dateRange: [sD, eD]
        })
    }

    return <div>
        <Grid className={classes.chartFilters} alignItems={"center"} justify={"center"} container>
            <ChartFilters
                dateRange={dateRange}
                data={data}
                onDateRangeChange={onDateRangeChange}
            />
        </Grid>
        <Grid item>
            <button onClick={() => onLoadMore()}>Load More</button>
        </Grid>
        <Grid className={classes.container} alignItems={"flex-start"} justify={"center"} spacing={2} container>
            <Grid item sm={12} md={6}>
                <ResponsiveContainer>
                    <SprayChart data={data}/>
                </ResponsiveContainer>
            </Grid>
            <Grid item sm={12} md={6}>
                <ResponsiveContainer height={600}>
                    <ZonePlot data={data}/>
                </ResponsiveContainer>
            </Grid>
        </Grid>
    </div>
}