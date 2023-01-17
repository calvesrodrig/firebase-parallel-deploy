const environment = {
    functionsFile: process.env.FUNCTIONS_FILE,
}

const functions = require(`${environment.functionsFile}`)

const run = () => {
    if (!functions.length) {
        process.exit(1)
    }
    process.exit(0)
}

run()