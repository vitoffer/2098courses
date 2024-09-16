import argparse
import uvicorn

from conf.settings import HOST, PORT, DEBUG


parser = argparse.ArgumentParser(
    prog='API server',
    description='Run API server, make migrations, test the code',
    epilog='',
)

parser.add_argument('-r', '--runserver', action='store_true')
parser.add_argument('-t', '--testserver', action='store_true')


def run():
    uvicorn.run('conf.server:app', host=HOST, port=PORT, reload=DEBUG)


# Запуск скрипта
if __name__ == '__main__':
    args = parser.parse_args()
    if args.runserver:
        run()
    else:
        ...
        # Сдесь будет код запуска тестов
