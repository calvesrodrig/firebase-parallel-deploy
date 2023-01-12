const functionsLog = require('./teste.json')
const { writeFile } = require('fs/promises')

const run = async () => {
    console.log(functionsLog)
    await writeFile('./deploy.json', JSON.stringify(functionsLog.shift()))
    console.log(functionsLog)
    await writeFile('./teste.json', JSON.stringify(functionsLog))
}

run ()