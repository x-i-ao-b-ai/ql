#!/bin/sh
kill -9 $(lsof -i tcp:8080 | awk '{if(NR==2){print $2};if(NR==3) {exit;}}')
echo "开始重启服务器..."
nohup revel run Jxspy.com dev&
echo "重启完毕..."