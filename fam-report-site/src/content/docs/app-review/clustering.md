---
title: "Clustering and Visualization of App Reviews"
description: "Lorem ipsum dolor sit amet - 2"
---

In this analysis, I have used a dataset of Google Play Store reviews for the Fampay app, which I have scraped and stored in a CSV file. The primary objective of this analysis is to understand the sentiment and topics of the reviews, which are crucial metrics for evaluating the performance and user perception of the app.

## Preprocessing and Feature Extraction

```python
df = pd.read_csv('../../Warehouse/Reviews/app_reviews_1.csv')
df['content'] = df['content'].fillna('').apply(preprocess_text)
tfidf = TfidfVectorizer(stop_words='english', ngram_range=(1, 2))
X = tfidf.fit_transform(df['content'])
```

Firstly, I loaded the data from the CSV file and preprocessed the text content of the reviews. This preprocessing involved converting the text to lowercase, tokenizing the text into individual words, removing stop words (common words like 'the', 'is', etc. that do not carry much meaning), and lemmatizing the words (reducing words to their base or root form).

After preprocessing, I used the TF-IDF (Term Frequency-Inverse Document Frequency) vectorizer to transform the text data into a numerical format that can be used for further analysis. The TF-IDF vectorizer not only takes into account the frequency of a word in a particular document (in this case, a review) but also the frequency of the word across all documents. This helps in giving more weight to words that are more unique to a particular document.

## Determining the Optimal Number of Clusters

```python
best_n_clusters = 2
best_score = -1
for n_clusters in range(2, 11):
    clustering = MiniBatchKMeans(n_clusters=n_clusters, random_state=42)
    y_pred = clustering.fit_predict(X)
    score = silhouette_score(X, y_pred)
    if score > best_score:
        best_score = score
        best_n_clusters = n_clusters
```

Next, I used the KMeans clustering algorithm to group the reviews into clusters based on their TF-IDF features. However, a key question in clustering is determining the optimal number of clusters. To do this, I used the silhouette score, which is a measure of how similar an object is to its own cluster compared to other clusters. I iterated over a range of possible cluster numbers and chose the one that gave the highest silhouette score.

## Clustering and Visualization

```python
clustering = MiniBatchKMeans(n_clusters=best_n_clusters, random_state=42)
y_pred = clustering.fit_predict(X)
svd = TruncatedSVD(n_components=2, random_state=42)
X_svd = svd.fit_transform(X)
fig = px.scatter(x=X_svd[:, 0], y=X_svd[:, 1], color=y_pred, title="Clusters Visualization")
```

After determining the optimal number of clusters, I performed the KMeans clustering again with this number. Then, to visualize the clusters, I used TruncatedSVD to reduce the dimensionality of the TF-IDF features to 2 dimensions. This is necessary because the TF-IDF features are high-dimensional and cannot be visualized directly. The scatter plot shows the reviews in the 2D space, with different colors representing different clusters.

## Cluster Analysis

```python
df['cluster'] = y_pred
for i in range(best_n_clusters):
    print(df[df['cluster'] == i]['content'].value_counts().head(10))
```

Finally, I analyzed the clusters by looking at the most common reviews in each cluster. This gives an idea of the main topics or sentiments in each cluster.

<div style="overflow: auto; height: 400px;">
    <pre>
        Cluster 0:
        payment issue                 16
        payment problem               13
        payment                        7
        payment received               7
        upi payment                    6
        payment processing             6
        payment failed                 6
        slow payment                   5
        payment slow                   4
        payment processing problem     3
        Name: content, dtype: int64
        Cluster 1:
        useful                                                                                                                                                                      12
        getting otp                                                                                                                                                                  6
        useful app                                                                                                                                                                   5
        app useful                                                                                                                                                                   3
        getting otp login                                                                                                                                                            2
        getting money                                                                                                                                                                2
        getting kyc problem                                                                                                                                                          2
        getting use app cant go reward cant spin time showing something getted problem showing reward cant getting reward please check im getting problem think worst app fampay     1
        long app getting updated able order card please something                                                                                                                    1
        refer money getting clamed                                                                                                                                                   1
        Name: content, dtype: int64
        Cluster 2:
        best app          48
        upi problem       41
        useless app       37
        useless           32
        fake app          32
        waste app         30
        waste              27
        login problem     23
        poor app          23
        server problem    21
        Name: content, dtype: int64
        Cluster 3:
        bad                     314
        bad app                 202
        bad experience           80
        bad service              38
        bad aap                  15
        bad application          13
        app bad                   8
        bad customer service      6
        bad bad                   5
        bad experience app        5
        Name: content, dtype: int64
        Cluster 4:
        worst app                 177
        worst                      80
        worst app ever             54
        worst app ever seen        21
        worst payment app          17
        worst experience           16
        app                        15
        worst app ever used        14
        worst payment app ever     12
        worst app world            11
        Name: content, dtype: int64
        Cluster 5:
        good        658
                    500
        super       132
        good app    114
        op           88
        ok           81
        awesome      54
        best         54
        poor         53
        mast         40
        Name: content, dtype: int64
        Cluster 6:
        bekar                  18
        otp problem            10
        bekar app              10
        bekar hai               8
        able login              7
        otp coming              7
        invalid otp problem     6
        unable login            5
        bekar app hai           4
        otp invalid problem     4
        Name: content, dtype: int64
        Cluster 7:
        fampay                    13
        receive money              8
        money received             5
        money hold                 4
        give money                 4
        waste money                3
        money                      3
        get money                  3
        money transfer problem     3
        fampay account open        3
        Name: content, dtype: int64
        Cluster8:
        nice                                                      709
        nice app                                                  225
        app nice                                                    6
        nice app teenager                                           4
        nice nice                                                   1
        nice app payment                                            1
        app nice many                                               1
        nice app upi use payment online nice app nice app love      1
        system nice                                                 1
        nice one                                                    1
        Name: content, dtype: int64
        Cluster 9:
        upi working             169
        upi                      65
        working                  50
        app working              27
        working properly         25
        working app              10
        fampay working            9
        upi id working            8
        upi working properly      7
        app working properly      7
    </pre>
</div>

## Results

<iframe
  src="/App-Analytics/clusters2D.html"
></iframe>

In conclusion, this analysis provides valuable insights into the user perception of the Fampay app. By clustering the reviews, we can identify common themes and sentiments among the users, which can guide improvements to the app. The visualization of the clusters also helps in understanding the distribution and overlap of these themes. The methodology used here, including text preprocessing, TF-IDF feature extraction, KMeans clustering, and dimensionality reduction for visualization, is a powerful approach for analyzing text data and can be applied to various other types of text data as well.

<iframe
  src="/App-Analytics/clustering3D.html"
></iframe>
<!-- <iframe
  src="https://codepen.io/team/codepen/embed/preview/PNaGbb"
  style="width:100%; height:300px;"
></iframe> -->
