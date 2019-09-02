const returnFields = [
    "date",
    "balls",
    "strikes",
    "resultType",
    "pitchType",
    "pitchSpeed",
    "zoneLocationX",
    "zoneLocationZ",
    "launchSpeed",
    "launchVertAng",
    "launchHorizAng",
    "landingLocationX",
    "landingLocationY",
    "hangTime"
];

export function organizeData(data, outputDataBaseName, secondUnit) {
    let getResultType = (edge, rType) => {

        // the ball landed too far behind home plate to show properly on the chart
        if (secondUnit === "Y" && Number(edge.node[outputDataBaseName + secondUnit]) <= -190) {
            return null
        }
        if (edge.node.resultType === rType || edge.node.resultType.includes(rType)) {
            let outputData = {};

            returnFields.forEach(item => {
                if (isNaN(item)) {
                    outputData[item] = edge.node[item]
                } else {
                    outputData[item] = Number(edge.node[item]).toFixed(2)
                }
            });
            let landingLocationX = edge.node.landingLocationX;
            let landingLocationY = edge.node.landingLocationY;
            outputData['Distance'] = Math.sqrt(
                Math.pow(landingLocationX, 2) +
                Math.pow(landingLocationY, 2)).toFixed(2);
            outputData["Home Team"] = edge.node.homeTeam.name;
            outputData["Away Team"] = edge.node.awayTeam.name;
            outputData["Park Name"] = edge.node.park.name;
            outputData["Batter Name"] = edge.node.batter.player.name;
            outputData["Batter Team"] = edge.node.batter.player.team.name;
            outputData["Bat Side"] = edge.node.batter.player.side;
            outputData["Pitcher Name"] = edge.node.pitcher.player.name;
            outputData["Pitcher Team"] = edge.node.pitcher.player.team.name;
            outputData["Pitcher Throw Side"] = edge.node.pitcher.player.side;
            return outputData
        }
        return null
    };

    let allBattedBalls = {"single": [], "double": [], "triple": [], "home_run": [], "hit_by_pitch": [], "out": [], "sac_fly": []}

    data.battedBalls.edges.forEach(edge => {
         return ["single", "double", "triple", "home_run", "hit_by_pitch", "out", "sac_fly"].forEach(rType => {
             let result = getResultType(edge, rType)
             if (result) {
                 allBattedBalls[rType].push(result)
             }
         })
    });

    let single, double, triple, home_run, hit_by_pitch, out, sac_fly;
    ({single, double, triple, home_run, hit_by_pitch, out, sac_fly} = allBattedBalls)

    return [single, double, triple, home_run, hit_by_pitch, out, sac_fly]
}

export function getPlayerNames(edges, edgeType) {
    let allPlayerNames = [];
    edges.forEach(edge => {
        let playerName;
        switch(edgeType) {
            case "batter":
                playerName = edge.node.batter.player.name;
                break;
            case "pitcher":
                playerName = edge.node.pitcher.player.name;
                break;
            default:
                playerName = edge.node.player.name;
        }
        if (!allPlayerNames.includes(playerName)) {
            allPlayerNames.push(playerName)
        }
    });
    return allPlayerNames
}

export function getPlayerTeamNames(edges, edgeType) {
    let allPlayerTeamNames = [];
    console.log(edges)
    edges.forEach(edge => {
        let playerTeamName;
        playerTeamName = edge.node[edgeType].player.team.name
        if (!allPlayerTeamNames.includes(playerTeamName)) {
            allPlayerTeamNames.push(playerTeamName)
        }
    })
    return allPlayerTeamNames
}

export function getPlayerTeamNodes(edges) {
    let allPlayerTeamNodes = [];
    edges.forEach(edge => {
        let playerTeamNode;
        playerTeamNode = edge.node.player.team;
        if (!allPlayerTeamNodes.includes(playerTeamNode)) {
            allPlayerTeamNodes.push(playerTeamNode)
        }
    })
    return allPlayerTeamNodes
}

export function getDataDateRange(data) {
    let dates = data.battedBalls.edges.map(edge => new Date(edge.node.date))

    let minDate = new Date(Math.min.apply(0, dates))
    let maxDate = new Date(Math.max.apply(0, dates))

    minDate = new Date(minDate)
    maxDate = new Date(maxDate)

    minDate = String(minDate.toISOString().split("T")[0])
    maxDate = String(maxDate.toISOString().split("T")[0])

    return [minDate, maxDate]
}

export function convertDateRange(dateRange) {
    //convert Date objects into ISO Date strings for use in GraphQL queries
    let [minDate, maxDate] = dateRange

    console.log(minDate, maxDate)

    minDate = new Date(minDate)
    maxDate = new Date(maxDate)

    minDate = String(minDate.toISOString().split("T")[0])
    maxDate = String(maxDate.toISOString().split("T")[0])

    console.log(minDate, maxDate)

    return [minDate, maxDate]
}