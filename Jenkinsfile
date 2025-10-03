pipeline {
  agent any
  tools { nodejs 'Node22' } // or whatever you named your NodeJS tool

  stages {
    stage('Build') {
      steps {
        echo 'Installing dependencies...'
        bat 'npm install'
      }
    }

    stage('Test') {
      steps {
        echo 'Running Mocha tests...'
        bat 'npm test'
      }
    }

    stage('Code Quality') {
      steps {
        echo 'Running ESLint for code quality checks...'
        bat 'npx eslint . || exit /b 0'
      }
    }

    stage('Security') {
      steps {
        echo 'Running npm audit for vulnerabilities...'
        bat 'npm audit --audit-level=high || exit /b 0'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: '**/coverage*/**', allowEmptyArchive: true
    }
  }
}
