resource "aws_dynamodb_table" "puep_ddb" {
  name         = "${var.project_name}-${local.environment}-ddb"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "pk"

  attribute {
    name = "pk"
    type = "S"
  }
}

resource "aws_dynamodb_table" "puep_state_lock_ddb" {
  name         = "${var.project_name}-${local.environment}-state-lock-ddb"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}
