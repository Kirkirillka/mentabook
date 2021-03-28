FROM python:3 as build

WORKDIR /app

ADD requirements.txt .
RUN pip install -r requirements.txt


FROM build as run

WORKDIR /app
ADD . .

EXPOSE 8000

ENTRYPOINT [ "python", "manage.py", "runserver", "0.0.0.0:5000" ]

