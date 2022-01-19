#!/bin/sh

while ! nc -z db 3316 ; do
    echo "Waiting for the MySQL Server"
    sleep 3
done

npm start