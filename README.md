# Readme

A quick and dirty container running [Airframe's ACARS Decoder](https://github.com/airframesio/acars-decoder-typescript)
Takes in an HTTP POST request of ACARS JSON data and returns the decoding result.

## environment

- `PORT`: port the internal server will listen on
- `LOG_LEVEL`: `debug`, `info`, `error`. Set the log level of the server

## Compose

```yaml
services:
  acars-decoder:
    image: ghcr.io/fredclausen/docker-acarsdecoder:latest
    tty: false
    container_name: acars-decoder
    restart: always
    environment:
      - PORT=3000
      - LOG_LEVEL=info
```
