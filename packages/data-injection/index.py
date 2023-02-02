import json
import base64
import uuid
import datetime
from urllib.parse import unquote_plus
import time
import boto3

s3_client=boto3.client('s3')
client_dynamodb=boto3.resource('dynamodb')
table=client_dynamodb.Table('puep-dev-ddb')

bucket="pueptest"

def lambda_handler(event, context):
    print(event)

    emblem_name=event['queryStringParameters']['emblem_name']
    emblem_type=event['queryStringParameters']['emblem_type']
    attack=event['queryStringParameters']['attack']
    special_attack=event['queryStringParameters']['special_attack']
    color=event['queryStringParameters']['color']
    file_name=event['queryStringParameters']['file_name']
    image_body=base64.b64decode(event['body'])
    file_name_splitter=file_name.split('.')
    key=file_name_splitter[0] + '_' + str(uuid.uuid4()) + '.' + file_name_splitter[1]
    url_path='{}/{}/{}'.format(s3_client.meta.endpoint_url, bucket, key)

    response = s3_client.put_object(
        Body=image_body,
        Bucket=bucket,
        Key=key,
    )

    response = table.put_item(
        Item={
            'pk':f'pkm:{emblem_name}',
            'sk':f'type:{emblem_type}',
            'attack':attack,
            'special_attack': special_attack,
            'color':color,
            'url': str(url_path)
        }
    )

    return {
        'statusCode': 200,
        'body': json.dumps('Image uploaded successfully')
    }