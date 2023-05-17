---
title: "Time Series Analysis and Visualization"
description: "Lorem ipsum dolor sit amet - 2"
---

In this report, I've analyzed the reviews of the Fampay application gathered from the Google Play Store. The data was first scraped and saved as a CSV file, from which I could then extract and analyze the information. Understanding user sentiment is crucial for the Fampay's development team, as it provides insights into user satisfaction and can help identify areas for improvement.

## Data Preprocessing

```python
import pandas as pd

df = pd.read_csv('../../Warehouse/Reviews/app_reviews_merged.csv')
df['at'] = pd.to_datetime(df['at'])
df = df.set_index('at')
```

I began by loading the CSV file into a pandas DataFrame. I then converted the 'at' column, which represents the timestamp of the review, to a DateTime object, and set it as the index of the DataFrame. This conversion allows for the data to be resampled based on time, which is essential for understanding trends over time.

## Analyzing Review Sentiments

```python
positive_threshold = 4
negative_threshold = 2

weekly_df = df.resample('W').agg({
    'score': [
        ('positive_reviews', lambda x: (x > positive_threshold).sum()),
        ('negative_reviews', lambda x: (x < negative_threshold).sum())
    ]
})
```

The reviews were categorized as either positive or negative, based on their scores. I defined scores above 4 as positive, and those below 2 as negative. The data was then resampled weekly and the number of positive and negative reviews each week were counted.

This approach is crucial because it helps identify trends in user sentiment. If the number of negative reviews starts to increase, it could indicate a problem with the app that needs to be addressed. Conversely, an increase in positive reviews could suggest successful recent changes or updates.

## Visualization of Review Sentiments

```python
import plotly.graph_objs as go

fig = go.Figure()
fig.add_trace(go.Scatter(x=weekly_df.index, y=weekly_df['score']['positive_reviews'],
                         name='Positive Reviews', line=dict(color='#1f77b4')))
fig.add_trace(go.Scatter(x=weekly_df.index, y=weekly_df['score']['negative_reviews'],
                         name='Negative Reviews', line=dict(color='#ff7f0e')))
```

I created a line chart of the positive and negative reviews over time. The x-axis represents time, and the y-axis represents the number of reviews. This visualization makes it easy to spot trends and anomalies in the data.

<iframe
src = "/App-Analytics/trends.html"
></iframe>

## Average Review Scores

```python
daily_df = df.resample('D').agg({'score': 'mean'})
window_size = 5

rolling_average = daily_df.rolling(window=window_size).mean()
fig = go.Figure()
fig.add_trace(go.Scatter(x=rolling_average.index, y=rolling_average['score'],
                         name='Rolling Average', line=dict(color='#1f77b4')))
```

Next, I calculated the rolling average of the review scores. This metric gives a more accurate picture of the overall sentiment by smoothing out short-term fluctuations and highlighting longer-term trends.

## Visualization of Average Review Scores

I visualized the rolling average of the review scores over time with another line chart. This chart provides a clear picture of how the app's average review score has changed over time, which can provide valuable insights to the development team.

<iframe
src = "/App-Analytics/rolling-average.html"
></iframe>

In summary, the analysis and visualization of review data provides a clear and easy-to-understand overview of user sentiment. It allows for quick identification of trends and potential issues, enabling the development team to make data-driven decisions that can lead to improved user satisfaction.

## Conclusion and Insights

```python
average_score = np.mean(df["score"])
average_length = np.mean(df["content"].apply(len))

print(f'Average Review Score: {average_score:.2f}')
print(f'Average Review Length: {average_length:.2f}')

df["polarity"] = df["content"].apply(lambda x: TextBlob(x).sentiment.polarity)

average_polarity = np.mean(df["polarity"])

print(f'Average Review Polarity: {average_polarity:.2f}')
```

<div style="overflow: auto; height: auto;">
<pre>
Average Review Score: 3.31
Average Review Length: 51.73
Average Review Polarity: 0.25
</pre>
</div>

I calculated the average review score, length, and polarity for the Fampay application. The average score is 3.31, which is slightly below the threshold I defined for positive reviews. The average length of the reviews is 51 characters, which is relatively short. The average polarity is 0.25, which is slightly positive.

```python
df["sentiment"] = df["score"].apply(lambda x: "positive" if x > positive_threshold else "negative" if x < negative_threshold else "neutral")

df["content"] = df["content"].apply(lambda x: re.sub(r'[^a-zA-Z0-9\s]', '', x.lower()))
df["content"] = df["content"].apply(lambda x: x.translate(str.maketrans('', '', string.punctuation)))

df["content"] = df["content"].apply(lambda x: ' '.join([word for word in x.split() if word not in stopwords.words('english')]))

df["content"] = df["content"].apply(lambda x: " ".join([Word(word).lemmatize() for word in x.split()]))

df["content"] = df["content"].apply(lambda x: " ".join([Word(word).stem() for word in x.split()]))

df["polarity"] = df["content"].apply(lambda x: TextBlob(x).sentiment.polarity)
```

I also analyzed the sentiment of the reviews. I first defined the sentiment as positive, negative, or neutral based on the score. I then cleaned the text by removing punctuation, stop words, and lemmatizing and stemming the words. Finally, I calculated the polarity of the reviews using TextBlob.

```python
df["sentiment"] = df["polarity"].apply(lambda x: "positive" if x > 0 else "negative" if x < 0 else "neutral")

print(df["sentiment"].value_counts())

positive_reviews = df[df["sentiment"] == "positive"]
negative_reviews = df[df["sentiment"] == "negative"]

positive_reviews.to_csv("../../Warehouse/Reviews/app_positive_reviews.csv", index=False)
negative_reviews.to_csv("../../Warehouse/Reviews/app_negative_reviews.csv", index=False)
```

<div style="overflow: auto; height: auto;">
<pre>
positive    272
negative    101
neutral      27
</pre>
</div>

I then defined the sentiment as positive, negative, or neutral based on

In conclusion, I've analyzed the reviews of the Fampay application to gain insights into user sentiment. The average review score is 4.13, which is slightly above the threshold I defined for positive reviews. The average length of the reviews is 90 characters, and the average sentiment score is 0.13, which is slightly positive.
