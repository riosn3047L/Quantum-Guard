FROM python:3.12-slim

# Install build tools for C extensions (nassl/sslze)
RUN apt-get update && apt-get install -y \
    build-essential \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Cloud Functions expects the functions-framework to listen on $PORT
ENV PORT=8080
EXPOSE ${PORT}

CMD exec functions-framework --target=api --port=${PORT}
