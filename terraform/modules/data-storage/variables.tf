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