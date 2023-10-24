from aws_cdk import (
    aws_s3 as s3,
    aws_s3_deployment as s3_deployment,
    aws_cloudfront as cloudfront,
    aws_iam as iam,
    RemovalPolicy,
    CfnOutput
)
from constructs import Construct

class FrontendStack(Construct):
    def __init__(self, scope: Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)
        website_bucket = s3.Bucket(
            self,
            "AngularAppBucket",
            removal_policy=RemovalPolicy.DESTROY,  # Use DESTROY carefully; it will delete the S3 bucket on stack deletion
            website_index_document="index.html",
            website_error_document="index.html"
        )
        public_read_statement = iam.PolicyStatement(
            actions=["s3:GetObject"],
            effect=iam.Effect.ALLOW,
            resources=[f"{website_bucket.bucket_arn}/*"],
            principals=[iam.AnyPrincipal()]
        )
        # Add the statement to the bucket policy
        website_bucket.add_to_resource_policy(public_read_statement)
        s3_deployment.BucketDeployment(self, "DeployAngularApp",
            sources=[s3_deployment.Source.asset("../angular-app/dist/angular-app")],  # Replace with the path to your Angular app's dist directory
            destination_bucket=website_bucket
        )
        cloudfront_distribution = cloudfront.CloudFrontWebDistribution(self, "AngularAppDistribution",
            origin_configs=[
                cloudfront.SourceConfiguration(
                    s3_origin_source=cloudfront.S3OriginConfig(s3_bucket_source=website_bucket),
                    behaviors=[cloudfront.Behavior(is_default_behavior=True)]
                )
            ]
        )

        # Output the CloudFront distribution URL
        CfnOutput(self, "DistributionURL",
            value=cloudfront_distribution.distribution_domain_name
        )
        self.cloudfront_distribution = cloudfront_distribution