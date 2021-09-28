#!/bin/bash
APP_DIR=/home/ubuntu/
rm -Rf $HOME/DebtNotificationSystem
git clone https://github.com/rakdman/DebtNotificationSystem.git
cd $HOME
sudo apt-get install -y nodejs
sudo apt-get update
sudo apt-get install npm
cd $HOME/DebtNotificationSystem/server
npm install
npm start &
sleep 10
cd $HOME/DebtNotificationSystem/client
npm install
npm start &
sleep 10
