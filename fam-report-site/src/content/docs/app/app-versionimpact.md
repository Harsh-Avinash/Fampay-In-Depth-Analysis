---
title: "Version Impact Analysis"
description: "Lorem ipsum dolor sit amet - 2"
---

App version analysis is a vital step in understanding the evolution of user feedback over time. Every version of an application usually comes with some changes – they can be new features, bug fixes, design changes, performance improvements, and so on. By grouping the data by app version, I intended to gauge the impact of these changes on users. This can provide the developers with a better understanding of how well-received each version was, what worked, and what didn't.

## Average Review Score by App Version

The first analysis I carried out was the mean review score for each app version. This is a direct indicator of user sentiment for each version of the app.

```python
fig = px.bar(version_analysis, x=version_analysis.index, y='mean_score',
             labels={'x': 'App Version', 'y': 'Average Score'},
             title='Average Review Score by App Version')
fig.update_layout(xaxis_tickangle=-45)
fig.show()
pio.write_html(fig, "../../fam-report-site/public/App-Analytics/average_review_version.html")
```

<iframe
src = "/App-Analytics/average_review_version.html"
>
</iframe>

In the bar plot, each bar corresponds to an app version and its height indicates the average score for that version. A higher score indicates positive sentiment, and vice versa. By comparing the scores, one can see how users' perception has changed from version to version, which can be used to identify successful or problematic updates.

## Number of Reviews by App Version

Next, I analyzed the count of reviews for each app version. This provides a perspective on the volume of feedback received for each version.

```python
fig = px.bar(version_analysis, x=version_analysis.index, y='review_count',
             labels={'x': 'App Version', 'y': 'Review Count'},
             title='Number of Reviews by App Version')
fig.update_layout(xaxis_tickangle=-45)
fig.show()
pio.write_html(fig, "../../fam-report-site/public/App-Analytics/number_review_version.html")
```

<iframe
src = "/App-Analytics/number_review_version.html"
>
</iframe>

The bar plot shows the number of reviews each app version has received. A higher number of reviews indicate greater user engagement and interaction with the app. It can also potentially signify the popularity of a version or widespread usage.

## Most Common Topic by App Version

Finally, I aimed to understand the most frequent topics mentioned in the reviews for each app version.

```python
fig = px.histogram(version_analysis, x='most_common_topic', color='most_common_topic',
                   labels={'most_common_topic': 'Most Common Topic', 'count': 'Frequency'},
                   title='Most Common Topic by App Version')
fig.update_layout(xaxis_tickangle=-45)
fig.show()
pio.write_html(fig, "../../fam-report-site/public/App-Analytics/topic_review_version.html")
```

<iframe
src= "/App-Analytics/topic_review_version.html"
>
</iframe>

The histogram showcases the most commonly occurring topic in the reviews for each app version. This analysis helps to discern the primary issues or features that users are discussing for each version, providing a deeper understanding of user feedback and its evolution over time.

In conclusion, the version-wise analysis provides a granular perspective on user feedback, which is crucial for understanding the app's progress over time. The insights gained from this analysis can guide future development efforts, helping to make more user-centric decisions
