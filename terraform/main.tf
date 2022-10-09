terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 1.2.9"
}

module "puep_dev_ddb" {
  source = "./modules/data-storage"
  environment = "dev"
}

module "puep_prod_ddb" {
  source = "./modules/data-storage"
  environment = "prod"
}

module "puep_dev_s3_bucket" {
  source = "./modules/data-storage"
  environment = "dev"
}

# resource "aws_apigatewayv2_api" "lambda" {
#   name          = "serverless_lambda_gw"
#   protocol_type = "HTTP"
# }