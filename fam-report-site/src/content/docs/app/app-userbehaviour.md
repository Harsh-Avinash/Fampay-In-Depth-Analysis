---
title: "User Behaviour Analysis"
description: "Lorem ipsum dolor sit amet - 2"
---

In this analysis, I've focused on the user reviews of the Fampay application available on the Google Play Store. User reviews provide a rich source of information for understanding what users like or dislike about a product, making them invaluable for product development. My approach has been to preprocess these reviews, extract features from them, and then use this data to identify key trends and patterns.

## Preprocessing and Feature Extraction

The first step I took was to read the data, which was stored in a CSV file. I used the pandas library, a powerful tool for data manipulation and analysis in Python, to load the data into a DataFrame. The data includes various details about the reviews, such as the username of the reviewer, their review content, and the score they assigned to the app.

After loading the data, I preprocessed the reviews by converting them to lowercase. This step is necessary because language processing algorithms typically treat words differently based on their case, which can lead to inaccuracies.

```python
data = pd.read_csv('../../Warehouse/Reviews/app_reviews_merged.csv')
data['content'] = data['content'].str.lower()
```

Next, I defined a list of specific features that users might mention in their reviews. These are aspects of the app that we're particularly interested in, such as 'user interface', 'transaction process', 'rewards program', etc.

## User Patterns and Feature Mentions

For each user, I calculated the average score they gave in their reviews. I then tokenized the review content and counted the mentions of specific features for each user. This was accomplished by breaking the reviews into individual words using the Natural Language Toolkit's (NLTK) word_tokenize function and then checking if any of the predefined features were present in the tokenized review.

```python
user_avg_scores = data.groupby('userName')['score'].mean()
```

Using this approach, I created a dictionary (user_patterns) where each entry corresponds to a user and contains their average score and a counter of their feature mentions. This provides a detailed overview of each user's opinions and interests, which could be invaluable for tailoring the app to meet user needs and expectations.

## User Segmentation Based on Ratings

Once the feature mentions and average scores were obtained for each user, I categorized the users into two groups: high_rating_users (those with an average score of 4 or more) and low_rating_users (those with an average score of less than 4). The idea behind this step is to understand what differentiates users who enjoy the app from those who don't.

```python
high_rating_users = [user for user, pattern in user_patterns.items() if pattern['average_score'] >= 4]
low_rating_users = [user for user, pattern in user_patterns.items() if pattern['average_score'] < 4]
```

## Feature Mentions Analysis

After segmenting the users, I analyzed the feature mentions for both user segments. This helps in understanding which features are appreciated by high-rating users and which are causing issues for low-rating users. This information can guide the product development team in prioritizing feature improvements or bug fixes.

```python
high_rating_feature_mentions = Counter()
low_rating_feature_mentions = Counter()

for user in high_rating_users:
    high_rating_feature_mentions += user_patterns[user]['feature_mentions']

for user in low_rating_users:
    low_rating_feature_mentions += user_patterns[user]['feature_mentions']
```

<div style="overflow: auto; height: 200px;">
<pre>

Feature mentions by high rating users:
Counter({'money transfer': 192, 'security': 43, 'app updates': 37, 'customer support': 25, 'payment options': 19, 'user interface': 16, 'app performance': 13, 'transaction history': 9, 'transaction process': 6, 'notifications': 6, 'cashback offers': 6, 'app design': 6, 'savings features': 3, 'transaction limits': 3, 'account linking': 2, 'card management': 2, 'rewards program': 2, 'ease of use': 1, 'account registration': 1, 'transaction fees': 1, 'bill payments': 1})

Feature mentions by low rating users:
Counter{'money transfer': 611, 'customer support': 312, 'app updates': 67, 'security': 56, 'transaction process': 47, 'payment options': 32, 'app performance': 31, 'transaction history': 22, 'user interface': 14, 'notifications': 12, 'account registration': 11, 'transaction limits': 8, 'app design': 7, 'account settings': 5, 'account linking': 4, 'cashback offers': 3, 'transaction fees': 3, 'card management': 2, 'bill payments': 2, 'savings features': 2, 'reliability': 1, 'data privacy': 1, 'rewards program': 1}

