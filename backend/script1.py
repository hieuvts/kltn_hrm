from sklearn.cluster import KMeans
import os
import numpy as np
import pickle
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.decomposition import PCA
from sklearn.metrics.pairwise import kernel_metrics
import csv
import json
csv_path = "data/100_data_kpi_2017.csv"
dataFromCSV = pd.read_csv(csv_path);
# features = np.array(dataFromCSV.loc[:,['id','KPI']]).reshape(-1, 2)
def extractKPIInfo(data):
    result = data[['id', 'KPI']]
    result = result.groupby('id').sum()
    return result

def extractIDInfo(data):
    result = data[['id']]
    return result

features = np.array(extractKPIInfo(dataFromCSV))
ids = np.array(extractIDInfo(dataFromCSV))

kmeans = KMeans(n_clusters = 4).fit(features)

outcomeDictArr = [];
for i in range(len(kmeans.labels_)):
    outcomeDict = {
    "employeeID":"",
    "lables":"",
    "kpi": "",
    "centoroid": ""
}
    outcomeDict["employeeID"]= ids[i][0]
    outcomeDict["lables"] = kmeans.labels_[i]
    outcomeDict["kpi"] = features[i][0]
    outcomeDict["centoroid"] = kmeans.cluster_centers_[kmeans.labels_[i]][0]
    outcomeDictArr.insert(i, outcomeDict)
    
print(outcomeDictArr)