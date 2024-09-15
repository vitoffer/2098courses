
FROM python:3.10

WORKDIR /code

COPY ./requirements/prod.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./server /code/server

WORKDIR /code/server

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"cd  ]
