"""
需要运行该文件需要：
1.python3环境
2.对应环境的pandas(通过pip install pandas可以完成)


注意：
通过该函数得到的矩阵中，由于是从excel表格中的来的，
因此excel表格第一行默认为属性描述，矩阵中是不包括第一行的内容的，
修改excel必须从excel的第二行开始，将第二行当作矩阵的第0行。

path_excel是文件的路径，可以修改。
这里我使用了相对路径，在本文件夹中的excelFile子文件夹内存放excel文件

使用步骤：
1.注意上述注意事项中提到的本.py文件所支持的excel文件格式
2.写好自己的excel文件
3.将path_excel改为自己的文件夹路径
4.运行本文件，得出结果
5.将运行的结果复制粘贴到.txt文件中
"""

import numpy as np
import pandas as pd


path_excel = "excelFile/excel2array.xlsx"


def excel2array(path):
    df = pd.read_excel(path)
    array = df.values
    return array


def printArrayUsingMyFormat(myArray):
    print("[")
    for i in range(len(myArray)):
        print("    [", end="")
        for j in range(len(myArray[0])):
            if j == len(myArray[0])-1:      # 每行最后一列不需要输出逗号
                print(myArray[i][j], end="")
            else:
                print(myArray[i][j], end=", ")
        if i == len(myArray)-1:     # 最后一行输出没有逗号
            print("]")
        else:
            print("],")
    print("]")


if __name__ == "__main__":
    array = excel2array(path_excel)
    printArrayUsingMyFormat(array)
