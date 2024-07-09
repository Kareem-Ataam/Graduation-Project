variable "aws_region" {
  type        = string
  description = "Region in which the infra is in"
}
variable "vpc_cidr_block" {
  type = string
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
  type        = list(string)
  description = "List of AZs in which the subnets will be located"
}
variable "map_pub_ip" {
  type        = list(bool)
  description = "Do you want the instances created in this subnet to be assigned an IP address automatically"
}
variable "subnet_names" {
  type        = list(string)
  description = "List of subnet names"
}

############################Instance Variables####################################
variable "vpc_id" {
  type        = string
  description = "The ID of the VPC that the infra is in"
}
variable "number_of_sgs" {
  type        = number
  description = "Number of security groups"
}
variable "sg_names" {
  type        = list(string)
  description = "Names of the security groups"
}
variable "descriptions" {
  type        = list(string)
  description = "List of the descriptions for the security groups to create"
}
variable "sg_name_tags" {
  type        = list(string)
  description = "List of strings that will be used as tag names"
}
variable "ingress_rules" {
  type = list(list(object({
    from_port   = number
    to_port     = number
    protocol    = string
    cidr_blocks = list(string)
  })))
}
variable "public_key_path" {
  type        = string
  description = "Path of the ssh public key"
}
####################Variables for the instances#####################
variable "ami_list" {
  type        = list(string)
  description = "List of the AMI"
}
variable "instance_types" {
  type        = list(string)
  description = "List of the instance types"
}
variable "subnet_info" {
  type        = list(string)
  description = "Subnet IDs to create the instances in"
}
variable "user_data_file_paths" {
  type        = list(string)
  description = "List of the user data file paths"
}
variable "instance_names" {
  type        = list(string)
  description = "The name of the EC2 Instances."
}
variable "alb_name" {
  type        = string
  description = "Name of the load balancer"
}
variable "alb_internal_or_public" {
  type        = bool
  description = "Is the load balancer will be internal"
}
variable "alb_type" {
  type        = string
  description = "Type of the load balancer"
}
variable "sg_id" {
  type        = string
  description = "Value for security group id to attach to this resource"
}
variable "subnet_id_list" {
  type        = list(string)
  description = "List of subnet to associate to the load balancer"
}
variable "tg_port" {
  type        = string
  description = "The port of the target group"
}
variable "tg_protocol" {
  type        = string
  description = "The protocol of the target group"
}
variable "vpc_id" {
  type        = string
  description = "The ID of the VPC in which the TG will be in"
}
variable "instance_id_list" {
  type = list(string)
}

################################Database Vars#############################
variable "subnet_id_list_db" {
  type        = list(string)
  description = "List of subnet IDs in which the Database will be created"
}
variable "db_password" {
  type        = string
  description = "Password of the database"
  sensitive   = true
}
variable "db_sg" {
  type        = list(string)
  description = "List of IDs used as  Security Groups for DB."
}
