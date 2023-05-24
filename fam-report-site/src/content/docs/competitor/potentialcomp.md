---
title: "Potential Competitors Sentiment Analysis"
description: "Docs intro"
---

In this analysis, we take a look at the sentiment scores from reviews of potential competitors to Fampay. These competitors include:

- Epifi Paisa
- Freo Save
- Instant Pay
- Mahila Money
- Niyo Global Travel
- Jupiter Money

The sentiment score is calculated using the TextBlob library and is a measure of the positivity or negativity of a review. A score of 1 indicates a positive sentiment, -1 a negative sentiment, and 0 a neutral sentiment.

## Data Analysis

Here's a brief overview of the analysis done:

1. **Data Loading**: The review data for each company was loaded from a CSV file stored in the "Data/Potential_Comp" directory.

```python
potential_comp_df = load_dataframes("Data/Potential_Comp/*")

```

2.  **Sentiment Score Calculation**: A sentiment score was calculated for each review in the dataset.

```python
potential_comp_df['sentiment'] = potential_comp_df['content'].apply(sentiment_score)

```

3.  **Response Rate Calculation**: The response rate for each company was calculated as the percentage of reviews that received a response from the company.

```python
response_rates['Potential_Comp'] = grouped.apply(response_rate)

```

## Plots

The following plots provide insights into the sentiment trends, distribution, response rates, and more for the mainstream competitors:


1. **Daily Average Sentiment per Company**: This time series plot shows the daily average sentiment score for each company.
        
<iframe src="/Comp/Potential_Comp_daily_sentiment.html"></iframe>

2. **Sentiment Distribution**: This plot shows the distribution of sentiment scores for each company.
        
<iframe src="/Comp/Potential_Comp_sentiment_distribution.html"></iframe>

3. **Average Sentiment Score per Company**: This bar plot shows the average sentiment score for each company.
        
<iframe src="/Comp/Potential_Comp_average_sentiment.html"></iframe>

4. **Sentiment Scores Box Plot**: This box plot shows the range and quartiles of the sentiment scores for each company.
        
<iframe src="/Comp/Potential_Comp_boxplot_sentiment.html"></iframe>

5. **Response Rate per Company**: This pie chart shows the response rate for each company.
        
<iframe src="/Comp/Potential_Comp_response_rate.html"></iframe>

6. **Scatter Plot - Sentiment vs Thumbs Up Count**: This scatter plot shows the relationship between sentiment scores and the number of thumbs up for each review.
        
<iframe src="/Comp/Potential_Comp_scatterplot.html"></iframe>

7. **Heatmap - Sentiment Scores per Company per Day**: This heatmap shows the sentiment scores for each company on each day.
        
<iframe src="/Comp/Potential_Comp_heatmap.html"></iframe>

The insights from these plots can help Fampay understand the sentiment dynamics of the customers towards these potential competitors. These can guide the Fampay's development team in prioritizing features and improvements, and the marketing team in understanding the competitors' strengths and weaknesses.

##   Conclusion

In this section, we have analyzed Fampay's potential competitors in terms of the sentiment of their customers as reflected in Google Play store reviews. We found that sentiment analysis can provide valuable insights into customer satisfaction and perception of these companies. We recommend similar analysis for direct and mainstream competitors for a comprehensive understanding of the market dynamics.