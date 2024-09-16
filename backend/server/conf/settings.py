import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

DEBUG = os.getenv('DEBUG') in ['True', 'true', 't', '1']
ORIGINS = str(os.getenv('ORIGINS')).split(',')
HOST = os.getenv('HOST')
PORT = int(os.getenv('PORT'))
DB_URL = os.getenv('DATABASE')

BASE_DIR = Path(__file__).resolve().parent.parent
