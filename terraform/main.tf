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

resource "aws_dynamodb_table" "puep-dynamodb" {
  name           = "puep-dynamodb"
  billing_mode   = "PAY_PER_REQUEST"
  #hash_key = partition key   
  hash_key       = "pk"
  #range_key = sort key
  range_key      = "sk"
  
  attribute {
    name = "pk"
    type = "S"
  }

  attribute {
    name = "sk"
    type = "S"
  }
}