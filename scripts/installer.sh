#!/bin/bash

# Variables
PROJECT_NAME="cigar_matrix"
PROJECT_DIR="/opt/$PROJECT_NAME"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}" )" && pwd)"
WORKSPACE=$(dirname ${DIR})
NODE_VERSION="14.x"  # You can change it to the desired Node.js version
MONGO_DIR="/data/db"

function tryexec() {
  "$@"
  retval=$?
  [[ $retval -eq 0 ]] && return 0
  echo "Error: Following command has failed"
  echo "  $@"
  echo "Value returned: ${retval}"
  exit 254
}

echo "Updating system packages..."
tryexec sudo apt update && sudo apt upgrade -y

function install_packages() {
    echo "Installing necessary packages..."
    tryexec sudo apt install -y build-essential curl gnupg2 nginx

    echo "Downloading Node Version Manager(nvm)"
    tryexec curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
    tryexec export NVM_DIR="$HOME/.nvm"
    tryexec [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    tryexec [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

    echo "Installing Node.js and npm using NVM..."
    # curl -sL https://deb.nodesource.com/setup_$NODE_VERSION | sudo -E bash -
    # sudo apt-get install -y nodejs
    tryexec nvm install 20
    tryexec nvm alias default 20
    tryexec nvm use default

    # echo "Installing MongoDB..."
    # wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
    # echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
    # sudo apt-get update
    # sudo apt-get install -y mongodb-org

    # echo "Starting and enabling MongoDB service..."
    # sudo systemctl start mongod
    # sudo systemctl enable mongod
    
    # echo "Setting MongoDB data directory..."
    # sudo mkdir -p $MONGO_DIR
    # sudo chown -R mongodb:mongodb $MONGO_DIR

    echo "Creating project directories..."
    tryexec sudo mkdir -p $PROJECT_DIR

    echo "Setting permissions for project directories..."
    tryexec sudo chown -R $USER:$USER $PROJECT_DIR/
    tryexec sudo chmod -R 755 $PROJECT_DIR

    echo "Installing PM2 to manage Node.js process..."
    tryexec sudo npm install -g pm2

}

function build_ui() {
    echo "Building UI"
    tryexec sudo rm -rf $PROJECT_DIR/ui
    tryexec sudo cp -r $WORKSPACE/ui $PROJECT_DIR/
    pushd $PROJECT_DIR/ui
    # The contents of the .npm directory are created with root user ownership due to which the user ownership is being
    # changed to the current non root user running the installer script, otherwise the npm install command fails on a
    # fresh setup.
    # https://drive.google.com/file/d/1N5MiJSUQWVbJsvNeGh6tTC1s9nTaSDog/view?usp=sharing
    # tryexec sudo chown -R ${USER}:${USER} "/home/${USER}/.npm"
    tryexec npm install && npm run build --omit=dev
    tryexec sudo rm -rf /var/www/html/*
    tryexec sudo cp -rf dist/* /var/www/html/
    tryexec rm -rf dist/
    popd
}

function build_api() {
    echo "Building API Server"
    tryexec sudo rm -rf $OPT_DIR/backend
    tryexec sudo cp -r $WORKSPACE/backend $OPT_DIR/
    # tryexec cp $WORKSPACE/.env $OPT_DIR/
    pushd $OPT_DIR/backend
    tryexec npm install && npm run build
    tryexec npm run start:prod
    tryexec pm2 save
    tryexec pm2 startup
    popd
}

# function setup_nginx() {
#     echo "Setting up Nginx as a reverse proxy..."
#     sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/$PROJECT_NAME

#     sudo tee /etc/nginx/sites-available/$PROJECT_NAME > /dev/null <<EOL
# server {
#   listen 80;

#   server_name your_domain_or_IP;

#   location / {
#     proxy_pass http://localhost:3000;
#     proxy_http_version 1.1;
#     proxy_set_header Upgrade \$http_upgrade;
#     proxy_set_header Connection 'upgrade';
#     proxy_set_header Host \$host;
#     proxy_cache_bypass \$http_upgrade;
#   }
# }
# EOL
# }

# sudo ln -s /etc/nginx/sites-available/$PROJECT_NAME /etc/nginx/sites-enabled/
# sudo unlink /etc/nginx/sites-enabled/default

# echo "Testing Nginx configuration..."
# sudo nginx -t

# echo "Restarting Nginx..."
# sudo systemctl restart nginx
# sudo systemctl enable nginx


install_packages
build_api
build_ui

echo "Installation complete. Your MERN environment is set up."
echo "Project Directory: $PROJECT_DIR"
echo "Node.js Version: $(node -v)"
echo "NPM Version: $(npm -v)"
echo "MongoDB Version: $(mongod --version)"
# echo "Nginx is configured to proxy requests to your MERN app running on port 3000."