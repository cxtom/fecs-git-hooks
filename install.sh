#!/bin/sh

git clone https://github.com/cxtom/fecs-git-hooks.git
echo "拷贝文件...."

# git config --global init.templatedir '~/.git_template'
# \cp -f hooks/pre-commit ~/.git_template/hooks/

root=$(cd `dirname $0`; pwd)
gitPath=$root"/.git/"

if [ ! -d "$gitPath" ]; then
    echo "非git仓库，退出"
else
    cd fecs-git-hooks
    cp -f hooks/pre-commit ../.git/hooks/
    cd ..

    echo "###################################################"
    echo "#                  初始化完成                     #"
    echo "###################################################"
fi

rm -rf fecs-git-hooks
