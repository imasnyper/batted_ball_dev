import {useQuery} from "@apollo/react-hooks";
import {BATTED_BALLS_BETWEEN_DATES} from "../queries";
import {CircularProgress} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import ChartFilters from "./ChartFilters";
import SprayChart from "./SprayChart";
import ZonePlot from "./ZonePlot";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ResponsiveContainer from "recharts/es6/component/ResponsiveContainer";
import {convertDateRange, getBatterNames} from "../utils/utils";
import Button from "@material-ui/core/Button";

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
    const onLoadMore = () => {
        const [startDate, endDate] = dateRange
        fetchMore({
            query: BATTED_BALLS_BETWEEN_DATES,
            variables: {
                endCursor: data.battedBallsBetweenDates.pageInfo.endCursor,
                dateRange: [startDate, endDate],
                batters: batters
            },
            updateQuery: (previousData, {fetchMoreResult}) => {
                const newEdges = fetchMoreResult.battedBallsBetweenDates.edges;
                const prevPageInfo = previousData.battedBallsBetweenDates.pageInfo
                const pageInfo = fetchMoreResult.battedBallsBetweenDates.pageInfo;

                console.log("**************")
                console.log(newEdges)
                console.log("**************")

                return (newEdges.length && prevPageInfo.hasNextPage && prevPageInfo.endCursor !== pageInfo.endCursor)
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

    const [dateRange, setDateRange] = useState(["2017-04-02", "2017-04-05"])
    const [batters, setBatters] = useState([])

    const {loading, error, data, fetchMore, refetch, client} = useQuery(
        BATTED_BALLS_BETWEEN_DATES, {
        notifyOnNetworkStatusChange: true,
        variables: {
            dateRange: dateRange,
        }
    });

    //TODO learn more better
    //
    useEffect(() => {
        if(!loading && !error) {
            if (
                data &&
                data.battedBallsBetweenDates &&
                data.battedBallsBetweenDates.edges.length < 200 &&
                data.battedBallsBetweenDates.pageInfo.hasNextPage
            ) {
                const newBatters = batters.length === 0 ? getBatterNames(data.battedBallsBetweenDates.edges, 'batter') : batters
                setBatters(newBatters)
                // onLoadMore()

            }
        }
    }, [data])

    const classes = useStyles();

    if (loading) return <CircularProgress className={classes.progress}/>
    if (error) return <p>Error loading batters :(</p>

    // const onLoadAll = () => {
    //     while (data.battedBallsBetweenDates.pageInfo.hasNextPage) { onLoadMore() }
    // }

    const onDateRangeChange = (startDate, endDate) => {
        const [sD, eD] = convertDateRange([startDate, endDate])
        setDateRange([sD, eD])
        refetch({
            dateRange: [sD, eD],
            batters: batters,
        })
    }

    const onBatterChange = (newBatters) => {
        setBatters(newBatters)
        refetch({
                dateRange: dateRange,
                batters: newBatters,
            }
        )
    }

    return <div>
        <Grid className={classes.chartFilters} alignItems={"center"} justify={"center"} container>
            <ChartFilters
                dateRange={dateRange}
                data={data}
                batters={batters}
                onDateRangeChange={onDateRangeChange}
                onBatterChange={onBatterChange}
                apolloClient={client}
            />
        </Grid>
        <Grid item>
            {data.battedBallsBetweenDates.pageInfo.hasNextPage ?
                <div>
                    <Button onClick={() => onLoadMore()}>Load More</Button>
                    {/*<Button onClick={() => onLoadAll()}>Load All</Button>*/}
                </div>
                :
                <p>All results loaded!</p>
            }
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