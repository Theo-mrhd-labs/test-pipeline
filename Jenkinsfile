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
                sh "pnpm install"
            }
        }
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
    }
}
