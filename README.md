# image-exists

Check existence of a container image by full tag `domain/repo/name:tag`

You **MUST** login to the repo you want to check the image for

## Usage

```yaml
steps:
  - id: auth
    name: GCP Auth
    uses: google-github-actions/auth@v2
    with:
      credentials_json: ${{ secrets.GCP_SA_KEY }}
      project_id: ${{ inputs.project_id }}
  - id: docker_auth_gcp
    name: Docker Auth GCP
    uses: docker/login-action@v3
    with:
      registry: us-central1-docker.pkg.dev/${{ inputs.project_id }}/builders
      username: _json_key
      password: ${{ secrets.GCP_SA_KEY }}
  - id: image_exists
    uses: e11community/image-exists
    with:
    tag: us-central1-docker.pkg.dev/${{ inputs.project_id }}/builders/pnpm@abcdef
  - id: aftermath
    run: |
      echo 'Exists? ${{ steps.image_exists.outputs.exists }}'
```
