const { writeFile } = require('fs/promises')
const branch = process.env.BRANCH
const fileName = `functions-${branch}.json`

const getFunctions = () => {
    console.error('FUNCTIONS: ', process.env.FUNCTIONS)
    const functions = process.env.FUNCTIONS
    const formattedFunctions = functions.map(name => name.replace('\r', ''))
    return JSON.stringify(formattedFunctions)
}

const run = async () => {
    try {
        const content = getFunctions()
        await writeFile(`./${fileName}`, content)
    } catch (error) {
        console.error('FUNCTIONS: ', process.env.FUNCTIONS)
    }
}

run()