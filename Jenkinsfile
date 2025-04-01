pipeline {
    agent any 
    
    stages { 
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/amamibhadya/GYM-Application'
                }
            }
        }
        stage('Build Docker Image') {
            steps {  
                bat 'docker build -t AmamiBhadya/nodeapp-cuban:%BUILD_NUMBER% .'
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'test-dockerhubpassword', variable: 'test-dockerhubpassword')]) {
                    script {
                        bat "docker login -u amamibhadya -p %test-dockerhubpassword%"
                    }
                }
            }
        }
        stage('Push Image') {
            steps {
                bat 'docker push amamibhadya/nodeapp-cuban:%BUILD_NUMBER%'
            }
        }
    }
    post {
        always {
            bat 'docker logout'
        }
    }
}
