import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

DEBUG = os.getenv('DEBUG') in ['True', 'true', 't', '1']
ORIGINS = os.getenv('ORGINS').split(',')
HOST = os.getenv('HOST')
PORT = int(os.getenv('POST'))
DB_URL = os.getenv('DATABASE')

BASE_DIR = Path(__file__).resolve().parent.parent
