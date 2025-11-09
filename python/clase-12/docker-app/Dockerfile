FROM python:3.11.9

WORKDIR /docker-app

COPY requirements.txt /docker-app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /docker-app/requirements.txt

COPY . /docker-app

CMD bash -c "while true; do sleep 1; done"