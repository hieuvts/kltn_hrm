from sklearn.cluster import KMeans
import os
import numpy as np
import pickle
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.decomposition import PCA
from sklearn.metrics.pairwise import kernel_metrics
import csv
import json as JSON
import sys
import pandas as pd


dataFromCSV = sys.argv[1]
input = pd.DataFrame(JSON.loads(dataFromCSV))

# features = np.array(dataFromCSV.loc[:,['id','KPI']]).reshape(-1, 2)
def extractKPIInfo(data):
    result = data[['id', 'KPI']]
    result = result.groupby('id').sum()
    return result

def extractIDInfo(data):
    result = data[['id']]
    return result

features = np.array(extractKPIInfo(input))
ids = np.array(extractIDInfo(input))

kmeans = KMeans(n_clusters = 4).fit(features)

outcomeDictArr = []
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