# Decoded JSON Format

## Basic response will look like the following

```json
{
  "decoded": true,
  "decoder": {
    "name": "label-sq",
    "type": "pattern-match",
    "decodeLevel": "full"
  },
  "formatted": {
    "description": "Ground Station Squitter",
    "items": [
      {
        "type": "network",
        "code": "NETT",
        "label": "Network",
        "value": "ARINC"
      },
      {
        "type": "version",
        "code": "VER",
        "label": "Version",
        "value": "1"
      }
    ]
  },
  "raw": {
    "preamble": "01XA",
    "version": "1",
    "network": "A"
  },
  "remaining": {}
}
```

## Explanation of keys

### Top level

| Key         | Information                                                                                                                            | Type                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `decoded`   | The decoded state.                                                                                                                     | boolean               |
| `decoder`   | Information about the decoder that handled the response. May be useful for determining if the rest of the response is worth looking at | JSON Object           |
| `formatted` | If `decoded` is `true`, this is the human-readable information about the information.                                                  | JSON Object           |
| `raw`       | Internal information about how the decoder handled the information                                                                     | JSON Object           |
| `message`   | More decoded information. Dependent on the decoder generating the response.                                                            | JSON Object or String |
| `remaining` | Any text that was in the ACARS Message that the decoder did not handle                                                                 | String (I think)      |

### formatted

| Key           | Information                                                                                                                                                                                                     | Type                  |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `description` | Human-readable name of the message type                                                                                                                                                                         | String                |
| `items`       | An array of JSON objects containing the information decoded. The exact number, as well as the specific meaning of the keys is decoder dependent. It should always contain the keys listed above in the example. | Array of JSON Objects |
