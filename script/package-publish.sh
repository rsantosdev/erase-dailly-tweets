#!/bin/sh

# script/package - packages the application for deployment

# exit on sub-module failure
set -e

cd "$(dirname "$0")/.."

# ------

echo "Packaging..."

docker build -t erase-daily-tweets .
docker tag erase-daily-tweets rsantosdev/erase-daily-tweets:latest
docker push rsantosdev/erase-daily-tweets

echo "Done packaging!"

# ------
