terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 1.2.9"
}

provider "aws" {
  profile = "puep-terraform"
  region  = "ap-southeast-1"
}

module "puep_dynamodb" {
  source = "./modules/dynamodb"
}