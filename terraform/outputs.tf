# Output value definitions

output "s3_bucket_name" {
  description = "Name of the S3 bucket used to store function code."
  value = aws_s3_bucket.puep_s3_bucket.id
}

output "function_name" {
  description = "Name of the Lambda function."
  value = aws_lambda_function.lambda.function_name
}

output "base_url" {
  description = "Base URL for API Gateway stage."
  value = aws_apigatewayv2_stage.lambda.invoke_url
}

