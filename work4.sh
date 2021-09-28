#!/bin/bash
SERVER_PATH=/home/ubuntu/DebtNotificationSystem/server
CLIENT_PATH=/home/ubuntu/DebtNotificationSystem/server
git clone https://github.com/rakdman/DebtNotificationSystem.git
sudo apt-get update
sudo apt-get install -y nodejs
sudo apt-get update
sudo apt-get install npm
#cd $SERVER_PATH
npm install
npm start &
sleep 10
#cd $CLIENT_PATH
npm install
npm start &
sleep 10
