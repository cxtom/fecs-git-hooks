#!/bin/sh

git clone https://github.com/cxtom/fecs-git-hooks.git
cd fecs-git-hooks
npm install
cd ..

git config --global init.templatedir '~/.git_template'
\cp -rf fecs-git-hooks/* ~/.git_template/
rm -r fecs-git-hooks

echo "####################################################"
echo "#                  installed!                      #"
echo "#   Please process 'git init' in your project !    #"
echo "####################################################"
