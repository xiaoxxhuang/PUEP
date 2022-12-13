# Bucket for storing lambda function
resource "aws_s3_bucket" "puep_s3_bucket" {
  bucket = "${var.project_name}-${local.environment}-s3-bucket"
}

resource "aws_s3_bucket_acl" "puep_s3_bucket_acl" {
  bucket = aws_s3_bucket.puep_s3_bucket.id
  acl    = var.acl_value
}
# Bucket for storing react app
resource "aws_s3_bucket" "puep_website_s3_bucket" {
  bucket = "${var.project_name}-${local.environment}-website-s3-bucket"
}

resource "aws_s3_bucket_acl" "puep_website_s3_bucket_acl" {
  bucket = aws_s3_bucket.puep_website_s3_bucket.id
  acl    = var.acl_value
}

resource "aws_s3_bucket_public_access_block" "puep_bucket_public_access" {
  bucket = aws_s3_bucket.puep_website_s3_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "puep_website_versioning" {
  bucket = aws_s3_bucket.puep_website_s3_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_website_configuration" "puep_website_config" {
  bucket = aws_s3_bucket.puep_website_s3_bucket.id

  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_policy" "puep_website_policy" {
  bucket = aws_s3_bucket.puep_website_s3_bucket.id
  policy = jsonencode(
    {
      "Version": "2008-10-17",
      "Id": "PolicyForCloudFrontPrivateContent",
      "Statement": [
        {
          "Sid": "AllowCloudFrontServicePrincipal",
          "Effect": "Allow",
          "Principal": {
            "Service": "cloudfront.amazonaws.com"
          },
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::puep-dev-website-s3-bucket/*",
          "Condition": {
            "StringEquals": {
              "AWS:SourceArn": "arn:aws:cloudfront::385526948728:distribution/E377H9VW6UCVZM"
            }
          }
        }
      ]
    }
  )
}

resource "aws_s3_object" "puep_website_index" {
  bucket       = aws_s3_bucket.puep_website_s3_bucket.id
  for_each     = fileset("../packages/react-app/build/","**/*.*")
  key          = "${each.value}"
  source       = "../packages/react-app/build/${each.value}"
  acl          = var.acl_value
  content_type = lookup(local.mimes, element(reverse(split(".", each.value)), 0), "")
  etag         = filemd5("../packages/react-app/build/${each.value}")
}