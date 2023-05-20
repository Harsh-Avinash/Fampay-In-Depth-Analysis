---
title: "Sentiment Analysis and Visualization"
description: "Lorem ipsum dolor sit amet - 2"
---

Sentiment analysis is a method used to extract information from text data, with an emphasis on understanding the underlying sentiments, opinions, or emotions. In our case, we are particularly interested in understanding the sentiments expressed in reviews left by users of the FamPay application on the Google Play Store. Analyzing these reviews can provide invaluable insights into the aspects of the application that users appreciate, as well as those that could use improvements.

## Methodology and Significance

A critical component of sentiment analysis is polarity, which describes the extent to which a given text is positive, negative, or neutral. On one hand, subjectivity refers to the extent to which a text contains personal opinions, evaluations, or beliefs, as opposed to stating factual information. By calculating the polarity and subjectivity of each review, we can gain a deeper understanding of the sentiments expressed therein.

For example, a review stating, "I love the app's interface; it's very user-friendly!" would have high polarity (due to its positive sentiment) and high subjectivity (as it reflects the user's personal opinion). In contrast, a review stating, "The app crashes frequently" would have low polarity (reflecting negative sentiment) and low subjectivity (as it describes a factual event).

## Code Implementation and Approach

The Python code I used to analyze the reviews is divided into several stages. First, I combined five CSV files, each containing a set of reviews, into a single DataFrame:

```python
data = pd.DataFrame()  # Create an empty dataframe
for i in range(1, 6):
    data_t = pd.read_csv('../../Warehouse/Reviews/app_reviews_'+str(i)+'.csv')
    ...
    data = data.append(data_t, ignore_index=True)
```

Each review was then cleaned with the clean_text() function, which removes non-alphabetical characters and converts all text to lowercase:

```python
def clean_text(text):
    text = re.sub('[^a-zA-Z]', ' ', text)
    text = text.lower()
    return text
```

Next, I calculated the polarity and subjectivity of each cleaned review using TextBlob:

```python
def get_sentiment(text):
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    subjectivity = blob.sentiment.subjectivity
    return polarity, subjectivity
```

Then I generated visualizations using plotly.express to understand the distribution and relationship between polarity and subjectivity scores:

1. **Histogram**: This plot gives us a visual representation of the distribution of polarity scores among the reviews. By looking at this plot, we can see the overall sentiment leaning of the reviews. For instance, if most reviews have a positive polarity, the histogram would have a right skew.

```python
def plot_pol_sub_histograms(data, filename):
    fig = px.histogram(data, x='polarity', nbins=20, marginal='rug', opacity=0.7,
                       labels={'polarity': 'Polarity', 'count': 'Frequency'},
                       title='Distribution of Polarity Scores')
```

<iframe
  src="/App-Analytics/overall_histogram.html"
></iframe>

2. **Scatter plot**: This plot visualizes the relationship between polarity and subjectivity scores. By looking at this plot, we can identify patterns or clusters that might suggest a relationship between the sentiment (polarity) and the level of personal bias (subjectivity) in the reviews.

```python
def plot_pol_sub_histograms(data, filename):
    fig = px.histogram(data, x='polarity', nbins=20, marginal='rug', opacity=0.7,
                       labels={'polarity': 'Polarity', 'count': 'Frequency'},
                       title='Distribution of Polarity Scores')
```

<iframe
  src="/App-Analytics/overall_scatter.html"
></iframe>

3. **Box plot**: This plot provides a way to compare the distribution of polarity scores across different versions of the app. This could indicate how user sentiment has evolved over time, or with different releases.

```python
def plot_pol_sub_ver_boxplot(data, filename):
    fig = px.box(data, x='reviewCreatedVersion', y='polarity',
                 labels={'reviewCreatedVersion': 'App Version', 'p
```

<iframe
  src="/App-Analytics/overall_boxplot.html"
></iframe>

Once these steps were completed for the overall dataset, I repeated the process for each star rating. This allowed for a more granular view of the sentiments expressed in reviews, as we could then examine the polarity and subjectivity distributions for each star rating separately.

## Conclusion

Through the application of sentiment analysis and the creation of subsequent visualizations, we've made significant strides in understanding the underlying sentiments of FamPay app reviews.

<iframe
src = "/App-Analytics/combined_scatter.html"
>
</iframe>

Looking at the scatter plot, for example, we can see an expected pattern: reviews with a 1-star rating are mostly congregated on the negative side of the polarity scale. These reviews, often characterized by frustration or dissatisfaction, express negative sentiment toward the app. Conversely, 5-star reviews typically exhibit high polarity, signifying positive sentiment. They are generally filled with praises and appreciations, thus landing on the positive side of the polarity scale.

<iframe 
src = "/App-Analytics/combined_boxplot.html"
></iframe>

The box plot is particularly revealing as it showcases the evolution of user sentiment across different versions of the app. If we observe a trend where newer versions of the app have a higher median polarity, it's an encouraging sign. It suggests that updates or changes made to the app are well-received by the users, leading to more positive reviews.

<iframe
src = "/App-Analytics/combined_histogram.html"
>
</iframe>

Finally, the histogram provides a quick overview of the distribution of polarity scores across all reviews. In this case, we can see that the majority of reviews have a positive polarity, which is a good sign. However, there is a small cluster of reviews with a negative polarity, which could be a cause for concern. By looking at the reviews in this cluster, we can identify the aspects of the app that users are unhappy with, and take steps to address them.

In the end, these visualizations and sentiment analysis provide a comprehensive understanding of user sentiment. By carefully observing the patterns and trends in these plots, we can identify areas of improvement, understand the impact of app updates, and better cater to user needs and expectations. It's an essential metric for ongoing app development, ensuring that user feedback is not just collected, but also leveraged for enhancement of the app experience.
