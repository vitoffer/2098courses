
FROM python:3.10

WORKDIR /code

COPY ./requirements/prod.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./server /code/server

CMD ["python", "server/manage.py", "-r"]
