import * as core from '@actions/core'
import * as exec from '@actions/exec'

async function run(): Promise<void> {
  try {
    const tag: string = core.getInput('tag', {required: true})
    let exists = false

    core.info(`Checking for container image tag: ${tag}`)

    try {
      /*
      docker manifest inspect returns a non-zero exit code if the manifest does not exist.
      We redirect stdout and stderr to ignore the output and only check the exit code.
      */
      await exec.exec('docker', ['manifest', 'inspect', tag], {
        silent: true,
      })
      exists = true // Command succeeded, tag exists
      core.info(`Image tag ${tag} found.`)
    } catch (error) {
      /*
      If the command fails, the tag likely does not exist.
      We don't need to log the specific docker error in this case.
      */
      core.info(`Image tag ${tag} not found.`)
      exists = false
    }

    core.setOutput('exists', exists)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed('An unknown error occurred.')
    }
  }
}

run()
