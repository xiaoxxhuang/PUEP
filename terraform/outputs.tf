# Output value definitions

output "s3_bucket_name" {
  description = "Name of the S3 bucket used to store function code."
  value = aws_s3_bucket.puep_s3_bucket.id
}