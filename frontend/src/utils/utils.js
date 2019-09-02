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

export const RESULT_TYPES = ["single", "double", "triple", "home_run", "hit_by_pitch", "field_out", "force_out", "sac_fly"]

//converts 'camelCased' strings into 'camel Cased' strings.
export const convertKeyForDisplay = key => {
    return key.split(/(?=[A-Z])/).join(" ")
}

export const splitUnderScoredString = underscoreString => {
    return underscoreString.split("_").join(" ")
}

//accepts strings that may contain whole numbers or signed decimal numbers, or just plain text
//checks if string is any kind of number with the RegExp '/^-?\d+\.?/d*$/'
//converts all numbered strings into numbers then checks if they are integers
//if they are not integers they are assumed to be decimal numbers which we round to 2 places
//if they are integers they get returned as-is
export const convertStringForDisplay = (stringToCheck) => {
    if (/^-?\d+\.?\d*$/.test(stringToCheck)) {
        let numString = Number(stringToCheck)
        if(Number.isInteger(numString)) {
            return numString
        } else {
            return Number(stringToCheck).toFixed(2)
        }
    } else {
        return splitUnderScoredString(stringToCheck)
    }
}

const calculateLineDistance = (lineX, lineY) => {
    return Number(Math.sqrt(Math.pow(lineX, 2) + Math.pow(lineY, 2)))
}

export function organizeData(data, outputDataBaseName, secondUnit) {
    let getResultType = (edge, rType) => {

        // the ball landed too far behind home plate to show properly on the chart
        if (secondUnit === "Y" && Number(edge.node[outputDataBaseName + secondUnit]) <= -190) {
            return null
        }
        if (edge.node.resultType === rType || edge.node.resultType.includes(rType)) {
            let outputData = {};

            let landingLocationX = Number(edge.node.landingLocationX);
            let landingLocationY = Number(edge.node.landingLocationY);
            let distance = calculateLineDistance(landingLocationX, landingLocationY)

            outputData["Pitcher Name"] = edge.node.pitcher.player.name;
            outputData["Batter Name"] = edge.node.batter.player.name;
            outputData['Distance'] = distance;
            returnFields.forEach(item => {
                if (/^\d+\.\d+$/.test(item)) {
                    outputData[item] = Number(edge.node[item]).toFixed(2)
                } else {
                    outputData[item] = edge.node[item]
                }
            });

            outputData["Away Team"] = edge.node.awayTeam.name;
            outputData["Home Team"] = edge.node.homeTeam.name;
            outputData["Park Name"] = edge.node.park.name;
            return outputData
        }
        return null
    };

    let allBattedBalls = {"single": [], "double": [], "triple": [], "home_run": [], "hit_by_pitch": [], "out": [], "sac_fly": []}

    data.battedBalls.edges.forEach(edge => {
         return RESULT_TYPES.forEach(rType => {
             let result = getResultType(edge, rType)
             if (result) {
                 if (rType.includes("out")) {
                     allBattedBalls["out"].push(result)
                 } else {
                     allBattedBalls[rType].push(result)
                 }
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

export function getResultTypes(edges, edgeType) {
    let allResultTypes = [];
    console.log(edges)
    edges.forEach(edge => {
        let resultType;
        resultType = edge.node.resultType
        if (!allResultTypes.includes(resultType) && RESULT_TYPES.includes(resultType)) {
            allResultTypes.push(resultType)
        }
    })
    return allResultTypes
}

export function convertDateRange(dateRange) {
    //convert Date objects into ISO Date strings for use in GraphQL queries
    let [minDate, maxDate] = dateRange

    minDate = new Date(minDate)
    maxDate = new Date(maxDate)

    minDate = String(minDate.toISOString().split("T")[0])
    maxDate = String(maxDate.toISOString().split("T")[0])
    
    return [minDate, maxDate]
}