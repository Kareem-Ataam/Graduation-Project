variable "vpc_cidr_block" {
  type        = string
  description = "CIDR block of the VPC"
}
variable "env-prefix" {
  type        = string
  description = "Prefix for the environment  name, (dev-->development), (prod-->production)"
}
variable "subnet_cidr_blocks" {
  type        = list(string)
  description = "List of CIDR blocks that will be used for subnets"
}
variable "avail_zones" {
  type = list(string)
  description = "List of AZs in which the subnets will be located"
}
variable "map_pub_ip" {
  type = list(bool)
  description = "Do you want the instances created in this subnet to be assigned an IP address automatically"
}
variable "subnet_names" {
  type = list(string)
  description = "List of subnet names"
}