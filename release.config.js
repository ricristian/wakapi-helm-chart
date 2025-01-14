module.exports = {
    branches: [
        "main",
        { name: "next", prerelease: true },
        { name: "beta", prerelease: true },
    ],
    plugins: [
        // Update Helm Chart version in Chart.yaml
        [
            "@semantic-release/exec",
            {
                prepareCmd:
                    "sed -i 's/version:.*/version: ${nextRelease.version}/' charts/wakapi/Chart.yaml && helm package charts/wakapi --destination ./packages",
            },
        ],
        // Publish Helm package to GitHub
        [
            "@semantic-release/github",
            {
                assets: ["packages/*.tgz"],
            },
        ],
        // Update `index.yaml` for Helm repository
        [
            "@semantic-release/exec",
            {
                publishCmd: "cr index -o ricristian -r wakapi-helm-chart -p ./packages",
            },
        ],
    ],
};