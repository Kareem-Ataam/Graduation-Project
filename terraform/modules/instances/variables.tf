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
