#!/bin/bash
set -e

### Configuration ###

APP_DIR=/home/ubuntu/
##GIT_URL=git://github.com/myusername/myapp
#GIT_URL=git@github.com:rakdman/DebtNotificationSystem.git
RESTART_ARGS=

# Uncomment and modify the following if you installed Passenger from tarball
#export PATH=/path-to-passenger/bin:$PATH


### Automation steps ###

set -x

# Pull latest code
#if [[ -e $APP_DIR ]]; then
#  cd $APP_DIR
#  git pull
#else
#  cd $APP_DIR
rm -Rf $HOME/DebtNotificationSystem
git clone https://github.com/rakdman/DebtNotificationSystem.git

cd $HOME

curl -sL https://deb.nodesource.com/setup_14.x -o setup_14.sh

sudo sh $HOME/setup_14.sh

sudo apt-get install -y nodejs

sudo apt-get update

#installing nodejs and npm
sudo apt-get install npm

cd $HOME/DebtNotificationSystem/server
npm install

#starting server
npm start &
sleep 10

#intsalling and starting client
cd $HOME/DebtNotificationSystem/client
npm install
npm start &
sleep 10


#  cd $APP_DIR
#fi

# Install dependencies
#npm install --production
#npm prune --production

# Restart app
#passenger-config restart-app --ignore-app-not-running --ignore-passenger-not-running $RESTART_ARGS $APP_DIR/code