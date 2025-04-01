pipeline {
    agent any  // Automatically choose an available executor (node)

    environment {
        IMAGE_NAME = 'amamibhadya/GYM-Application' // Docker image name (replace with your Docker Hub username and repo)
        DOCKER_CREDS = credentials('test-dockerhubpassword')  // Correct Jenkins credentials ID for Docker Hub
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the GitHub repository
                git 'https://github.com/amamibhadya/GYM-Application.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                node { 
                    // Ensure the build happens inside a node context
                    bat 'docker-compose build'  // Run Docker build command on Windows
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                node { 
                    // Use Docker Hub credentials to login and push the image
                    withCredentials([usernamePassword(credentialsId: 'test-dockerhubpassword', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        bat 'echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin'
                        bat 'docker-compose push'  // Push the image to Docker Hub
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                node { 
                    // Deploy the app using Docker Compose
                    bat 'docker-compose down && docker-compose up -d'
                }
            }
        }
    }
}
