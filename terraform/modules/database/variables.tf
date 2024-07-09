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
