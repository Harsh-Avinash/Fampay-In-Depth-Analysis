---
title: "Instagram Review Analysis"
description: "Docs intro"
---

In this section, we'll look into the review data that we've collected from FamPay's Instagram posts. We analyzed the sentiment of the comments, determined the comment activity over time, comment frequency by the hour of day, comment count by weekday, top active users, and comments per post. Let's dive into each part.

### Interactive Comment Activity Over Time

This line chart shows the number of comments made on FamPay's Instagram posts over time. This chart provides insights into when the comment activity was highest and lowest. Peaks in the line chart could coincide with high-engagement posts or promotional events.

```python
# Interactive Comment Activity Over Time
df['date'] = pd.to_datetime(df['time']).dt.date
df1 = df.groupby(['date']).size().reset_index(name='counts')
fig = px.line(df1, x='date', y='counts', title='Interactive Comment Activity Over Time')
fig.update_xaxes(rangeslider_visible=True)
pio.write_html(fig, '../../../../fam-report-site/public/Social-Analytics/comment_activity_over_time.html')
fig.show()

```

You can observe the comment activity over time with the interactive plot below:

<iframe src="/Social-Analytics/comment_activity_over_time.html"></iframe>

### Comment Frequency by Hour of Day: 
This histogram displays the frequency of comments per hour. This helps understand when most of the audience is active and engaging with the posts. This information could be useful for determining the optimal time to post.

```python
# Comment Frequency by Hour of Day
df['hour'] = pd.to_datetime(df['time']).dt.hour
fig = px.histogram(df, x='hour', nbins=24, title='Comment Frequency by Hour of Day')
pio.write_html(fig, '../../../../fam-report-site/public/Social-Analytics/comment_frequency_by_hour.html')
fig.show()

```

Check out the comment frequency by the hour of the day below:

<iframe src="/Social-Analytics/comment_frequency_by_hour.html"></iframe>

### Comment Count by Weekday: 
The bar chart presents the total count of comments for each day of the week. It helps identify which days have the most and the least engagement, aiding in the scheduling of content and campaigns.

```python
# Comment Count by Weekday
df['weekday'] = pd.to_datetime(df['time']).dt.day_name()
df4 = df.groupby(['weekday']).size().reset_index(name='counts')
### fig = px.bar(df4, x='weekday', y='counts', title='Comment Count by Weekday', category_orders={"weekday": 
["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]})
pio.write_html(fig, '../../../../fam-report-site/public/Social-Analytics/comment_count_by_weekday.html')
fig.show()

```

The comment count by weekday can be observed in the bar chart below:

<iframe src="/Social-Analytics/comment_count_by_weekday.html"></iframe>

### Top 50 Active Users: 
The bar chart showcases the 50 users who comment the most on FamPay's Instagram posts. These users could be considered as super fans or influencers and may be important for promoting engagement or running campaigns.

```python
# Top 10 Active Users Bar Chart
df5 = df['username'].value_counts().reset_index()[:50]
df5.columns = ['username', 'count']
fig = px.bar(df5, x='username', y='count', title='Top 50 Active Users')
pio.write_html(fig, '../../../../fam-report-site/public/Social-Analytics/top_10_active_users.html')
fig.show()

```

The following bar chart shows the top 50 active users:

<iframe src="/Social-Analytics/top_10_active_users.html"></iframe>

### Treemap of Comments per Post: 
The treemap represents the number of comments per post. Larger blocks indicate posts with more comments, allowing you to quickly identify the posts that have generated the most discussion or engagement.

```python
# Treemap of Comments per Post
df6 = df.groupby(['shortcode']).size().reset_index(name='counts')
fig = px.treemap(df6, path=['shortcode'], values='counts', title='Treemap of Comments per Post', hover_data=['shortcode'])
pio.write_html(fig, '../../../../fam-report-site/public/Social-Analytics/comments_per_post_treemap.html')
fig.show()
```

The treemap showing comments per post can be viewed below:

<iframe src="/Social-Analytics/comments_per_post_treemap.html"></iframe>

### Sentiment Distribution: 
This histogram displays the distribution of sentiment scores from the comments. This can give a quick overview of whether the overall sentiment in the comments is positive, neutral, or negative.

### Sentiment Over Time: 
This line chart plots sentiment over time, allowing you to see trends in sentiment and potentially correlate these trends with specific posts or events.

```python
# Sentiment Analysis
merged_df['text'] = merged_df['text'].astype(str)
merged_df['sentiment'] = merged_df['text'].apply(lambda text:TextBlob(text).sentiment.polarity)
fig = px.histogram(merged_df, x='sentiment', title='Sentiment Distribution')
pio.write_html(fig, '../../../../fam-report-site/public/Social-Analytics/sentiment_distribution.html')
fig.show()

merged_df['time'] = pd.to_datetime(merged_df['time'])
merged_df = merged_df.sort_values(by='time')
fig = px.line(merged_df, x='time', y='sentiment', title='Sentiment Over Time')
pio.write_html(fig, '../../../../fam-report-site/public/Social-Analytics/sentiment_over_time.html')
fig.show()

```

