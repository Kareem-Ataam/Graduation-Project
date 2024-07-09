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
