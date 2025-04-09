provider "aws" {
  region = "eu-north-1"
}

resource "tls_private_key" "key_pair" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

resource "aws_key_pair" "key_pair" {
  key_name   = "my-unique-terraform-key"  # Changed key name to avoid conflict
  public_key = tls_private_key.key_pair.public_key_openssh
}

resource "aws_security_group" "allow_ssh" {
  name        = "allow_ssh_http_ports_v2"  # Changed security group name to avoid conflict
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

resource "aws_instance" "my_instance" {
  ami           = "ami-0274f4b62b6ae3bd5"  # Use appropriate AMI for your region
  instance_type = "t3.micro"

  key_name        = aws_key_pair.key_pair.key_name
  security_groups = [aws_security_group.allow_ssh.name]

  tags = {
    Name = "MyEC2Instance"
  }

  # Add user_data to install Docker on the EC2 instance
  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              amazon-linux-extras install docker -y
              systemctl enable docker
              systemctl start docker
              usermod -aG docker ec2-user
              EOF
}

output "ec2_public_ip" {
  description = "Public IP of the created EC2 instance"
  value       = aws_instance.my_instance.public_ip
}

output "private_key_pem" {
  description = "Private key to SSH into the instance"
  value       = tls_private_key.key_pair.private_key_pem
  sensitive   = true
}
