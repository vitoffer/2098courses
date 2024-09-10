import argparse
import uvicorn

from .settings import HOST, PORT

parser = argparse.ArgumentParser(
    prog='API server',
    description='Run API server, make migrations, test the code',
    epilog=''
)

parser.add_argument(
    '-r', '--runserver', action='store_true'
)
parser.add_argument(
    '-t', '--testserver', action='store_true'
)

# Запуск сервера
def run(app):
    uvicorn.run(app, host=HOST, port=PORT)

# Запуск тестирования API
def test():
    pass

# Парсинг скрипта
def called(app):
    args = parser.parse_args()
    if args.runserver:
        run(app)
