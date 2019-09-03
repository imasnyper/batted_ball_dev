import {useQuery} from "@apollo/react-hooks";
import {BATTED_BALLS} from "../utils/queries";
import {CircularProgress, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import ChartFilters from "./ChartFilters";
import SprayChart from "./SprayChart";
import ZonePlot from "./ZonePlot";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ResponsiveContainer from "recharts/es6/component/ResponsiveContainer";
import {convertDateRange, getPlayerNames, getPlayerTeamNames, getResultTypes} from "../utils/utils";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    container: {
        margin: "0 3% 0 3%",
    },
    charts: {
        marginTop: theme.spacing(1),
        margin: "0 3% 0 3%",
    },
    chartFilters: {
        marginTop: theme.spacing(10),
    },
    progress: {
        margin: theme.spacing(2),
        marginTop: theme.spacing(10),
        color: theme.palette.secondary.main
    },
    noSelect: {
        userSelect: "none",
    },
}));



export default function ChartContainer(props) {
    const classes = useStyles();

    const onLoadMore = () => {
        const [startDate, endDate] = dateRange
        fetchMore({
            query: BATTED_BALLS,
            variables: {
                endCursor: data.battedBalls.pageInfo.endCursor,
                dateRange: [startDate, endDate],
                batters: batters,
                pitchers: pitchers,
                pitcherTeams: pitcherTeams,
                batterTeams: batterTeams,
                resultTypes: resultTypes,
            },
            updateQuery: (previousData, {fetchMoreResult}) => {
                const newEdges = fetchMoreResult.battedBalls.edges;
                const prevPageInfo = previousData.battedBalls.pageInfo
                const pageInfo = fetchMoreResult.battedBalls.pageInfo;

                return (newEdges.length && prevPageInfo.hasNextPage && prevPageInfo.endCursor !== pageInfo.endCursor)
                    ? {
                        battedBalls: {
                            __typename: previousData.battedBalls.__typename,
                            edges: [...previousData.battedBalls.edges, ...newEdges],
                            pageInfo
                        }
                    }
                    : previousData;
            }
        })
    };

    const [dateRange, setDateRange] = useState(["2017-04-02", "2017-04-05"])
    const [batters, setBatters] = useState([])
    const [pitchers, setPitchers] = useState([])
    const [pitcherTeams, setPitcherTeams] = useState([])
    const [batterTeams, setBatterTeams] = useState([])
    const [resultTypes, setResultTypes] = useState([])

    const {loading, error, data, fetchMore, refetch} = useQuery(
        BATTED_BALLS, {
        notifyOnNetworkStatusChange: true,
    });

    useEffect(() => {
        if(!loading && !error) {
            if (
                data &&
                data.battedBalls &&
                data.battedBalls.edges.length < 200 &&
                data.battedBalls.pageInfo.hasNextPage
            ) {
                const newBatters = batters.length === 0 ?
                    getPlayerNames(data.battedBalls.edges, 'batter') :
                    batters;
                const newPitchers = pitchers.length === 0 ?
                    getPlayerNames(data.battedBalls.edges, 'pitcher') :
                    pitchers;
                const newPitcherTeams = pitcherTeams.length === 0 ?
                    getPlayerTeamNames(data.battedBalls.edges, 'pitcher') :
                    pitcherTeams;
                const newBatterTeams = batterTeams.length === 0 ?
                    getPlayerTeamNames(data.battedBalls.edges, 'batter') :
                    batterTeams;
                const newResultTypes = resultTypes.length === 0 ?
                    getResultTypes(data.battedBalls.edges) :
                    resultTypes;

                setBatters(newBatters);
                setPitchers(newPitchers);
                setPitcherTeams(newPitcherTeams);
                setBatterTeams(newBatterTeams);
                setResultTypes(newResultTypes);
            }
        }
    }, [batterTeams, batters, data, error, loading, pitcherTeams, pitchers, resultTypes]);

    if (loading) return <CircularProgress className={classes.progress}/>
    if (error) return <p>Error loading batters :(</p>


    const onDateRangeChange = (startDate, endDate) => {
        const [sD, eD] = convertDateRange([startDate, endDate]);
        setDateRange([sD, eD]);
        refetch({
            dateRange: [sD, eD],
        })
    };

    const onBatterChange = (newBatters) => {
        setBatters(newBatters);
        refetch({
            dateRange: dateRange,
            batters: newBatters,
        })
    };

    const onPitcherChange = (newPitchers) => {
        setPitchers(newPitchers);
        refetch({
            dateRange: dateRange,
            pitchers: newPitchers,
        })
    };

    const onPitcherTeamChange = (newPitcherTeams) => {
        setPitcherTeams(newPitcherTeams);
        refetch({
            dateRange: dateRange,
            pitcherTeams: newPitcherTeams,
        })
    };

    const onBatterTeamChange = (newBatterTeams) => {
        setBatterTeams(newBatterTeams);
        refetch({
            dateRange: dateRange,
            batterTeams: newBatterTeams,
        })
    };

    const onResultTypeChange = (newResultTypes) => {
        setResultTypes(newResultTypes);
        refetch({
            dateRange: dateRange,
            resultTypes: newResultTypes,
        })
    };

    return <Grid className={classes.chartFilters} alignItems={"center"} justify={"center"} container>
        <Grid container>
            <ChartFilters
                dateRange={dateRange}
                data={data}
                batters={batters}
                pitchers={pitchers}
                pitcherTeams={pitcherTeams}
                batterTeams={batterTeams}
                resultTypes={resultTypes}
                onDateRangeChange={onDateRangeChange}
                onBatterChange={onBatterChange}
                onPitcherChange={onPitcherChange}
                onPitcherTeamChange={onPitcherTeamChange}
                onBatterTeamChange={onBatterTeamChange}
                onResultTypeChange={onResultTypeChange}
            />
        </Grid>
        <Grid item>
            {data.battedBalls.pageInfo.hasNextPage ?
                <div>
                    <Button
                        onClick={() => onLoadMore()}
                        variant="contained"
                        color="secondary"
                    >
                        Load More
                    </Button>
                </div>
                :
                <Typography className={classes.noSelect}>All results loaded!</Typography>
            }
        </Grid>
        <Grid container justify="center">
            <Grid item>
                <Typography align="center" className={classes.noSelect} variant="subtitle1">Batted Balls Plotted per Chart: {data.battedBalls.edges.length}</Typography>
            </Grid>
        </Grid>
        <Grid className={classes.charts} alignItems={"flex-start"} justify={"center"} spacing={2} container>
            <Grid item md={12} lg={6}>
                <ResponsiveContainer>
                    <SprayChart data={data}/>
                </ResponsiveContainer>
            </Grid>
            <Grid item md={12} lg={6}>
                <ResponsiveContainer>
                    <ZonePlot data={data}/>
                </ResponsiveContainer>
            </Grid>
        </Grid>
    </Grid>
}