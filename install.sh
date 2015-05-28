#!/bin/sh

git clone https://github.com/cxtom/fecs-git-hooks.git
cd fecs-git-hooks

echo "拷贝文件...."

git config --global init.templatedir '~/.git_template'
\cp -f hooks/pre-commit ~/.git_template/hooks/

echo "#####################################################"
echo "#                  installed!                       #"
echo "#   Please process 'git init' in your project       #"
echo "#   Or copy './hooks/pre-commit' to '.git/hooks'!   #"
echo "#####################################################"
