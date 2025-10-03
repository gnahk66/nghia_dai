pipeline {
  agent any
  tools {
    // Make sure you have a NodeJS installation named "Node18"
    nodejs 'Node18'
  }

  stages {
    stage('Build') {
      steps {
        echo 'Installing dependencies...'
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        echo 'Running Mocha tests...'
        sh 'npm test'
      }
    }

    stage('Code Quality') {
      steps {
        echo 'Running ESLint for code quality checks...'
        sh 'npx eslint . || true'
      }
    }

    stage('Security') {
      steps {
        echo 'Running npm audit for vulnerabilities...'
        sh 'npm audit --audit-level=high || true'
      }
    }
  }

  post {
    always {
      // Archive coverage or other build artifacts if present
      archiveArtifacts artifacts: '**/coverage*/**', allowEmptyArchive: true
    }
  }
}
