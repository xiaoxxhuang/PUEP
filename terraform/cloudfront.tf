resource aws_cloudfront_distribution frontend {
  origin {
    domain_name = aws_s3_bucket.puep_website_s3_bucket.bucket_regional_domain_name
    origin_id   = "s3-${local.environment}"
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Distribution for PUEP website"
  default_root_object = "index.html"

  aliases = []

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "s3-${local.environment}"

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_100"

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  wait_for_deployment = true
}
