# Fampay Review Analysis

This folder contains the results of the various analyses conducted on Fampay's data. The aim of these analyses is to provide insights into the company's performance, user behavior, and potential growth opportunities.

## Folder Structure

1. `Clustering`: This folder contains files related to clustering app reviews using KMeans algorithm.
2. `FampayResponse`: This folder contains files related to calculating and visualizing monthly average response time of an app to user reviews.
3. `NGram`: This folder contains files related to extracting n-grams from app reviews and visualizing the frequency of these n-grams.
4. `RegressionAnalysis`: This folder contains files related to building a regression model to predict the rating of an app review based on its text.
5. `Sentiment`: This folder contains cleaned and sorted app reviews and a notebook to perform sentiment analysis on these reviews.
6. `Social network analysis`: This folder contains files related to creating and analyzing a social network graph from app reviews.
7. `TimeSeriesAnalysis`: This folder contains files related to analyzing trends in positive and negative app reviews over time.
8. `Topic Modeling`: This folder contains files related to performing topic modeling on app reviews.
9. `UserBehaviour`: This folder contains files related to identifying high and low rating users and features mentioned in their reviews.
10. `VersionImpactAnalysis`: This folder contains files related to analyzing the impact of different versions of an app on review scores, topic, and count.


### Clustering

- `cluster0.txt`, `cluster1.txt`, `cluster2.txt`: These files contain the reviews belonging to the clusters obtained from clustering analysis.
- `kmeans.pkl`: This is a Python pickle file containing the trained KMeans clustering model.
- `main.ipynb`: This notebook contains the code for preprocessing the app reviews, performing KMeans clustering, and visualizing the results.

### FampayResponse

- `main.ipynb`: This notebook contains the code for calculating and visualizing the monthly average response time of an app to user reviews.
- `monthly_average_response_time.csv`: This CSV file contains the monthly average response time data.
- `monthly_average_response_time.png`: This PNG file is a visualization of the monthly average response time data.

### NGram

- `main.ipynb`: This notebook contains the code for extracting n-grams from app reviews and visualizing the frequency of these n-grams.
- `ngram_results.csv`, `ngram_results_1.csv`, `ngram_results_2.csv`, `ngram_results_3.csv`, `ngram_results_4.csv`, `ngram_results_5.csv`: These CSV files contain the n-gram frequency data for different values of n.
- `results.csv`: This CSV file contains the combined n-gram frequency data for all values of n.

### RegressionAnalysis

- `main.ipynb`: This notebook contains the code for building a regression model to predict the rating of an app review based on its text.
- `model.pkl`: This is a Python pickle file containing the trained regression model.

### Sentiment

- `app_reviews_1_cleaned_sorted.csv`, `app_reviews_2_cleaned_sorted.csv`, `app_reviews_3_cleaned_sorted.csv`, `app_reviews_4_cleaned_sorted.csv`, `app_reviews_5_cleaned_sorted.csv`: These CSV files contain the cleaned and sorted app reviews.
- `main.ipynb`: This notebook contains the code for performing sentiment analysis on the app reviews.

### Social network analysis

- `app_reviews_merged_graph.gexf`: This GEXF file contains the social network graph data.
- `main.ipynb`: This notebook contains the code for creating and analyzing the social network graph from app reviews.

### TimeSeriesAnalysis

- `main.ipynb`: This notebook contains the code for analyzing trends in positive and negative app reviews over time.
- `rolling_average_review_scores.csv`: This CSV file contains the rolling average review score data.
- `rolling_average_review_scores.png`: This PNG file is a visualization of the rolling average review score data.
- `trends_positive_negative_reviews.png`: This PNG file is a visualization of the trends in positive and negative app reviews over time.
- `weekly_positive_negative_reviews.csv`: This CSV file contains the weekly positive and negative review count data.

### Topic Modeling

- `lda_model_net_data_10_topics_1.pkl`, `lda_model_net_data_10_topics_2.pkl`, `lda_model_net_data_10_topics_3.pkl`, `lda_model_net_data_10_topics_4.pkl`, `lda_model_net_data_10_topics_5.pkl`: These Python pickle files contain the trained LDA topic modeling models.
- `main.ipynb`: This notebook contains the code for performing topic modeling on app reviews.

### UserBehaviour

- `high_rating_feature_mentions.csv`: This CSV file contains the feature mentions in the reviews of high rating users.
- `high_rating_users.csv`: This CSV file contains the user IDs of the high rating users.
- `low_rating_feature_mentions.csv`: This CSV file contains the feature mentions in the reviews of low rating users.
- `low_rating_users

## Usage

To use the code in this folder, you will need to have the necessary software installed. This includes Python 3.10 and the required Python packages such as pandas, numpy, and matplotlib.

## Conclusion

The results of these analyses provide valuable insights into Fampay's performance, user behavior, and potential growth opportunities. The findings can be used to make informed decisions about the company's future strategy and direction.
