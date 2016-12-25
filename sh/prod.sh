#!/bin/sh
kill -9 $(lsof -i tcp:9095 | awk '{if(NR==2){print $2};if(NR==3) {exit;}}')
echo "开始重启服务器..."
nohup /home/Go/Xinxi/Xinxi -importPath Xinxi -srcPath ./src -runMode prod &
echo "重启完毕..."