const { writeFile } = require('fs/promises')
const branch = process.env.BRANCH
const fileName = `functions-${branch}.json`
const functions = process.env.FUNCTIONS

const getFunctions = () => {
    const formattedFunctions = functions.split('\r').map(name => name.replace('\n', ''))
    return JSON.stringify(formattedFunctions)
}

const run = async () => {
    try {
        const content = getFunctions()
        await writeFile(`./${fileName}`, content)
        console.log('functions: ', functions)
        console.log('branch: ', branch)
        console.log('filename: ', fileName)
    } catch (error) {
        console.error(error)
        console.log('functions: ', functions)
        console.log('branch: ', branch)
        console.log('filename: ', fileName)
    }
}

run()