pipeline {
  agent any
  tools { 
    // Make sure the name here matches the NodeJS tool you set up in Jenkins
    nodejs 'Node18' 
  }

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

    stage('Deploy (Staging)') {
      steps {
        echo 'Building and running Docker container for staging...'
        bat '''
          docker build -t nghia_dai:staging .
          docker stop nghia_dai_staging || exit /b 0
          docker rm nghia_dai_staging || exit /b 0
          docker run -d --name nghia_dai_staging -p 8080:3000 nghia_dai:staging
        '''
      }
    }

    stage('Release (Production)') {
      when { branch 'main' }
      steps {
        echo 'Tagging Docker image as production (simulated release)...'
        bat 'docker tag nghia_dai:staging nghia_dai:prod'
      }
    }

    stage('Monitoring & Alerting') {
      steps {
        echo 'Checking health endpoint...'
        bat 'curl -s http://localhost:8080/health || exit /b 0'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: '**/coverage*/**', allowEmptyArchive: true
    }
  }
}
