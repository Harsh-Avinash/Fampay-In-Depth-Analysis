---
title: "Sentiment Analysis of Fampay and Competitors"
description: "Docs intro"
---

In this report, we analyze the sentiment of customer reviews gathered from the Google Play Store for Fampay and its various competitors. The competitors are grouped into three categories: Direct Competitors, Mainstream Competitors, and Potential Competitors. 

## Data Collection

Data for the analysis was collected in the form of customer reviews from the Google Play Store for Fampay and all its competitors. The data was stored in CSV format.

## Data Processing and Analysis

The main tool used for the sentiment analysis is the Python library TextBlob. The sentiment function of TextBlob returns a sentiment polarity score ranging from -1 (negative sentiment) to +1 (positive sentiment). We applied this function to the 'content' column of the review data, which contains the text of the review.

We also calculated the response rate for each company, defined as the percentage of reviews that received a response from the company.

```python
def sentiment_score(text):
    if not isinstance(text, str):
        return None
    return TextBlob(text).sentiment.polarity # type: ignore

def response_rate(df):
    total_reviews = len(df)
    total_responses = len(df[df['replyContent'].notnull()])
    return total_responses / total_reviews * 100
```

## Visualization

<iframe
src = "/Comp/all_companies_rolling_avg.html"
>
</iframe>

The results of the sentiment analysis were visualized in several ways:

- **Time Series Plot**: Shows the average sentiment score per day for each company.
- **Sentiment Distribution**: Histogram of sentiment scores.
- **Average Sentiment Score**: Bar plot of average sentiment score per company.
- **Sentiment Trend**: Line plot of daily average sentiment score per company.
- **Box Plot of Sentiment Scores**: Box plot of sentiment scores per company.
- **Response Rate**: Pie chart of response rate per company.
- **Sentiment vs Thumbs Up Count**: Scatter plot of sentiment scores against the number of thumbs up for each review.
- **Heatmap of Sentiment Scores**: Heatmap of sentiment scores per company per day.

Each of these plots were saved as HTML files using Plotly and are displayed in the report using `<iframe>` HTML tags. The code used to generate these plots is included as code snippets throughout the report.

## Competitors

The companies included in the analysis are listed below:

**Direct Competitors**
- Akudo Technologies
- Junio
- Greenlight

**Mainstream Competitors**
- BharatPe
- Dreamplug
- Freecharge
- Google Pay
- Mobikwik
- Airtel
- Niyo Equitas Savings
- PhonePe
- NPCI UPI App

**Potential Competitors**
- Epifi Paisa
- Freo Save
- Instant Pay
- Mahila Money
- Niyo Global Travel
- Jupiter Money

In the following sections of the report, we will dive deeper into the analysis results for each category of competitors.
