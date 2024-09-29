import argparse
import uvicorn

from conf.settings import HOST, PORT, DEBUG
from conf.depencies import cerate_su, create_api_token


parser = argparse.ArgumentParser(
    prog='API server',
    description='Run API server, make migrations, test the code',
    epilog='',
)

parser.add_argument('-r', '--runserver', action='store_true')
parser.add_argument('-t', '--testserver', action='store_true')
parser.add_argument('-su', '--create_superuser', action='store_true')
parser.add_argument('-at', '--api_token', action='store_true')


def run():
    uvicorn.run('conf.server:app', host=HOST, port=PORT, reload=DEBUG)


# Запуск скрипта
if __name__ == '__main__':
    args = parser.parse_args()
    if args.runserver:
        run()
    # Создание супер-пользователя(админа)
    elif args.create_superuser:
        cerate_su()
    elif args.api_token:
        print(create_api_token(input('Введите свой хост(вместе с портом):')))
    ...
    # Сдесь будет код запуска тестов
