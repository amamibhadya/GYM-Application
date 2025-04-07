pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('gym')
        DOCKER_USERNAME = 'uresha2001'
        BUILD_TAG = "${env.BUILD_NUMBER ?: 'latest'}"
        DOCKER_IMAGE_FRONTEND = "uresha2001/frontend"
        DOCKER_IMAGE_BACKEND = "uresha2001/backend"
        DOCKER_IMAGE_DATABASE = "uresha2001/mongo"
    }

    stages {
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/amamibhadya/GYM-Application'
                }
            }
        }

        stage('Check Build Context') {
            steps {
                bat '''
                if not exist backend exit /b 1
                if not exist frontend exit /b 1
                '''
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                bat "docker build -t ${DOCKER_IMAGE_BACKEND}:${BUILD_TAG} ./backend"
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                bat "docker build -t ${DOCKER_IMAGE_FRONTEND}:${BUILD_TAG} ./frontend"
            }
        }

        stage('Pull MongoDB Image') {
            steps {
                bat "docker pull mongo:6.0"
                bat "docker tag mongo:6.0 ${DOCKER_IMAGE_DATABASE}:${BUILD_TAG}"
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'gym', variable: 'DOCKER_PASSWORD')]) {
                    bat "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                }
            }
        }

        stage('Push Docker Images') {
            parallel {
                stage('Push Frontend') {
                    steps {
                        bat "docker push ${DOCKER_IMAGE_FRONTEND}:${BUILD_TAG}"
                    }
                }
                stage('Push Backend') {
                    steps {
                        bat "docker push ${DOCKER_IMAGE_BACKEND}:${BUILD_TAG}"
                    }
                }
                stage('Push MongoDB') {
                    steps {
                        bat "docker push ${DOCKER_IMAGE_DATABASE}:${BUILD_TAG}"
                    }
                }
            }
        }

        stage('Deploy to EC2 using Ansible') {
            steps {
                script {
                    // Full path to WSL executable and Ansible playbook
                    sh 'C:\\Windows\\System32\\wsl.exe ansible-playbook /path/to/your/ansible/playbook.yml'
                }
            }
        }
    }

    post {
        always {
            bat 'docker logout'
            echo "Logged out from Docker Hub."
        }
        failure {
            echo "Pipeline failed. Check logs."
        }
    }
}
