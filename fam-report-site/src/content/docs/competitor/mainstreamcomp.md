---
title: "Mainstream Competitors Sentiment Analysis"
description: "Docs intro"
---

This section of the report delves into the analysis of mainstream competitors of Fampay. These companies are mainstream competitors because they offer similar products and services as Fampay. The difference between mainstream and direct competitors is that mainstream competitors are more established and have a larger market share and a more general target audience. They range from wallet apps to neobanks to payment apps.

 companies included in this category are BharatPe, Dreamplug, Freecharge, Google Pay, Mobikwik, Airtel, Niyo Equitas Savings, PhonePe, and NPCI UPI App.

## Comptitors List

The mainstream competitors of Fampay are:

- BharatPe
- Dreamplug
- Freecharge
- Google Pay
- Mobikwik
- Airtel
- Niyo Equitas Savings
- PhonePe
- NPCI UPI App

## Data Analysis

The analysis focuses on understanding the sentiment of users towards these companies through their reviews on Google Play. This sentiment analysis provides valuable insights on customer satisfaction, likes, and dislikes. 

The analysis process involves the following steps:

### Data Collection 
The review data for each company is collected from Google Play. 

```python
mainstream_comp_df = load_dataframes("Data/Mainstream_Comp/*")
```

### Sentiment Analysis 
The sentiment score of each review is calculated using TextBlob. 

```python
mainstream_comp_df['sentiment'] = mainstream_comp_df['content'].apply(sentiment_score)
```

### Response Rate Calculation 
The response rate is calculated as the ratio of the number of responses from the company to the total number of reviews. 

```python
response_rates['Mainstream_Comp'] = grouped.apply(response_rate)
```

## Plots

The following plots provide insights into the sentiment trends, distribution, response rates, and more for the mainstream competitors:


1. **Daily Average Sentiment per Company**:
<iframe src = "/Comp/Mainstream_Comp_daily_sentiment.html"></iframe>

2. **Sentiment Distribution**:
<iframe src = "/Comp/Mainstream_Comp_sentiment_distribution.html"></iframe>

3. **Average Sentiment Score per Company**:
<iframe src = "/Comp/Mainstream_Comp_average_sentiment.html"></iframe>

4. **Sentiment Scores Box Plot**:
<iframe src = "/Comp/Mainstream_Comp_boxplot_sentiment.html"></iframe>

5. **Response Rate per Company**:
<iframe src = "/Comp/Mainstream_Comp_response_rate.html"></iframe>

6. **Scatter Plot - Sentiment vs Thumbs Up Count**:
<iframe src = "/Comp/Mainstream_Comp_scatterplot.html"></iframe>

7. **Heatmap - Sentiment Scores per Company per Day**:
<iframe src = "/Comp/Mainstream_Comp_heatmap.html"></iframe>

The insights from these plots can help Fampay understand the sentiment dynamics of the customers towards these mainstream competitors. These can guide the Fampay's development team in prioritizing features and improvements, and the marketing team in understanding the competitors' strengths and weaknesses.

##   Conclusion

In this section, we have analyzed Fampay's mainstream competitors in terms of the sentiment of their customers as reflected in Google Play store reviews. We found that sentiment analysis can provide valuable insights into customer satisfaction and perception of these companies. We recommend similar analysis for potential and mainstream competitors for a comprehensive understanding of the market dynamics.