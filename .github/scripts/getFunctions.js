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
    } catch (error) {
        console.error(error)
        console.log('functions: ', functions)
    }
}

run()