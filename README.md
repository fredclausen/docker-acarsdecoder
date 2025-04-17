# Readme

A quick and dirty container running [Airframe's ACARS Decoder](https://github.com/airframesio/acars-decoder-typescript).
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

## running

After starting the docker container, you can have a play with it like so:

```shell
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"assstat":"skipped","channel":1,"error":0,"freq":131.45,"label":"SQ","level":-12.9,"mode":"2","station_id":"MN-YPPH","text":"01XAPERYPPH1ARINC","timestamp":1645288410.698817}' \
  http://localhost:3000/decode
```

And you should see a response:

```shell
{"decoded":true,"decoder":{"name":"label-sq","type":"pattern-match","decodeLevel":"full"},"formatted":{"description":"Ground Station Squitter","items":[{"type":"network","code":"NETT","label":"Network","value":"ARINC"},{"type":"version","code":"VER","label":"Version","value":"1"}]},"raw":{"preamble":"01XA","version":"1","network":"A"},"remaining":{}}
```
