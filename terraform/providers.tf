# terraform {
#   backend "s3" {
#     bucket = "puep-state-s3-bucket"
#     key    = "tf-workspaces/terraform.tfstate"
#     region = "ap-southeast-1"
#   }
# }

provider "aws" {
  # profile = var.aws_profile
  region  = var.aws_region
}
