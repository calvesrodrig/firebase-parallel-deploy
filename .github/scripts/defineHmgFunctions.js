const environment = {
    brachFunctionsFile: process.env.BRANCH_FUNCTIONS_FILE,
    homologFunctionsFile: process.env.HOMOLOG_FUNCTIONS_FILE
}
const branchFunctions = require(`${environment.brachFunctionsFile}`)
const homologFunctions = require(`${environment.homologFunctionsFile}`)

const run = async () => {
    try {
        console.log(branchFunctions)
        console.log(homologFunctions)        
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

run()