pipeline {
    agent any

    stages {
        stage('scm') {
            steps {
                echo "checkout scm"
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'github-token', url: 'https://github.com/Theo-mrhd-labs/test-pipeline']])
            }
        }
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
    }
}
