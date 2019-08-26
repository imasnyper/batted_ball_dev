export default function organizeData(data, outputDataBaseName, secondUnit) {
    let getResultType = (edge, rType) => {
        if (edge.node.resultType === rType || (edge.node.resultType.includes(rType) || edge.node.resultType === "sac_fly")) {
            let outputData = {};
            outputData[outputDataBaseName + "X"] = Number(edge.node[outputDataBaseName + "X"])
            outputData[outputDataBaseName + secondUnit] = Number(edge.node[outputDataBaseName + secondUnit])
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