#!/bin/bash

git fetch origin
SERVER_COMPARE=$(git diff FETCH_HEAD..HEAD server)
CLIENT_COMPARE=$(git diff FETCH_HEAD..HEAD client)
git merge FETCH_HEAD
if [ -n "$SERVER_COMPARE" ]; then
  cd server
  npm i
  pm2 restart www
  echo "---------SERVER UPDATE FINISHED---------"
  cd ..
fi
if [ -n "$CLIENT_COMPARE" ]; then
  cd client
  npm i
  npm run build
  echo "---------BUILD FINISHED---------"
fi
echo "---------DEPLOY FINISHED---------"
