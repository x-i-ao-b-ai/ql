#!/bin/sh
if [[ -f /usr/bin/lsb_release ]]; then
OS=$(/usr/bin/lsb_release -a |grep Description |awk -F : '{print $2}' |sed 's/^[ \t]*//g')
else
OS=$(cat /etc/issue |sed -n '1p')
fi

CPU=$(grep 'model name' /proc/cpuinfo |uniq |awk -F : '{print $2}' |sed 's/^[ \t]*//g' |sed 's/ \+/ /g')

Counts=$(grep 'physical id' /proc/cpuinfo |sort |uniq |wc -l)

PROCESSOR=$(grep 'processor' /proc/cpuinfo |sort |uniq |wc -l)

Total=$(free -m |grep Mem | awk -F : '{print $2}'  |awk '{print $1}')

Available=$(free -m |grep - |awk -F : '{print $2}' |awk '{print $2}')

#Partion=$(df -hlP |sed -n '2,$p')

echo "{OS:'${OS}',CPU_Model:'${CPU}',CPU_Num:${Counts},Core_Num:${PROCESSOR},Memory_Total:${Total},Memory_Avai:${Available}}"