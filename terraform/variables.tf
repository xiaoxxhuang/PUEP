variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-southeast-1"
}

variable "project_name" {
  description = "Name of the project. Must be unique."
  type        = string
  default     = "puep"
}

# variable "acl_value" {
#   description = "Access control lists(ACLs) manage access to buckets and objects"
#   type        = string
#   default     = "private"
# }

locals {
  environment = lower(terraform.workspace)
}