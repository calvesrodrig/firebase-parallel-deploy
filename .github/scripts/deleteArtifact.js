const { Octokit } = require('octokit')

const environment = {
    artifactName: process.env.ARTIFACT_NAME,
    repository: process.env.REPOSITORY,
    token: process.env.TOKEN,
    artifactType: process.env.ARTIFACT_TYPE
}

const octokit = new Octokit({auth: environment.token})
const [owner, repo] = environment.repository.split('/')
const fixedFileName = environment.artifactName.replace('/', '-')

const EArtifactType = {
    byBranch: 'byBranch',
    byName: 'byName',
}

const deleteArtifact = async () => {
    try {
        const response = await octokit.rest.actions.listArtifactsForRepo({
            repo,
            owner,
        })
        const { artifacts } = response.data
        const artifact = findArtifact(environment.artifactType, artifacts)
        if (!artifact) {
            console.log('Artifact did not exist')
            return
        }
        await octokit.rest.actions.deleteArtifact({
            repo,
            owner,
            artifact_id: artifact.id
          })
        console.log(`Artifact ${artifact.name} deleted with success`)
    } catch(error) {
        console.error(error)
        console.error('artifact name: ', environment.artifactName)
        console.error('repository: ', environment.repository)
        console.error('artifactType: ', environment.artifactType)
        process.exit(1)
    }
}

const findArtifact = (type, artifacts) => {
    if (type === EArtifactType.byBranch) {
        return artifacts.find(art => art.workflow_run.head_branch === environment.artifactName && art.name.includes(fixedFileName))
    }
    return artifacts.find(art => art.name === environment.artifactName)
}

deleteArtifact()