The sentiment distribution and sentiment over time can be examined below:

<iframe src="/Social-Analytics/sentiment_distribution.html"></iframe> <iframe src="/Social-Analytics/sentiment_over_time.html"></iframe>

### Sentiment by User: 
The scatter plot showcases the average sentiment of comments from each user. This could help identify users who consistently leave positive or negative comments.

```python
# Sentiment by User
user_sentiment = merged_df.groupby('username')['sentiment'].mean().reset_index()
fig = px.scatter(user_sentiment, x='username', y='sentiment', title='Sentiment by User')
pio.write_html(fig, '../../../../fam-report-site/public/Social-Analytics/sentiment_by_user.html')
fig.show()

```

Lastly, we have the sentiment analysis by user, which can be viewed below:

<iframe src="/Social-Analytics/sentiment_by_user.html"></iframe>

### 3D Cluster Plot

The 3D scatter plot shows clusters formed based on the number of likes, the number of comments, and the sentiment score. The clustering algorithm groups posts that have similar characteristics. Understanding these clusters can help identify different types of posts in terms of engagement and sentiment.

```python
# Standardize the features for better clustering result
scaler = StandardScaler()

df_cluster = merged_df[['num_likes', 'num_comments', 'sentiment']].dropna()
scaled_df = scaler.fit_transform(df_cluster)

# Define KMeans model and number of clusters
kmeans = KMeans(n_clusters=5)
pipeline = make_pipeline(scaler, kmeans)

# Fit and predict clusters
df_cluster['cluster'] = pipeline.fit_predict(df_cluster)

# 3D plot
fig = px.scatter_3d(df_cluster, x='num_likes', y='num_comments', z='sentiment', color='cluster', opacity=0.8, title="3D Cluster Plot")
pio.write_html(fig, '../../../../fam-report-site/public/Social-Analytics/3d_cluster_plot.html')
fig.show()

```

<iframe src="/Social-Analytics/3d_cluster_plot.html"></iframe>

### Time from Upload to Comment Over Time

The line chart demonstrates the amount of time (in hours) it takes for a comment to be made after a post has been uploaded, and how this changes over time. This can provide insights into how quickly users are interacting with posts after they are uploaded.

```python
# Convert both to timezone naive datetime objects
merged_df['time'] = merged_df['time'].dt.tz_localize(None)
merged_df['upload_time'] = merged_df['upload_time'].dt.tz_localize(None)

# Calculate time difference from upload to comment in hours
merged_df['time_diff'] = (merged_df['time'] - merged_df['upload_time']).dt.total_seconds() / 3600

# Time from Upload to Comment Over Time
fig = px.line(merged_df, x='time', y='time_diff', title='Time from Upload to Comment Over Time')
pio.write_html(fig, '../../../../fam-report-site/public/Social-Analytics/time_diff_over_time.html')
fig.show()

```

<iframe src="/Social-Analytics/time_diff_over_time.html"></iframe>

### Heatmap of Time from Upload to Comment by Weekday and Hour

This heatmap indicates the average time it takes for a comment to be made after a post has been uploaded, broken down by the day of the week and the hour of the day. This can show when users are most quickly responding to new posts.

```python
# Heatmap of Time from Upload to Comment by Weekday and Hour
merged_df['weekday'] = merged_df['time'].dt.weekday
merged_df['hour'] = merged_df['time'].dt.hour
heatmap_data = merged_df.groupby(['weekday', 'hour'])['time_diff'].mean().reset_index().pivot('weekday', 'hour', 'time_diff')
fig = px.imshow(heatmap_data, title='Heatmap of Time from Upload to Comment by Weekday and Hour')
pio.write_html(fig, '../../../../fam-report-site/public/Social-Analytics/heatmap_time_diff.html')
fig.show()

```

<iframe src="/Social-Analytics/heatmap_time_diff.html"></iframe>

### Scatter Plot of Sentiment vs Time from Upload to Comment

The scatter plot shows the relationship between the sentiment of a comment and the time it takes for that comment to be made after a post is uploaded. This can help identify if there are any patterns between how quickly a user responds to a post and the sentiment of their comment.

```python
# Scatter Plot of Sentiment vs Time from Upload to Comment
fig = px.scatter(merged_df, x='sentiment', y='time_diff', title='Scatter Plot of Sentiment vs Time from Upload to Comment')
pio.write_html(fig, '../../../../fam-report-site/public/Social-Analytics/scatter_plot_sentiment_time_diff.html')
fig.show()

```

<iframe src="/Social-Analytics/scatter_plot_sentiment_time_diff.html"></iframe>


## Conclusion

In this section, I looked into the review data that we've collected from FamPay's Instagram posts. I analyzed the sentiment of the comments, determined the comment activity over time, comment frequency by the hour of day, comment count by weekday, top active users, and comments per post.