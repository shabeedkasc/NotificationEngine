
BIGSERIAL

400 Bad Request - when the server will not process a request because it's obvious client fault
409 Conflict - if the server will not process a request, but the reason for that is not the client's fault
...
For implicit handling of duplicates, look at 2XX:

200 OK
201 Created
...
if the server is expected to return something, look at 3XX:

302 Found
303 See Other

417 server exception