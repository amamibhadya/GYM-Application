pipeline {
    agent any  // Use any available node

    environment {
        IMAGE_NAME = 'yourdockerhubusername/yourapp' // Docker image name
        DOCKER_CREDS = credentials('dockerhub-creds')  // Jenkins credentials ID for Docker Hub
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/amamibhadya/GYM-Application.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                node {
                    // Make sure the build runs inside a node context
                    bat 'docker-compose build'  // Running Docker build using bat command on Windows
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                node {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        bat 'echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin'
                        bat 'docker-compose push'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                node {
                    bat 'docker-compose down && docker-compose up -d'
                }
            }
        }
    }
}
