export function organizeData(data, outputDataBaseName, secondUnit) {
    let getResultType = (edge, rType) => {
        if (secondUnit === "Y" && Number(edge.node[outputDataBaseName + secondUnit]) <= -10) {
            // the ball landed too far behind home plate to show properly on the chart
            return null
        }
        if (edge.node.resultType === rType || (edge.node.resultType.includes(rType) || edge.node.resultType === "sac_fly")) {
            let outputData = {};

            outputData[outputDataBaseName + "X"] = Number(edge.node[outputDataBaseName + "X"])
            outputData[outputDataBaseName + secondUnit] = Number(edge.node[outputDataBaseName + secondUnit])

            return outputData
        }
        return null
    };

    let allBattedBalls = {"single": [], "double": [], "triple": [], "home_run": [], "hit_by_pitch": [], "out": []}

    data.battedBallsBetweenDates.edges.forEach(edge => {
         return ["single", "double", "triple", "home_run", "hit_by_pitch", "out"].forEach(rType => {
             let result = getResultType(edge, rType)
             if (result) {
                 allBattedBalls[rType].push(result)
             }
         })
    })

    let single, double, triple, home_run, hit_by_pitch, out;
    ({single, double, triple, home_run, hit_by_pitch, out} = allBattedBalls)

    return [single, double, triple, home_run, hit_by_pitch, out]
}

export function getPlayerNames(edges, edgeType) {
    let allPlayerNames = [];
    edges.forEach(edge => {
        let playerName
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
    })
    return allPlayerNames
}

export function getDataDateRange(data) {
    let dates = data.battedBallsBetweenDates.edges.map(edge => new Date(edge.node.date))

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