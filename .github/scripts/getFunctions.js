const artifact = require('@actions/artifact');
const fs = require('fs')
const branch = process.argv.slice(2).shift().replace(/([\\*/|":<>*?])/g, '-')
const fileName = `functions-${branch}.json`

const getFunctions = () => {
    const functions = process.argv.slice(3)
    const formattedFunctions = functions.map(name => name.replace('\r', ''))
    return JSON.stringify(formattedFunctions)
}

const writeJSONFile = () => {
    const content = getFunctions()
    fs.access('./', fs.constants.F_OK, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        try {
            fs.writeFileSync(`./${fileName}`, content);
            console.log('Created successfully in', process.cwd());
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    });
}

const updateFunctions = async () => {
    const artifactClient = artifact.create()
    const artifactName = `Artifact-functions-${branch}`;
    const files = [`${fileName}`]
    const rootDirectory = '.'
    const options = {
        continueOnError: false
    }
    const uploadResponse = await artifactClient.uploadArtifact(artifactName, files, rootDirectory, options)
    console.log(uploadResponse)
}

const run = async () => {
    writeJSONFile()
    await updateFunctions()
}

run()