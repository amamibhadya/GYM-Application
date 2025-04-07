// pipeline {
//     agent any

//     environment {
//         DOCKER_HUB_CREDENTIALS = credentials('gym')
//         DOCKER_USERNAME = 'uresha2001'
//         BUILD_TAG = "${env.BUILD_NUMBER ?: 'latest'}"
//         DOCKER_IMAGE_FRONTEND = "uresha2001/frontend"
//         DOCKER_IMAGE_BACKEND = "uresha2001/backend"
//         DOCKER_IMAGE_DATABASE = "uresha2001/mongo"
//     }

//     stages {
//         stage('SCM Checkout') {
//             steps {
//                 retry(3) {
//                     git branch: 'main', url: 'https://github.com/amamibhadya/GYM-Application'
//                 }
//             }
//         }

//         stage('Check Build Context') {
//             steps {
//                 bat '''
//                 if not exist backend exit /b 1
//                 if not exist frontend exit /b 1
//                 '''
//             }
//         }

//         stage('Build Backend Docker Image') {
//             steps {
//                 bat "docker build -t ${DOCKER_IMAGE_BACKEND}:${BUILD_TAG} ./backend"
//             }
//         }

//         stage('Build Frontend Docker Image') {
//             steps {
//                 bat "docker build -t ${DOCKER_IMAGE_FRONTEND}:${BUILD_TAG} ./frontend"
//             }
//         }

//         stage('Pull MongoDB Image') {
//             steps {
//                 bat "docker pull mongo:6.0"
//                 bat "docker tag mongo:6.0 ${DOCKER_IMAGE_DATABASE}:${BUILD_TAG}"
//             }
//         }

//         stage('Login to Docker Hub') {
//             steps {
//                 withCredentials([string(credentialsId: 'gym', variable: 'DOCKER_PASSWORD')]) {
//                     bat "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
//                 }
//             }
//         }

//         stage('Push Docker Images') {
//             parallel {
//                 stage('Push Frontend') {
//                     steps {
//                         bat "docker push ${DOCKER_IMAGE_FRONTEND}:${BUILD_TAG}"
//                     }
//                 }
//                 stage('Push Backend') {
//                     steps {
//                         bat "docker push ${DOCKER_IMAGE_BACKEND}:${BUILD_TAG}"
//                     }
//                 }
//                 stage('Push MongoDB') {
//                     steps {
//                         bat "docker push ${DOCKER_IMAGE_DATABASE}:${BUILD_TAG}"
//                     }
//                 }
//             }
//         }
//                 stage('Terraform Init') {
//             steps {
//                 withCredentials([
//                     string(credentialsId: 'aws-access-key-id', variable: 'acesskey'),
//                     string(credentialsId: 'aws-secret-access-key', variable: 'secratekey')
//                 ]) {
//                     script {
//                         dir('terraform-aws') {
//                             bat "set AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} && set AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} && terraform init"
//                         }
//                     }
//                 }
//             }
//         }

//         stage('Terraform Plan') {
//             steps {
//                 withCredentials([
//                     string(credentialsId: 'aws-access-key-id', variable: 'acesskey'),
//                     string(credentialsId: 'aws-secret-access-key', variable: 'secratekey')
//                 ]) {
//                     withEnv([
//                         "AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}",
//                         "AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}"
//                     ]) {
//                         dir('terraform-aws') {
//                             bat 'terraform plan -out=tfplan'
//                         }
//                     }
//                 }
//             }
//         }

//         stage('Terraform Apply') {
//             steps {
//                 withCredentials([
//                     string(credentialsId: 'aws-access-key-id', variable: 'acesskey'),
//                     string(credentialsId: 'aws-secret-access-key', variable: 'secratekey')
//                 ]) {
//                     withEnv([
//                         "AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}",
//                         "AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}"
//                     ]) {
//                         dir('terraform-aws') {
//                             bat 'terraform apply -auto-approve tfplan'
//                         }
//                     }
//                 }
//             }
//         }


//         stage('Deploy to EC2 using Ansible') {
//             steps {
//                 script {
//                     // Full path to WSL executable and Ansible playbook
//                     //bat 'C:\Windows\System32\wsl.exe -u uresha ansible-playbook c/Users/IPK/Documents/GitHub/GYM-Application/ansible/deploy.yml'
//                     bat """C:\\Windows\\System32\\wsl.exe -u uresha ansible-playbook /mnt/c/Users/IPK/Documents/GitHub/GYM-Application/ansible/deploy.yml"""



//                 }
//             }
//         }

//     }

//     post {
//         always {
//             bat 'docker logout'
//             echo "Logged out from Docker Hub."
//         }
//         failure {
//             echo "Pipeline failed. Check logs."
//         }
//     }
// }

// 
pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        AWS_DEFAULT_REGION = 'eu-north-1'
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

        stage('Terraform Init') {
            steps {
                script {
                    bat 'C:\\Windows\\System32\\wsl.exe -u uresha terraform -chdir=/mnt/c/Users/IPK/Documents/GitHub/GYM-Application/Backend/terraform init'
                    bat 'C:\\Windows\\System32\\wsl -u uresha terraform -chdir=/mnt/c/Users/IPK/Documents/GitHub/GYM-Application/Backend/terraform state rm aws_key_pair.key_pair'
                }
            }
        }

        stage('Terraform Import Key Pair') {
            steps {
                script {
                    bat 'C:\\Windows\\System32\\wsl.exe -u uresha terraform -chdir=/mnt/c/Users/IPK/Documents/GitHub/GYM-Application/Backend/terraform import aws_key_pair.key_pair my-terraform-key'
                }
            }
        }

        stage('Terraform Import EC2 Instance') {
            steps {
                script {
                    bat """C:\\Windows\\System32\\wsl.exe -u uresha terraform -chdir=/mnt/c/Users/IPK/Documents/GitHub/GYM-Application/Backend/terraform import aws_instance.my_instance i-0a34d3b8b0ba68455"""

                    //bat 'C:\\Windows\\System32\\wsl.exe -u uresha terraform -chdir=/mnt/c/Users/IPK/Documents/GitHub/GYM-Application/Backend/terraform import aws_instance.my_instance i-0abc1234d567890ef'
                }
            }
        }

        stage('Terraform Plan') {
            steps {
                script {
                    bat 'C:\\Windows\\System32\\wsl.exe -u uresha terraform -chdir=/mnt/c/Users/IPK/Documents/GitHub/GYM-Application/Backend/terraform plan -out=tfplan'
                    bat 'C:\\Windows\\System32\\wsl.exe -u uresha terraform -chdir=/mnt/c/Users/IPK/Documents/GitHub/GYM-Application/Backend/terraform show'
                }
            }
        }

    //     stage('Terraform Apply') {
    //         steps {
    //             script {
    //                 bat 'C:\\Windows\\System32\\wsl.exe -u uresha terraform -chdir=/mnt/c/Users/IPK/Documents/GitHub/GYM-Application/Backend/terraform apply -auto-approve tfplan'
    //             }
    //         }
    //     }

    //     stage('Deploy to EC2 using Ansible') {
    //         steps {
    //             script {
    //                 bat 'C:\\Windows\\System32\\wsl.exe -u uresha ansible-playbook /mnt/c/Users/IPK/Documents/GitHub/GYM-Application/ansible/deploy.yml'
    //             }
    //         }
    //     }
     }

    post {
        always {
            echo 'Terraform process completed.'
        }
        failure {
            echo 'Pipeline failed. Check the logs for errors.'
        }
    }
}
