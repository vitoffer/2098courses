import os
from dotenv import load_dotenv
from pathlib import Path
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer

load_dotenv()

DEBUG = os.getenv('DEBUG') in ['True', 'true', 't', '1']
ORIGINS = str(os.getenv('ORIGINS')).split(',')
HOST = os.getenv('HOST')
PORT = int(os.getenv('PORT'))
SECRET = os.getenv('SECRET')
DB_URL = os.getenv('DATABASE')
ALGORITHM = os.getenv('ALGORITHM')
EXPIRE_DELTA = int(os.getenv('DELTA'))

PWD_CONTEXT = CryptContext(schemes=['bcrypt'], deprecated='auto')
AUTH_SCHEME = OAuth2PasswordBearer(tokenUrl='auth/token')

BASE_DIR = Path(__file__).resolve().parent.parent
