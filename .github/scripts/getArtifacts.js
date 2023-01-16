const { Octokit } = require('octokit')
const AdmZip = require("adm-zip");
const { writeFile, mkdir, readdir } = require('fs/promises')

const environment = {
    artifactName: process.env.ARTIFACT_NAME,
    repository: process.env.REPOSITORY,
    token: process.env.TOKEN,
    functionsPath: process.env.FUNCTIONS_PATH,
    artifactType: process.env.ARTIFACT_TYPE
}

const octokit = new Octokit({auth: environment.token})
const [owner, repo] = environment.repository.split('/')
const fixedFileName = environment.artifactName.replace('/', '-')
const file = `./${fixedFileName}.zip`

const EArtifactType = {
    byBranch: 'byBranch',
    byName: 'byName',
}

const getArtifact = async () => {
    try {
        const response = await octokit.rest.actions.listArtifactsForRepo({
            repo,
            owner,
        })
        const { artifacts } = response.data
        const artifact = findArtifact(environment.artifactType, artifacts)
        if (!artifact) {
            await mkdir(`./${environment.functionsPath}`)
            await writeFile(`${environment.functionsPath}/${fixedFileName}.json`, JSON.stringify([]))
            console.log('Artifact did not exist, new function file was created')
            return
        }
        const download = await octokit.rest.actions.downloadArtifact({
            repo,
            owner,
            artifact_id: artifact.id,
            archive_format: 'zip'
        })
        const buffer = Buffer.from(download.data);
        await writeFile(file, buffer)
        unzipFile(file)
        console.log('Unzipped successfully at', process.cwd() + `/${environment.functionsPath}`);
        console.log('fixed file name: ', fixedFileName)
        console.log('repository: ', environment.repository)
        console.log('functionsPath: ', environment.functionsPath)
        console.log('artifactType: ', environment.artifactType)
    } catch(error) {
        console.error(error)
        console.error('artifact name: ', environment.artifactName)
        console.error('repository: ', environment.repository)
        console.error('functionsPath: ', environment.functionsPath)
        console.error('artifactType: ', environment.artifactType)
        process.exit(1)
    }
}

const unzipFile = (fileName) => {
    const zip = new AdmZip(fileName);
    zip.extractAllTo(environment.functionsPath)
}

const findArtifact = (type, artifacts) => {
    if (type === EArtifactType.byBranch) {
        return artifacts.find(art => art.workflow_run.head_branch === environment.artifactName && art.name.includes(fixedFileName))
    }
    return artifacts.find(art => art.name === environment.artifactName)
}

getArtifact()
