
    const functions = process.argv.slice(2)
    const formattedFunctions = functions.map(name => name.replace('\r', ''))
    console.log(formattedFunctions, JSON.stringify(formattedFunctions))
    return JSON.stringify(formattedFunctions)

// const writeJSONFile = async () => {
//     const content = getFunctions()
//     console.log(branch, content)
//     fs.access('./', fs.constants.F_OK, async (err) => {
//         if (err) {
//             console.error(err);
//             process.exit(1);
//         }

//         try {
//             fs.writeFileSync(`./${fileName}`, content);
//             console.log('Created successfully in', process.cwd());
//             await updateFunctions()
//         } catch (error) {
//             console.error(error);
//             process.exit(1);
//         }
//     });
// }

// const updateFunctions = async () => {
//     const artifactClient = artifact.create()
//     const artifactName = `Artifact-functions-${branch}`;
//     const files = [`${__dirname}/${fileName}`]
//     const rootDirectory = `${__dirname}`
//     const options = {
//         continueOnError: false
//     }
//     const uploadResponse = await artifactClient.uploadArtifact(artifactName, files, rootDirectory, options)
//     console.log(uploadResponse)
// }

// const run = async () => {
//     await writeJSONFile()
// }
