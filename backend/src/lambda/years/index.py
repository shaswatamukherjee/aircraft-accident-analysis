import boto3
import pandas as pd
import json
import subprocess
from os import path, environ
import base64

def lambda_handler(event, context):
    s3 = boto3.client('s3')
    try:
        verified_status = verify_auth_token(event)
        if verified_status:
            return verified_status
        s3_object = s3.get_object(Bucket=environ.get('ASSET_BUCKET'), Key=environ.get('ASSET_NAME'))
        df = pd.read_csv(s3_object['Body'])
        df['Event.Date'] = pd.to_datetime(df['Event.Date'])
        df['Year'] = df['Event.Date'].dt.year
        years_of_accident = df['Year'].drop_duplicates();
        return {
            'statusCode': 200,
            'body': years_of_accident.to_json(orient='records')
        }
    except FileNotFoundError as e:
        print(f"File not found: {e}")
        return {
            'statusCode': 500,
            'body': 'S3 File not found'
        }
    except pd.errors.EmptyDataError as e:
        print(f"Empty CSV file: {e}")
        return {
            'statusCode': 200,
            'body': '[]'
        }

    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': 'Internal Server Error'
        }

    finally:
        pass


def verify_auth_token(event):
    if event['headers'] and 'Authorization' in event['headers']:
        convertAuthToken = event['headers']['Authorization'].split(' ')[1]
        convertbytes = convertAuthToken.encode("ascii")
        convertedbytes = base64.b64decode(convertbytes)
        decodedAuthToken = convertedbytes.decode("ascii")
        if decodedAuthToken != 'admin:33fx0xy26e':
            return {
                'statusCode': 401,
                'body': 'Not Authorized'
            }
    else:
        return {
            'statusCode': 401,
            'body': 'Not Authorized'
        }