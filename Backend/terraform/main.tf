provider "aws" {
  region = "eu-north-1"  # You can replace this with your desired region
}

# Generate a new SSH key pair (if you don't have one)
resource "tls_private_key" "key_pair" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

# Create AWS key pair using the public key
resource "aws_key_pair" "key_pair" {
  key_name   = "my-terraform-key"  # Name of the key pair
  public_key = tls_private_key.key_pair.public_key_openssh
}

# Create a Security Group that allows SSH (port 22)
resource "aws_security_group" "allow_ssh" {
  name        = "allow_ssh"
  description = "Allow SSH access"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow SSH from any IP (modify to restrict)
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create an EC2 instance using the key pair and security group
resource "aws_instance" "my_ec2_instance" {
  ami           = "ami-0274f4b62b6ae3bd5"  # Replace with the correct AMI ID  # Replace with your desired AMI ID
  instance_type = "t3.micro"               # You can change the instance type

  key_name = aws_key_pair.key_pair.key_name
  security_groups = [aws_security_group.allow_ssh.name]

  tags = {
    Name = "MyEC2Instance"
  }

  # Optionally, specify the subnet_id and associate a VPC if you need
}
resource "aws_instance" "my_instance" {
  # This is just a placeholder for import.
  # You will update these arguments after import.
  ami           = "ami-1234567890abcdef0"  # placeholder
  instance_type = "t3.micro"              # placeholder
}
