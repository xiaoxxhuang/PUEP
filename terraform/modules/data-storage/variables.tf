variable "environment" {
  description = "Environment of the project."
  type        = string
  default  = "dev" 
}

variable "project_name" {
  description = "Name of the project. Must be unique."
  type        = string
  default     = "puep"
}

variable "acl_value" {
  description = "Access control lists(ACLs) manage access to buckets and objects"
  type        = string
  default     = "private"
}