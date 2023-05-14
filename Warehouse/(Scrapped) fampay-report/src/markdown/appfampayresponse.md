---
title: "Analysis of Developer Response Time and Sentiment"
description: "Lorem ipsum dolor sit amet - 2"
---

This code demonstrates the analysis of developer response times and sentiment in relation to user reviews. The goal is to gain insights into how quickly developers respond to user feedback and how the sentiment of their responses correlates with the sentiment of the reviews. The process involves data preprocessing, sentiment analysis, response time calculation, and visualization.

## Data Preprocessing

Read the CSV file and filter out rows without developer replies:

```python
reviews_df = pd.read_csv('../../Warehouse/Reviews/app_reviews_1.csv')
replied_df = reviews_df.dropna(subset=['replyContent'])
```

Convert the timestamp columns to datetime objects and calculating the response time in hours:

```python
replied_df['at'] = pd.to_datetime(replied_df['at'])
replied_df['repliedAt'] = pd.to_datetime(replied_df['repliedAt'])
replied_df['response_time'] = (replied_df['repliedAt'] - replied_df['at']).dt.total_seconds() / 3600
```

## Sentiment Analysis

Calculating sentiment scores for the review content and developer replies using `TextBlob`:

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

## Visualization

```python
fig = px.bar(x=[str(index) for index in monthly_response_time.index], y=monthly_response_time.values,
             labels={'x': 'Month-Year', 'y': 'Response Time (hours)'},
             title='Monthly Average Response Time')
plot(fig, filename='Monthly Average Response Time.html', auto_open=False)
fig.show()
```

<p align="center">
  <iframe src="/App-Analytics/MonthlyAverageResponseTime.html" alt="Monthly Average Response Time"></iframe>
</p>

```python
fig = px.scatter(replied_df, x='review_sentiment', y='reply_sentiment',
                 opacity=0.5, labels={'review_sentiment': 'Review Sentiment',
                                      'reply_sentiment': 'Reply Sentiment'},
                 title='Review Sentiment vs. Reply Sentiment')
plot(fig, filename='ReviewSentimentvsReplySentiment.html', auto_open=False)
fig.show()
```

<p align="center">
  <iframe src="/App-Analytics/ReviewSentimentvsReplySentiment.html" alt="Review Sentiment vs. Reply Sentiment"></iframe>
</p>

## Correlation Analysis

```python
correlation = replied_df['review_sentiment'].corr(replied_df['reply_sentiment'])
```

## Conclusion

This analysis provides valuable insights into the relationship between developer response times and the sentiment of both user reviews and developer replies. By understanding these relationships, developers can work on improving their response strategies, ultimately leading to better user satisfaction and engagement.
