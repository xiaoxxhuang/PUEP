resource "aws_dynamodb_table" "dynamodb_table" {
  name           = "${var.project_name}-${var.env}-ddb"
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