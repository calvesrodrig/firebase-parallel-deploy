const { writeFile } = require('fs/promises')
const branchFile = process.env.BRANCH_FILE
const prodFunctionsFile = process.env.PROD_FUNCTIONS_FILE
const branchFunctions = require(`./${branchFile}`)
const prodFunctions = require(`./${prodFunctionsFile}`)

const removeFunctionsDuplicity = () => {
    if (!branchFunctions.length) {
        return JSON.stringify(prodFunctions)
    }
    if (!prodFunctions.length) {
        return JSON.stringify(branchFunctions)
    }
    const functions = branchFunctions.reduce((acc, curr) => {
        if (acc.includes(curr)) {
            return acc
        }
        acc.push(curr)
        return acc
    }, prodFunctions)
    return JSON.stringify(functions)
}

const run = async () => {
    try {
        const content = removeFunctionsDuplicity()
        await writeFile(`./${prodFunctionsFile}`, content)
        console.log('Prod functions file wrote successfully')
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

run()