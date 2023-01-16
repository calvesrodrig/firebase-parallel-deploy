const { writeFile } = require('fs/promises')

const environment = {
    brachFunctionsFile: process.env.BRANCH_FUNCTIONS_FILE,
    homologFunctionsFile: process.env.HOMOLOG_FUNCTIONS_FILE
}
const branchFunctions = require(`${environment.brachFunctionsFile}`)
const homologFunctions = require(`${environment.homologFunctionsFile}`)

const run = async () => {
    try {
        homologFunctions.push(branchFunctions)
        console.log(homologFunctions)
        await writeFile(environment.homologFunctionsFile, JSON.stringify(homologFunctions))
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

run()