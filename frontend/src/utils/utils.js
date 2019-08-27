export function organizeData(data, outputDataBaseName, secondUnit) {
    let getResultType = (edge, rType) => {
        if (edge.node.resultType === rType || (edge.node.resultType.includes(rType) || edge.node.resultType === "sac_fly")) {
            let outputData = {};
            outputData[outputDataBaseName + "X"] = edge.node[outputDataBaseName + "X"]
            outputData[outputDataBaseName + secondUnit] = edge.node[outputDataBaseName + secondUnit]
            return outputData
        }
        return null
    };

    let allBattedBalls = {"single": [], "double": [], "triple": [], "home_run": [], "hit_by_pitch": [], "out": []}

    data.allBattedBalls.edges.forEach(edge => {
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

export function getDataDateRange(data) {
    let dates = data.allBattedBalls.edges.map(edge => new Date(edge.node.date))

    let minDate = new Date(Math.min.apply(0, dates)) / 1000
    let maxDate = new Date(Math.max.apply(0, dates)) / 1000

    console.log(minDate + ", " + maxDate)

    console.log(new Date(minDate * 1000) + ", " + new Date(maxDate * 1000))

    return [minDate, maxDate]
}

export default [organizeData]