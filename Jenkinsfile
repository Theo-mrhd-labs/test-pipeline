pipeline {
    agent any

    tools {
        nodejs 'node'
    }

    stages {
        stage('scm') {
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
                    pnpm install
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
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
    }
}
