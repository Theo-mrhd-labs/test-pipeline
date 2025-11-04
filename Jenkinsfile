pipeline {
    agent any

    tools {
        nodejs 'node'
    }

    environment {
        REGISTRY = "ghcr.io"
        REPO_OWNER = "theo-mrhd-labs"
        REPO_NAME  = "test-pipeline"
        IMAGE = "${REGISTRY}/${REPO_OWNER}/${REPO_NAME}"
        VERSION = "build-${env.BUILD_NUMBER}"
    }

    stages {
        stage('checkout') {
            steps {
                echo "checkout scm"
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'github-token', url: 'https://github.com/Theo-mrhd-labs/test-pipeline']])
            }
        }
        stage('install dependencies') {
            steps {
                echo "install dependencies"
                sh '''
                    corepack enable
                    corepack prepare pnpm@latest --activate
                    pnpm install --frozen-lockfile
                '''
            }
        }
        stage ('build project') {
            steps {
                echo "build project"
                sh '''
                    pnpm build
                '''
            }
        }
        stage ('run tests') {
            steps {
                echo "run tests"
                sh '''
                    pnpm test
                '''
            }
        }
        stage('Build Docker image') {
            steps {
                echo "Build Docker image"
                sh 'docker build -t ${IMAGE}:${VERSION} .'
            }
        }
        stage('Push Docker image to GHCR') {
            steps {
                echo "🚀 Push Docker image to GitHub Container Registry"
                withCredentials([usernamePassword(credentialsId: 'ghcr-credentials', usernameVariable: 'GH_USER', passwordVariable: 'GH_TOKEN')]) {
                    sh '''
                        echo "${GH_TOKEN}" | docker login ghcr.io -u "${GH_USER}" --password-stdin
                        docker push ${IMAGE}:${VERSION}
                        docker tag ${IMAGE}:${VERSION} ${IMAGE}:latest
                        docker push ${IMAGE}:latest
                    '''
                }
            }
        }
        stage('Tag GitHub version') {
    steps {
        echo "🏷️ Tagging repository with version ${VERSION}"
        withCredentials([usernamePassword(credentialsId: 'github-token', usernameVariable: 'GH_USER', passwordVariable: 'GH_TOKEN')]) {
            sh """
                git config user.name "${GH_USER}"
                git config user.email "${GH_USER}@users.noreply.github.com"
                git tag -a "v${VERSION}" -m "Build ${VERSION}"
                git push https://${GH_USER}:${GH_TOKEN}@github.com/theo-mrhd-labs/test-pipeline.git --tags
            """
        }
    }
}
    }
    post {
        success {
            echo 'Pipeline terminé avec succès !'
        }
        failure {
            echo 'Échec du pipeline — vérifie les logs.'
        }
    }
}
