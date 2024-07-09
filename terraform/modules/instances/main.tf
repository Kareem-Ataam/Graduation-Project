# Security group for the nodes of the swarm
resource "aws_security_group" "app-sg" {
  count       = var.number_of_sgs
  name        = var.sg_names[count.index]
  description = var.descriptions[count.index]
  vpc_id      = var.vpc_id
  tags = {
    Name = sg_name_tags[count.index]
  }
  #Dynamically specify the ports that you want to open
  dynamic "ingress" {
    for_each = var.ingress_rules[count.index]
    content {
      from_port   = ingress.value["from_port"]
      to_port     = ingress.value["to_port"]
      protocol    = ingress.value["protocol"]
      cidr_blocks = ingress.value["cidr_blocks"]
    }
  }
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}
resource "aws_key_pair" "ssh-key" {
  key_name   = "ssh-key"
  public_key = file(var.public_key_path)
}
resource "aws_instance" "server" {
  count                  = length(var.ami_list)
  ami                    = var.ami_list[count.index]
  instance_type          = var.instance_types[count.index]
  key_name               = aws_key_pair.ssh-key.key_name
  subnet_id              = var.subnet_info[count.index]
  vpc_security_group_ids = count.index == 0 ? [aws_security_group.app-sg[0].id] : [aws_security_group.app-sg[1].id]
  user_data              = file(var.user_data_file_paths[count.index])
  tags = {
    Name = var.instance_names[count.index]
  }
}