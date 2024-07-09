#Group of subnets in which the DB will be deployed
resource "aws_db_subnet_group" "db_subnet_grp" {
  name       = "db_subnet_grp"
  subnet_ids = var.subnet_id_list_db

  tags = {
    Name = "db_subnet_grp"
  }
}
resource "aws_db_instance" "prod-db" {
  identifier             = "project-prod-db"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  engine                 = "sqlserver-ex"
  engine_version         = "15.00.4355.3.v1"
  username               = "admin"
  password               = var.db_password
  db_name                = "initial_db"
  db_subnet_group_name   = aws_db_subnet_group.db_subnet_grp.name
  vpc_security_group_ids = var.db_sg
  publicly_accessible    = true ######Change that
  skip_final_snapshot    = true
  license_model          = "license-included"
}
