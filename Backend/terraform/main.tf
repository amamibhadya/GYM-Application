provider "aws" {
  region = "eu-north-1"
}

# Generate a new RSA private key
resource "tls_private_key" "key_pair" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

# Create an AWS Key Pair using the generated public key
resource "aws_key_pair" "key_pair" {
  key_name   = "my-unique-terraform-key-v2"
  public_key = tls_private_key.key_pair.public_key_openssh
}

# Create a Security Group to allow SSH, HTTP, HTTPS, frontend, and backend access
resource "aws_security_group" "allow_ssh" {
  name        = "allow_ssh_http_ports_v3"
  description = "Allow SSH, HTTP, HTTPS, frontend and backend access"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5173
    to_port     = 5173
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3001
    to_port     = 3001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    prevent_destroy = true
  }
}

# Launch an EC2 instance
resource "aws_instance" "my_instance" {
  ami           = "ami-0274f4b62b6ae3bd5"
  instance_type = "t3.micro"

  key_name        = aws_key_pair.key_pair.key_name
  vpc_security_group_ids = [aws_security_group.allow_ssh.id]

  tags = {
    Name = "MyEC2Instance"
  }

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              amazon-linux-extras install docker -y
              systemctl enable docker
              systemctl start docker
              usermod -aG docker ec2-user
              EOF
}

# Outputs

output "ec2_public_ip" {
  description = "Public IP of the created EC2 instance"
  value       = aws_instance.my_instance.public_ip
}

output "private_key_pem" {
  description = "Private key to SSH into the instance"
  value       = tls_private_key.key_pair.private_key_pem
  sensitive   = true
}
