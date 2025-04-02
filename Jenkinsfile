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

        stage('Debug Variables') {
            steps {
                bat '''
                echo Build Tag: ${BUILD_TAG}
                echo Docker Username: ${DOCKER_USERNAME}
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
                script {
                    bat "docker pull mongo:6.0"
                    bat "docker tag mongo:6.0 ${DOCKER_IMAGE_DATABASE}:${BUILD_TAG}"
                }
            }
        }

        stage('List Docker Images') {
            steps {
                bat 'docker images'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'gym', variable: 'DOCKER_PASSWORD')]) {
                    script {
                        bat "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                    }
                }
            }
        }

        stage('Verify Backend Image Before Push') {
            steps {
                script {
                    def exists = bat(script: "docker images -q ${DOCKER_IMAGE_BACKEND}:${BUILD_TAG}", returnStdout: true).trim()
                    if (!exists) {
                        error "Backend image ${DOCKER_IMAGE_BACKEND}:${BUILD_TAG} does not exist. Build failed!"
                    }
                }
            }
        }

        stage('Push Docker Images') {
            parallel {
                stage('Push Frontend Image') {
                    steps {
                        script {
                            bat "docker push ${DOCKER_IMAGE_FRONTEND}:${BUILD_TAG}"
                        }
                    }
                }
                stage('Push Backend Image') {
                    steps {
                        script {
                            bat "docker push ${DOCKER_IMAGE_BACKEND}:${BUILD_TAG}"
                        }
                    }
                }
                stage('Push MongoDB Image') {
                    steps {
                        script {
                            bat "docker push ${DOCKER_IMAGE_DATABASE}:${BUILD_TAG}"
                        }
                    }
                }
            }
        }

        // Deploy stage moved outside parallel
        stage('Deploy') {
            steps {
                sh 'ansible-playbook -i inventory.ini deploy.yml'
            }
        }
    }

    post {
        always {
            bat 'docker logout'
            echo "Logged out from Docker Hub."
            bat 'docker-compose down -v || true'  
        }
        failure {
            echo "Pipeline failed. Check logs."
        }
    }
}
