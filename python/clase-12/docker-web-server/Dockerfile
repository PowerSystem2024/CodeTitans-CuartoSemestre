FROM python:3.11.9

WORKDIR /app

COPY requirements.txt /docker-app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /docker-app/requirements.txt --no-warn-script-location

COPY . /docker-app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0","--port", "80"]
