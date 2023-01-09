const { Octokit } = require('octokit')
const AdmZip = require("adm-zip");
const octokit = new Octokit({auth: process.env.TOKEN})
const fs = require('fs')
const [owner, repo] = process.env.REPOSITORY.split('/')

const getArtifacts = async () => {
    try {
        const response = await octokit.rest.actions.listArtifactsForRepo({
            repo,
            owner,
        })
        const { artifacts } = response.data
        const artifact = artifacts.find(art => art.workflow_run.head_branch === process.env.BRANCH)
        const download = await octokit.rest.actions.downloadArtifact({
            repo,
            owner,
            artifact_id: artifact.id,
            archive_format: 'zip'
        })
        const buffer = Buffer.from(download.data);
        writeFile('./', './artifact.zip', buffer)
    } catch(error) {
        console.error(error)
        console.error('branch: ', process.env.BRANCH)
        console.error('owner: ', owner)
        console.error('repo: ', repo)
    }
}

const writeFile = (dir, fileName, content) => {
    fs.access(dir, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        try {
            fs.writeFileSync(fileName, content);
            console.log('Created successfully in', process.cwd());
            unzipFile(fileName)
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    });
}

const unzipFile = (fileName) => {
    const zip = new AdmZip(fileName);
    zip.extractAllTo(process.env.FUNCTIONS_PATH)
    console.log('Unzipped successfully in', process.cwd());
}

getArtifacts()
