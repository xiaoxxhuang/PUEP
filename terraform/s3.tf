resource "aws_s3_bucket" "puep_s3_bucket" {
  bucket = "${var.project_name}-${local.environment}-s3-bucket"
}

resource "aws_s3_bucket_acl" "puep_s3_bucket_acl" {
  bucket = aws_s3_bucket.puep_s3_bucket.id
  acl    = var.acl_value
}

resource "aws_s3_bucket" "puep_website_s3_bucket" {
  bucket = "${var.project_name}-${local.environment}-website-s3-bucket"
}

resource "aws_s3_bucket_acl" "puep_website_s3_bucket_acl" {
  bucket = aws_s3_bucket.puep_website_s3_bucket.id
  acl    = var.acl_value
}

resource "aws_s3_bucket_versioning" "website_versioning" {
  bucket = aws_s3_bucket.puep_website_s3_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_website_configuration" "website_config" {
  bucket = aws_s3_bucket.puep_website_s3_bucket.id

  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_object" "website_index" {
  bucket       = aws_s3_bucket.puep_website_s3_bucket.id
  for_each     = fileset("../packages/react-app/build/","**/*.*")
  key          = "${each.value}"
  source       = "../packages/react-app/build/${each.value}"
  acl          = var.acl_value
  content_type = lookup(local.mimes, element(reverse(split(".", each.value)), 0), "")
  etag         = filemd5("../packages/react-app/build/${each.value}")
}
