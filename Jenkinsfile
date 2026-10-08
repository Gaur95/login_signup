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
                sh 'docker build -t aakashgaur57/node_img .'
            }
        }
        stage('run') {
            steps{
                sh 'docker rm -f pensive_blackburn'
                sh 'docker run -d --name pensive_blackburn --network my_project_default  -e DB_HOST=db -e DB_USER=root -e DB_PASSWORD=q1234567 -e DB_NAME=login_app -e DB_PORT=3306 -e PORT=3000  -p 1122:3000 aakashgaur57/node_img'
            }
        }
        stage('login') {
            steps {
                withCredentials([
                   usernamePassword(
                      credentialsId: 'docker_cred',
                      usernameVariable: 'DOCKER_USER',
                      passwordVariable: 'DOCKER_PASS'
                )
            ]) {
            sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
            }
         }
        }
        stage('push to dockerhub') {
            steps{
                sh 'docker push aakashgaur57/node_img '
            }
        }
         stage('test'){
            steps {
                sh 'curl -I http://localhost:1122'
            }
        }
        
    }
       
}
