#When passing the list of instance IDs to the aws_lb_target_group_attachment in the module alb note that
#we want to exclude the first instance that we will create which is the bastion host, so dont pass full list
#For security group
#1-->bastion host
#2-->swarm-nodes
#3-->alb
#4-->RDS
#Change the publicly_accessible in db creation
module "web-vpc" {
  source             = "./modules/vpc"
  vpc_cidr_block     = var.vpc_cidr_block
  env-prefix         = var.env-prefix
  subnet_cidr_blocks = var.subnet_cidr_blocks
  avail_zones        = var.avail_zones
  subnet_names       = var.subnet_names
  map_pub_ip         = var.map_pub_ip
}
resource "aws_route_table_association" "rt-assoc-public-1" {
  subnet_id      = module.web-vpc.subnet_id_list[0]
  route_table_id = module.web-vpc.public_RT_id
}
resource "aws_route_table_association" "rt-assoc-public-2" {
  subnet_id      = module.web-vpc.subnet_id_list[2]
  route_table_id = module.web-vpc.public_RT_id
}
# resource "aws_route_table_association" "rt-assoc-public-3" {
#   subnet_id      = module.web-vpc.subnet_id_list[4]
#   route_table_id = module.web-vpc.public_RT_id
# }
resource "aws_route_table_association" "rt-assoc-private-1" {
  subnet_id      = module.web-vpc.subnet_id_list[1]
  route_table_id = module.web-vpc.private_RT_id
}
resource "aws_route_table_association" "rt-assoc-private-2" {
  subnet_id      = module.web-vpc.subnet_id_list[3]
  route_table_id = module.web-vpc.private_RT_id
}
# resource "aws_route_table_association" "rt-assoc-private-3" {
#   subnet_id      = module.web-vpc.subnet_id_list[5]
#   route_table_id = module.web-vpc.private_RT_id
# }
module "instances" {
  source               = "./modules/instances"
  number_of_sgs        = var.number_of_sgs
  sg_names             = var.sg_names
  descriptions         = var.descriptions
  sg_name_tags         = var.sg_name_tags
  ingress_rules        = var.ingress_rules
  public_key_path      = var.public_key_path
  ami_list             = var.ami_list
  instance_types       = var.instance_types
  instance_names       = var.instance_names
  vpc_id               = module.web-vpc.vpc_id
  user_data_file_paths = var.user_data_file_paths
  subnet_info          = [module.web-vpc.subnet_id_list[0], module.web-vpc.subnet_id_list[1], module.web-vpc.subnet_id_list[3]]
}
module "web-alb" {
  source                 = "./modules/alb"
  alb_name               = var.alb_name
  alb_internal_or_public = var.alb_internal_or_public
  alb_type               = var.alb_type
  sg_id                  = module.instances.instance_id_list[0] #####################Note#####################
  subnet_id_list         = [module.web-vpc.subnet_id_list[0], module.web-vpc.subnet_id_list[2]]
  tg_port                = var.tg_port #Change for HTTPs
  tg_protocol            = var.tg_protocol
  vpc_id                 = module.web-vpc.vpc_id
  instance_id_list       = [module.instances.instance_id_list[1], module.instances.instance_id_list[2]]
}

# module "app-db" {
#   source            = "./modules/database"
#   subnet_id_list_db = [module.web-vpc.subnet_id_list[1]]
#   db_password       = var.db_password
#   db_sg             = module.instances.sg_id_list[3]
# }