</pre>
</div>

## Visualization

The Plotly library was used to create bar charts for visualizing the frequency of feature mentions among high-rating and low-rating users.

```python
fig = px.bar(high_rating_feature_mentions_df, x='feature', y='mentions', title='Feature mentions by high rating users')
fig.show()

fig = px.bar(low_rating_feature_mentions_df, x='feature', y='mentions', title='Feature mentions by low rating users')
fig.show()
```

These bar charts provide a clear representation of which features are frequently mentioned by each user group. For instance, if the 'user interface' feature is frequently mentioned by high-rating users, it indicates that users who like the app appreciate its user interface. On the other hand, if 'transaction process' is frequently mentioned by low-rating users, it could indicate that users are facing issues with this feature, leading to lower ratings.

<iframe
src = "/App-Analytics/high_rating_feature_mentions.html"
>
</iframe>

<iframe
src = "/App-Analytics/low_rating_feature_mentions.html"
>
</iframe>

The visualization process was expanded to include two additional plots: the Average Score Distribution and the Feature Mention Comparison.

```python
# Calculate the average score per user
user_avg_scores = data.groupby('userName')['score'].mean().reset_index()

# Plot the average score distribution
fig = px.histogram(user_avg_scores, x='score', title='Average Score Distribution')
fig.show()
```

<iframe
src = "/App-Analytics/average_score_distribution.html"
>
</iframe>

The Average Score Distribution histogram provides an overview of how users are rating the Fampay application. It depicts the frequency of each average score among users, allowing us to easily identify whether users are generally satisfied or dissatisfied with the app. This helps establish a baseline understanding of overall user sentiment.

```python
comparison_df = pd.DataFrame({
    'feature': high_rating_feature_mentions_df['feature'],
    'high_rating_mentions': high_rating_feature_mentions_df['mentions'],
    'low_rating_mentions': low_rating_feature_mentions_df['mentions']
})

fig = px.bar(comparison_df, x='feature', y=['high_rating_mentions', 'low_rating_mentions'],
             barmode='group', title='Feature Mention Comparison')
fig.show()
```

The Feature Mention Comparison bar chart provides a side-by-side comparison of feature mentions between high-rating users and low-rating users. This gives a clear picture of the features that are positively and negatively impacting user experiences. For instance, a feature that is frequently mentioned by high-rating users but rarely mentioned by low-rating users could be a strength of the app. Conversely, a feature that is often mentioned by low-rating users could indicate an area that requires improvement.

<iframe
src = "/App-Analytics/feature_mention_comparison.html"
>
</iframe>

These visualizations provide a comprehensive view of user sentiment towards various features of the Fampay application. They are powerful tools for understanding user preferences and guiding product development efforts.

## Results and Insights

By analyzing and visualizing the user reviews, I have gained a deeper understanding of what differentiates high-rating users from low-rating users. I have also identified the specific features of the app that contribute to these differences.

This analysis is crucial for the Fampay team as it provides valuable insights into user preferences and potential pain points. With these insights, the team can prioritize improvements to the features that are causing dissatisfaction among users, and further enhance the features that users already appreciate.

Finally, I saved the results of this analysis to CSV files for further use and exploration. This includes the lists of high and low rating users, and their respective feature mentions.

```python
high_rating_users_df.to_csv('high_rating_users.csv', index=False)
low_rating_users_df.to_csv('low_rating_users.csv', index=False)
high_rating_feature_mentions_df.to_csv('high_rating_feature_mentions.csv', index=False)
low_rating_feature_mentions_df.to_csv('low_rating_feature_mentions.csv', index=False)
```

In conclusion, this data-driven approach to understanding user reviews is an effective way of deriving actionable insights that can help in the continuous improvement of the Fampay application.
