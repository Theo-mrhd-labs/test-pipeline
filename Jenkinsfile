pipeline {
    agent any

    tools {
        nodejs 'node'
    }

    options {
        timestamps()
        ansiColor('xterm')
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
