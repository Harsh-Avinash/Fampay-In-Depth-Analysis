---
title: "Analysis of Developer Response Time and Sentiment"
description: "Lorem ipsum dolor sit amet - 2"
---

This code demonstrates the analysis of developer response times and sentiment in relation to user reviews. The goal is to gain insights into how quickly developers respond to user feedback and how the sentiment of their responses correlates with the sentiment of the reviews. The process involves data preprocessing, sentiment analysis, response time calculation, and visualization.

## Methodology

I started by importing the necessary libraries and reading the CSV file containing the reviews data. I then filtered out the rows without developer replies as these are not useful for our analysis.

```python
reviews_df = pd.read_csv('../../Warehouse/Reviews/app_reviews_1.csv')
replied_df = reviews_df.dropna(subset=['replyContent'])
```

Next, I converted the 'at' and 'repliedAt' columns to datetime objects and calculated the response time in hours. This gives us a measure of how quickly the developers are responding to the reviews.

```python
replied_df['at'] = pd.to_datetime(replied_df['at'])
replied_df['repliedAt'] = pd.to_datetime(replied_df['repliedAt'])
replied_df['response_time'] = (replied_df['repliedAt'] - replied_df['at']).dt.total_seconds() / 3600
```

I then used the TextBlob library to calculate sentiment scores for the review content and developer replies. Sentiment scores range from -1 (most negative) to 1 (most positive). This gives us an understanding of the overall sentiment of the reviews and the developers' replies.

```python
replied_df['review_sentiment'] = replied_df['content'].apply(lambda x: TextBlob(x).sentiment.polarity)
replied_df['reply_sentiment'] = replied_df['replyContent'].apply(lambda x: TextBlob(x).sentiment.polarity)
```

## Response Time Analysis

Calculating the average response time and identify trends in developer response times:

```python
avg_response_time = replied_df['response_time'].mean()
replied_df['month_year'] = replied_df['repliedAt'].dt.to_period('M')
monthly_response_time = replied_df.groupby('month_year')['response_time'].mean()
```

<div style="overflow: auto; height: 200px;">
<pre>
Monthly Average Response Time:
month_year
2019-08      13.503722
2020-01    1375.897778
2020-03      76.843389
2020-04      30.618889
2020-06    2251.561178
2020-07      88.086833
2020-08     -21.332000
2020-09     347.500609
2020-10       8.456370
2020-11     -73.864651
2020-12      60.853544
2021-01       7.234214
2021-02      18.598472
2021-03    -204.653611
2021-04     -77.346998
2021-05     -75.194578
2021-06     -24.524506
2021-07       1.667847
2021-08       9.767956
2021-09     -18.481858
2021-10     -89.019495
2021-11    -112.238346
2021-12    -114.265269
2022-01    -107.679651
2022-02    -178.418775
2022-03    -143.481583
2022-04    -155.092091
2022-05    -139.630402
2022-06    -137.924307
2022-07    -114.110701
2022-08     -23.562488
2022-09     -22.348268
2022-10     103.681050
2022-11      49.353156
2022-12     -11.391525
2023-01      37.634587
2023-02      12.458192
2023-03     131.267649
2023-04    1371.611556
</pre>
</div>

I created a bar plot to visualize the average response time by month. This helps us identify any trends or patterns in the response time. For example, if the response time is increasing, it might indicate that the developers are struggling to keep up with the volume of reviews.

<p align="center">
  <iframe src="/App-Analytics/MonthlyAverageResponseTime.html" alt="Monthly Average Response Time"></iframe>
</p>

I also created a scatter plot to visualize the relationship between the review sentiment and the reply sentiment. This can help us understand if the developers are responding more positively to negative reviews or vice versa.

<p align="center">
  <iframe src="/App-Analytics/ReviewSentimentvsReplySentiment.html" alt="Review Sentiment vs. Reply Sentiment"></iframe>
</p>

Finally, I calculated the correlation between the review sentiment and the reply sentiment. This gives us a numerical measure of the relationship between these two variables.

```python
correlation = replied_df['review_sentiment'].corr(replied_df['reply_sentiment'])
```

<div style="overflow: auto; height: auto">
<pre>
Correlation between Review Sentiment and Reply Sentiment: 0.29547370256602773
</pre>
</div>

## Conclusion

In conclusion, this analysis provides valuable insights into the user sentiment towards the Fampay app and the effectiveness of the developers' responses. By monitoring these metrics, we can identify areas for improvement and take action to enhance the user experience.
