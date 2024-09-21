# 2098Courses backend-api

## Dev project

1. Clone the project

```sh
git clone https://github.com/vitoffer/2098courses.git
```

2. Go to directory where repo were clonned

```sh
cd 2098courses/
```

3.  Checkout to dev branch of backend and go to backend directory

```sh
git checkout backend
cd backend/
```

4. Copy `template.env` to `.env` file in `conf` directory in `server` app

```sh
mv template.env > server/conf/.env
```

5. Edit `.env` file
6. Make python virtual environment

```sh
python3 -m venv .venv
```

7. Activate virtual environment

```sh
source .venv/bin/activate
```

8. Install dev and prod requirements

```sh
pip3 install -r requirements/prod.txt -r requirements/dev.txt
```

**Now you can run project**

```sh
python server/manage.py -r
```

## For testing

1. All steps form higher
2. Install test depencies

```sh
pip3 install -r requirements/test.txt
```

3. Run project for test

```sh
python3 server/manage.py -t
```

## From Docker for development

1. Install [Docker](https://docs.docker.com/engine/install/)
2. Build Docker image

```sh
docker build -t <name_what_you_prefer> .
```

3. Run Docker image

```sh
docker run -p 80:80 <image_name>
```

<!-- Сделать расписание словариком -->
<!-- миграция с переносом данных -->
