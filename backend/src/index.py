from os import path, system
from aws_cdk import (
    Stack,
    aws_s3 as s3,
    aws_s3_assets as s3_assets,
    aws_s3_deployment as s3_deployment,
    aws_lambda as lambda_,
    aws_apigateway as apigateway,
    aws_iam as iam,
    aws_cloudfront as cloudfront,
    Duration,
    RemovalPolicy,
    CfnOutput
)
from constructs import Construct
from config.config import config

class BackendStack(Construct):
    def __init__(self, scope: Construct, construct_id: str, frontend_cdn: cloudfront.CloudFrontWebDistribution,**kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        s3BucketNameDatasheet = config["env"]["s3BucketNameDatasheet"]
        asset_bucket = s3.Bucket(
            self,
            s3BucketNameDatasheet,
            removal_policy=RemovalPolicy.DESTROY,
        )
        lambda_assets_path = path.join("src", "lambda", "assets")
        asset = s3_deployment.Source.asset(lambda_assets_path)
        s3_deployment.BucketDeployment(
            self,
            "MyAssetDeployment",
            sources=[asset],
            destination_bucket=asset_bucket
        )
        query_lambda = lambda_.DockerImageFunction(self, "QueryLambdaFunction",
            code=lambda_.DockerImageCode.from_image_asset("src/lambda/query"),
            architecture=lambda_.Architecture.ARM_64,
            timeout=Duration.seconds(60),
            memory_size=512,
            environment = {
                "ASSET_BUCKET": asset_bucket.bucket_name,
                "ASSET_NAME": "AviationData.csv"
            }
        )
        query_lambda.add_to_role_policy(iam.PolicyStatement(actions=["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"], resources=["*"]))
        asset_bucket.grant_read(query_lambda)
        years_lambda = lambda_.DockerImageFunction(self, "YearsLambdaFunction",
            code=lambda_.DockerImageCode.from_image_asset("src/lambda/years"),
            architecture=lambda_.Architecture.ARM_64,
            timeout=Duration.seconds(60),
            memory_size=512,
            environment = {
                "ASSET_BUCKET": asset_bucket.bucket_name,
                "ASSET_NAME": "AviationData.csv"
            }
        )
        years_lambda.add_to_role_policy(iam.PolicyStatement(actions=["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"], resources=["*"]))
        asset_bucket.grant_read(years_lambda)
        api = apigateway.RestApi(
            self,
            "MyApi",
            default_cors_preflight_options={
                "allow_origins": ['https://'+frontend_cdn.distribution_domain_name],
                "allow_methods": apigateway.Cors.ALL_METHODS
            }
        )
        api.root.add_resource("query").add_method("GET", apigateway.LambdaIntegration(query_lambda))
        api.root.add_resource("years").add_method("GET", apigateway.LambdaIntegration(years_lambda))
        api_usage_plan = api.add_usage_plan("UsagePlan",
            name=api.rest_api_name+"UsagePlan",
            throttle=apigateway.ThrottleSettings(
                rate_limit=10,
                burst_limit=2
            )
        )
        api_key = api.add_api_key(api.rest_api_name+"ApiKey")
        api_usage_plan.add_api_key(api_key)
        CfnOutput(self, 'HTTP API Url', value=api.url)