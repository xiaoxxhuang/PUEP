data "archive_file" "lambda_api" {
  type = "zip"

  source_dir  = "../packages/lambda/dist"
  output_path = "${path.module}/lambda.zip"
}

resource "aws_s3_object" "lambda_api" {
  bucket = "${var.project_name}-${local.environment}-s3-bucket"

  key    = "lambda.zip"
  source = data.archive_file.lambda_api.output_path

  etag = filemd5(data.archive_file.lambda_api.output_path)
}

resource "aws_lambda_function" "lambda" {
  function_name = "Lambda"

  s3_bucket = "${var.project_name}-${local.environment}-s3-bucket"
  s3_key    = aws_s3_object.lambda_api.key

  runtime = "nodejs16.x"
  handler = "index.lambdaHandler"

  source_code_hash = data.archive_file.lambda_api.output_base64sha256

  role = aws_iam_role.lambda_role.arn

  environment {
    variables = {
      PROJECT_NAME = var.project_name
      NODE_ENV = local.environment
      REGION = var.aws_region
      DYNAMODB_TABLE_NAME = aws_dynamodb_table.puep_ddb.name
    }
  }
}

resource "aws_cloudwatch_log_group" "lambda" {
  name = "/aws/lambda/${aws_lambda_function.lambda.function_name}"

  retention_in_days = 30
}

resource "aws_iam_role" "lambda_role" {
  name = "PUEPLambdaRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

resource "aws_iam_policy" "lambda_policy" {
  name = "PUEPLambdaRolePolicy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "dynamodb:BatchGetItem",
          "dynamodb:GetItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:BatchWriteItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem"
        ]
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy_attachment" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}
