---
title: "Clustering and Visualization of App Reviews"
description: "Lorem ipsum dolor sit amet - 2"
---

# Clustering and Visualization of App Reviews

This code demonstrates the process of clustering and visualizing app reviews. The primary goal is to identify patterns and themes in the reviews that can help the developers better understand user feedback and improve the app. The process involves text preprocessing, feature extraction, clustering, dimensionality reduction, and visualization of the clusters.

## Text Preprocessing

The raw text data needs to be preprocessed before it can be used for analysis. The `preprocess_text` function tokenizes the text, removes stopwords, and lemmatizes words:

```
def preprocess_text(text):

```

## Feature Extraction

The `TfidfVectorizer` is used for feature extraction, which converts the text data into numerical format by calculating the term frequency-inverse document frequency (TF-IDF) for each word:

```
tfidf = TfidfVectorizer(stop_words='english', ngram_range=(1, 2))
X = tfidf.fit_transform(df['content'])
```

## Determining the Optimal Number of Clusters

The optimal number of clusters is determined using the silhouette score, which measures the similarity within clusters and the dissimilarity between clusters. The optimal number of clusters is chosen based on the highest silhouette score:

```
best_n_clusters = 2
best_score = -1
```

## Clustering Algorithm

The `MiniBatchKMeans` clustering algorithm is used to cluster the reviews based on the optimal number of clusters:

```
clustering = MiniBatchKMeans(n_clusters=best_n_clusters, random_state=42)
y_pred = clustering.fit_predict(X)
```

## Dimensionality Reduction

The `TruncatedSVD` is used for dimensionality reduction to make the data suitable for visualization:

```
svd = TruncatedSVD(n_components=2, random_state=42)
X_svd = svd.fit_transform(X)
```

## Visualization

The clusters are visualized using `plotly.express` to create 2D and 3D scatter plots:

```
fig = px.scatter(x=X_svd[:, 0], y=X_svd[:, 1], color=y_pred, title="Clusters Visualization")
fig.show()
```

To embed the HTML files, save the figures as HTML files using the `write_html` method from `plotly.io`:

```
pio.write_html(fig, file='clusters2D.html')
pio.write_html(fig, file='clusters3D.html')
```

Then, include the HTML files in your markdown or HTML document using iframes:

<iframe
  src="/App-Analytics/clusters2D.html"
></iframe>

<!-- <iframe
  src="https://codepen.io/team/codepen/embed/preview/PNaGbb"
  style="width:100%; height:300px;"
></iframe> -->
