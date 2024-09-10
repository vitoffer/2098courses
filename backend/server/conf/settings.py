import os
from dotenv import load_dotenv

load_dotenv()

DEBUG = os.getenv('DEBUG') in ['True', 'true', 't', '1']
ORIGINS = os.getenv('ORGINS').split(',')
HOST = os.getenv('HOST')
PORT = int(os.getenv('POST'))
DB_URL = os.getenv('DATABASE')
