resource "aws_s3_bucket" "puep_s3_bucket" {
  bucket = "${var.project_name}-${local.environment}-s3-bucket"
}

resource "aws_s3_bucket_acl" "puep_s3_bucket_acl" {
  bucket = aws_s3_bucket.puep_s3_bucket.id
  acl    = var.acl_value
}