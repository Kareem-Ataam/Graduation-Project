# Creation of the application load balancer and its related resources
resource "aws_lb" "alb" {
  name               = var.alb_name
  internal           = var.alb_internal_or_public
  load_balancer_type = var.alb_type
  security_groups    = [var.sg_id]
  subnets            = var.subnet_id_list
  tags = {
    Name = "App-ALB"
  }
}
resource "aws_lb_target_group" "alp-tg" {
  name     = "app-tg"
  port     = var.tg_port
  protocol = var.tg_protocol
  vpc_id   = var.vpc_id

  health_check {
    path                = "/"
    protocol            = var.tg_protocol
    timeout             = 5
    interval            = 10
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
}
resource "aws_lb_listener" "front_end" {
  load_balancer_arn = aws_lb.alb.arn
  port              = var.tg_port
  protocol          = var.tg_protocol
  ###############################################Modify for HTTPS################################## 
  #ssl_policy        = "ELBSecurityPolicy-2016-08"
  #certificate_arn   = "arn:aws:iam::187416307283:server-certificate/test_cert_rab3wuqwgja25ct3n4jdj2tzu4"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.alp-tg.arn
  }
}
#Note from the root module you should only pass the instances that you want to be part of  this Target Group
resource "aws_lb_target_group_attachment" "app-tg-alb" {
  count            = length(var.instance_id_list)
  target_group_arn = aws_lb_target_group.alp-tg.arn
  target_id        = var.instance_id_list[count.index].id
  port             = var.tg_port
}
