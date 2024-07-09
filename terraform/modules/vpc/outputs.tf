output "vpc_id" {
  value = aws_vpc.web-vpc.id
}
output "subnet_id_list" {
  value = aws_subnet.vpc-subnet[*].id
}
output "public_RT_id" {
  value = aws_route_table.public-rt.id
}
output "private_RT_id" {
  value = aws_route_table.private-rt.id
}
