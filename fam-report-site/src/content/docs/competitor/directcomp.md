---
title: "Direct Competitors Sentiment Analysis"
description: "Docs intro"
---

In this section of the report, we focus on direct competitors to Fampay. These are companies that operate in the same market space and offer similar services to the target audience. The analysis provides valuable insights into the sentiment of customers towards these competitors, which is key to understanding the current market dynamics and planning future strategies.

## Competitor List

The direct competitors considered in this analysis are:
- Akudo Technologies
- Junio
- Greenlight

These companies are direct competitors because they offer similar services targeting the same demographic as Fampay.

## Data Analysis

We performed sentiment analysis on the Google Play store reviews of these companies. The sentiment score for each review was calculated using the TextBlob library. This score ranges from -1 (negative sentiment) to +1 (positive sentiment). The sentiment score was then plotted over time to understand the trends.

Here is a snippet of the code used for sentiment analysis and plotting:

```python
def sentiment_score(text):
    if not isinstance(text, str):
        return None
    return TextBlob(text).sentiment.polarity # type: ignore

direct_comp_df['sentiment'] = direct_comp_df['content'].apply(sentiment_score)

def plot_time_series(df, comp_type):
    df['at'] = pd.to_datetime(df['at'])
    df['day'] = df['at'].dt.date
    daily_sentiment = df.groupby(['company', 'day'])['sentiment'].mean().reset_index()

    fig = px.line(data_frame=daily_sentiment, x='day', y='sentiment', color='company',
                  title=f"Daily Average Sentiment - {comp_type}")

    fig.update_layout(width=1200, height=500)
    fig.update_xaxes(title_text='Day')
    fig.update_yaxes(title_text='Sentiment')

    filename = f"{comp_type}_sentiment.html"
    pio.write_html(fig, file=filename, auto_open=False)

plot_time_series(direct_comp_df, 'Direct_Comp')
```

## Plots

The following plots provide insights into the sentiment trends, distribution, response rates, and more for the direct competitors:

1. **Daily Average Sentiment**:
    
    <iframe src="/Comp/Direct_Comp_sentiment.html"></iframe>
2. **Sentiment Distribution**:
    
    <iframe src="/Comp/Direct_Comp_sentiment_distribution.html"></iframe>
3. **Average Sentiment Score per Company**:
    
    <iframe src="/Comp/Direct_Comp_average_sentiment.html"></iframe>
4. **Daily Average Sentiment per Company**:
    
    <iframe src="/Comp/Direct_Comp_daily_sentiment.html"></iframe>
5. **Sentiment Scores Box Plot**:
    
    <iframe src="/Comp/Direct_Comp_boxplot_sentiment.html"></iframe>
6. **Response Rate per Company**:
    
    <iframe src="/Comp/Direct_Comp_response_rate.html"></iframe>
7. **Scatter Plot - Sentiment vs Thumbs Up Count**:
    
    <iframe src="/Comp/Direct_Comp_scatterplot.html"></iframe>
8. **Heatmap - Sentiment Scores per Company per Day**:
    
    <iframe src="/Comp/Direct_Comp_heatmap.html"></iframe>

<iframe src="/Comp/Direct_Comp_sentiment.html" width="1000" height="500"></iframe>

The insights from these plots can help Fampay understand the sentiment dynamics of the customers towards these direct competitors. These can guide the Fampay's development team in prioritizing features and improvements, and the marketing team in understanding the competitors' strengths and weaknesses.

##   Conclusion

In this section, we have analyzed Fampay's direct competitors in terms of the sentiment of their customers as reflected in Google Play store reviews. We found that sentiment analysis can provide valuable insights into customer satisfaction and perception of these companies. We recommend similar analysis for potential and mainstream competitors for a comprehensive understanding of the market dynamics.