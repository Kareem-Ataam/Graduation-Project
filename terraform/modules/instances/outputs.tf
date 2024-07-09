output "instance_id_list" {
  value = aws_instance.server[*].id
}
output "sg_id_list" {
  value = aws_security_group.app-sg[*].id
}
