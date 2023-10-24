import boto3
import pandas as pd
import json
import subprocess
from os import path, environ
import base64

def test_lambda_handler(event, context):
    try:
        if event['queryStringParameters'] is not None and 'year' in event['queryStringParameters']:
            target_year = event['queryStringParameters']['year']
        else:
            print({
                'statusCode': 400,
                'body': 'Invalid Request'
            })
        df = pd.read_csv(path.join('src','lambda','assets','AviationData.csv'))
        df['Event.Date'] = pd.to_datetime(df['Event.Date'])
        df['Year'] = df['Event.Date'].dt.year
        df = df[df['Year'] == target_year]
        accidents_response_dataset = df;
        print({
            'statusCode': 200,
            'body': accidents_response_dataset.to_json(orient='records')
        })
    except FileNotFoundError as e:
        print(f"File not found: {e}")
        print({
            'statusCode': 500,
            'body': 'S3 File not found'
        })
    except pd.errors.EmptyDataError as e:
        print(f"Empty CSV file: {e}")
        print({
            'statusCode': 200,
            'body': '[]'
        })

    except Exception as e:
        print(f"Error: {e}")
        print({
            'statusCode': 500,
            'body': 'Internal Server Error'
        })

    finally:
        pass

# test_lambda_handler({},{})
test_lambda_handler({'queryStringParameters':{'year':'1979'}},{})
