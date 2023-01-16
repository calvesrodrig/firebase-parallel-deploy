const {
    writeFile
} = require('fs/promises')

const environment = {
    brachFunctionsFile: process.env.BRANCH_FUNCTIONS_FILE,
    homologFunctionsFile: process.env.HOMOLOG_FUNCTIONS_FILE,
    operationType: process.env.OPERATION_TYPE
}
const operationType = {
    add: 'add',
    retrieve: 'retrieve'
}
const branchFunctions = require(`${environment.brachFunctionsFile}`)
const homologFunctions = require(`${environment.homologFunctionsFile}`)

const run = async () => {
    try {
        if (environment.operationType === operationType.add) {
            homologFunctions.push(branchFunctions)
            console.log('Last functions array updated', homologFunctions)
            await writeFile(environment.homologFunctionsFile, JSON.stringify(homologFunctions))
            console.log('Add functions to be deployed with success', branchFunctions)
            return
        }
        const functionsToBeDeployed = homologFunctions.shift()
        console.log('First functions array removed', homologFunctions)
        await writeFile(environment.brachFunctionsFile, JSON.stringify(functionsToBeDeployed))
        await writeFile(environment.homologFunctionsFile, JSON.stringify(homologFunctions))
        console.log('Retrieve functions to be deployed with success', functionsToBeDeployed)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

run()