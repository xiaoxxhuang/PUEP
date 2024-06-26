terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.38.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.2.0"
    }
  }
  backend "s3" {
    bucket         = "puep-state-s3-bucket"
    key            = "tf-workspaces/terraform.tfstate"
    region         = "ap-southeast-1"
    dynamodb_table = "puep-dev-state-lock-ddb"
  }
  required_version = ">= 1.3.4"
}
