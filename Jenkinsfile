pipeline {
    agent any 
    
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('gym')  // Store Docker credentials
        DOCKER_USERNAME = 'Uresha2001'
        BUILD_VERSION = "${env.BUILD_NUMBER}"
    }

    stages { 
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/amamibhadya/GYM-Application'
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                bat 'docker build -t Uresha2001/backend:%BUILD_VERSION% ./backend'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                bat 'docker build -t Uresha2001/frontend:%BUILD_VERSION% ./frontend'
            }
        }

         stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'gym', variable: 'gym')]) {
                    script {
                        bat "docker login -u Uresha2001 -p %gym%"
                    }
                }
            }
        }

        stage('Push Backend Image') {
            steps {
                bat 'docker push Uresha2001/backend:%BUILD_VERSION%'
            }
        }

        stage('Push Frontend Image') {
            steps {
                bat 'docker push Uresha2001/frontend:%BUILD_VERSION%'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                bat '''
                docker-compose down
                docker-compose up -d
                '''
            }
        }
    }

    post {
        always {
            bat 'docker logout'
        }
    }
}
