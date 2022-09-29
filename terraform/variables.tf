variable "project_name" {
  description = "Name of the project. Must be unique."
  type        = string
  default     = "puep"
}

variable "environment" {
  description = "Environment of the project."
  type        = string
  default  = "dev" 
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-southeast-1"
}

variable "aws_profile" {
  description = "AWS profile"
  type = string
  default = "puep-terraform"
}