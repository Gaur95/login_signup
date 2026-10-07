pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Gaur95/login_signup.git'
            }
        }
        stage('build') {
            steps{
                sh 'docker compose up -d --build '
            }
        }
         stage('test'){
            steps {
                sh 'curl -I http://localhost'
            }
        }
        
    }
       
}
