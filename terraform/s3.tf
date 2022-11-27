resource "aws_s3_bucket" "puep_s3_bucket" {
  bucket = "${var.project_name}-${local.environment}-s3-bucket"
}

resource "aws_s3_bucket_acl" "puep_s3_bucket_acl" {
  bucket = aws_s3_bucket.puep_s3_bucket.id
  acl    = var.acl_value
}

# ------------------------------------------------------------------------ 
resource "aws_s3_bucket" "puep_website_s3_bucket" {
  bucket = "${var.project_name}-${local.environment}-website-s3-bucket"
}

resource "aws_s3_bucket_acl" "puep_website_s3_bucket_acl" {
  bucket = aws_s3_bucket.puep_website_s3_bucket.id
  acl    = "public-read"
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

resource "aws_s3_bucket_policy" "website_policy" {
  bucket = aws_s3_bucket.puep_website_s3_bucket.id
  policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Sid" : "PublicReadGetObject",
          "Effect" : "Allow",
          "Principal" : "*",
          "Action" : "s3:GetObject",
          "Resource" : "arn:aws:s3:::${aws_s3_bucket.puep_website_s3_bucket.id}/*"
        }
      ]
    }
  )
}

resource "aws_s3_object" "website_index" {
  bucket       = aws_s3_bucket.puep_website_s3_bucket.bucket
  key          = "index.html"
  source       = "../packages/react-app/build/index.html"
  acl          = "public-read"
  content_type = "text/html"
}
