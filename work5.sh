#!/bin/bash
git clone https://github.com/rakdman/DebtNotificationSystem.git
sudo apt-get update
sudo apt-get install -y nodejs
sudo apt-get update
sudo apt-get install npm
cd /DebtNotificationSystem/server
npm install
npm start &
sleep 10
cd /DebtNotificationSystem/client
npm install
npm start &
sleep 10
