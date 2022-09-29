variable "project_name" {
  description = "Name of the project. Must be unique."
  type        = string
  value       = "puep"
}

variable "environment" {
  description = "Environment of the project."
  type        = string
  value       = "dev" 
}