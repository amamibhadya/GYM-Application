provider "aws" {
  region = "eu-north-1"
}

resource "tls_private_key" "key_pair" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

resource "aws_key_pair" "key_pair" {
  key_name   = "my-terraform-key"
  public_key = tls_private_key.key_pair.public_key_openssh
}

resource "aws_security_group" "allow_ssh" {
  name        = "allow_ssh"
  description = "Allow SSH access"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "my_instance" {
  ami           = "ami-0274f4b62b6ae3bd5"
  instance_type = "t3.micro"

  key_name        = aws_key_pair.key_pair.key_name
  security_groups = [aws_security_group.allow_ssh.name]

  tags = {
    Name = "MyEC2Instance"
  }
}
