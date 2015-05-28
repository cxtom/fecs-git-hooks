#!/bin/sh

git clone https://github.com/cxtom/fecs-git-hooks.git
cd fecs-git-hooks

echo "正在下载必要的包...."
npm install

echo "拷贝文件...."
cd ..

git config --global init.templatedir '~/.git_template'
\cp -rf fecs-git-hooks/node_modules ~/.git_template/
\cp -f fecs-git-hooks/hooks/pre-commit ~/.git_template/hooks/

echo "####################################################"
echo "#                  installed!                      #"
echo "#   Please process 'git init' in your project !    #"
echo "####################################################"