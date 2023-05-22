---
title: "Analysis of Caching and Content-Encoding Metrics"
description: "Docs intro"
---

In today's digital landscape, an application's performance is not just a feature but a crucial part of the user experience. Slow websites can lead to user frustration, decreased user engagement, and ultimately a decline in conversion rates. Hence, the importance of performance analysis.

The Python script provided extracts the performance metrics of a list of URLs using Google's Lighthouse tool. Lighthouse is an open-source, automated tool for improving the quality of web pages. It has audits for performance, accessibility, progressive web apps, SEO, and more.

## How the Code Works
The first part of the script reads URLs from a CSV file:

```python
urls = read_urls_from_csv(INPUT_FILE)
```
For each URL, the script sends a request to an API endpoint that runs Lighthouse and returns a JSON response. The evaluate_website(url) function manages this process:

```python
result = evaluate_website(url)
```

If the lighthouseResult field is present in the response, the function extracts various performance metrics:

- **first_contentful_paint**: measures the time from navigation to the time when the browser renders the first bit of content from the DOM. This is an important milestone for users because it provides feedback that the page is actually loading.
- **speed_index**: measures how quickly the contents of a page are visibly populated.
- **largest_contentful_paint**: reports the render time of the largest image or text block visible within the viewport.
- **interactive**: measures the time from when the page starts loading to when all CPU tasks are complete.

These metrics provide a comprehensive view of a page's loading performance.

The metrics for each URL are then saved to another CSV file:

```python
save_results_to_csv(result, OUTPUT_FILE)
```

The code also handles cases where the Lighthouse evaluation fails for a particular URL, either due to the absence of the lighthouseResult field or any other exception during execution. These failed URLs and the corresponding errors are saved in a separate CSV file.

## Visualization of Performance Metrics

Alright, let's dive into the visualization part of the performance metrics of the websites. Note that the term "clustering" isn't applicable here, as we're not implementing any clustering algorithm but visualizing and analyzing website performance metrics. Let's take a closer look at each plot and what it represents.

### Overall Score vs. URLs

```python
fig1 = go.Figure()

fig1.add_trace(
    go.Scatter(
        x=data["url"], 
        y=data["overall_score"],
        mode='markers',
        marker=dict(
            size=15,
            color=data["overall_score"], 
            colorscale='Viridis', 
            showscale=True
        ),
        text=data["url"],
    )
)

fig1.update_layout(title='Overall Score', xaxis_title='URL', yaxis_title='Score', hovermode='closest')

pio.write_html(fig1, "../../fam-report-site/public/Web-Analytics/overall_score.html")
fig1.show()
```

This scatter plot presents the overall performance score of each URL. The X-axis represents the URLs, while the Y-axis represents the overall score. Each point on the graph corresponds to a URL, and its vertical position indicates the overall score. A higher point suggests better performance.

Let's see how this plot looks:

<iframe src="/Web-Analytics/overall_score.html" width="100%" height="100%"></iframe>

### Overall Score vs. First Contentful Paint (Bubble Chart)

```python
fig2 = go.Figure(data=go.Scatter(
    x=data["overall_score"],
    y=data["first_contentful_paint"],
    mode='markers',
    marker=dict(
        size=data["largest_contentful_paint"],
        color=data["speed_index"], 
        colorscale='Viridis', 
        showscale=True
    ),
    text=data["url"],
))

fig2.update_layout(title='Overall Score vs. First Contentful Paint', xaxis_title='Overall Score', yaxis_title='First Contentful Paint', hovermode='closest')

pio.write_html(fig2, "../../fam-report-site/public/Web-Analytics/bubble_chart.html")
fig2.show()
```

This bubble chart shows the relationship between the overall score and the first contentful paint time. The X-axis represents the overall score, while the Y-axis represents the first contentful paint time. The size of the bubbles is proportional to the largest contentful paint time. The color of the bubbles represents the speed index. This plot helps us understand the relationship between these three performance metrics. A smaller bubble higher up in the plot indicates better performance.

Let's see how this plot looks:

<iframe src="/Web-Analytics/bubble_chart.html" width="100%" height="100%"></iframe>

### Overall Score Treemap

```python
fig4 = px.treemap(data, path=['url'], values='overall_score',
                 color='overall_score', hover_data=['overall_score'],
                 color_continuous_scale='RdBu', title='Overall Score Treemap')

pio.write_html(fig4, "../../fam-report-site/public/Web-Analytics/overall_score_treemap.html")
fig4.show()
```

This treemap represents each URL as a rectangle, and the size and color of each rectangle are proportional to its overall performance score. This visualization offers a quick way to identify high and low-performing URLs.

Here's the visualization:

<iframe src="/Web-Analytics/overall_score_treemap.html" width="100%" height="100%"></iframe>

### Website Metrics Scatterplot Matrix

```python
fig5 = px.scatter_matrix(data,
    dimensions=["overall_score", "first_contentful_paint", "speed_index", "largest_contentful_paint", "interactive"],
    title="Website Metrics Scatterplot Matrix")

pio.write_html(fig5, "../../fam-report-site/public/Web-Analytics/scatterplot_matrix.html")
fig5.show()
```

This scatterplot matrix (also known as a pair plot) allows for the visualization of bivariate relationships between different pairs of website performance metrics. Each scatter plot in the matrix visualizes the relationship between a pair of properties, and each point represents a URL.

Here's the plot:

<iframe src="/Web-Analytics/scatterplot_matrix.html" width="100%" height="100%"></iframe>

### Parallel Coordinates Plot of Website Metrics

```python
fig6 = px.parallel_coordinates(
    data_normalized, 
    color="overall_score",
    color_continuous_scale=px.colors.diverging.Tealrose,
    color_continuous_midpoint=2,
    labels={"overall_score": "Overall Score", "first_contentful_paint": "First Contentful Paint", "speed_index": "Speed Index", "largest_contentful_paint": "Largest Contentful Paint", "interactive": "Interactive"}
)

pio.write_html(fig6, "../../fam-report-site/public/Web-Analytics/parallel_coordinates.html")
fig6.show()
```

A parallel coordinates plot is a great way to visualize high-dimensional data. Each vertical line represents one attribute (i.e., website metric). Each URL is represented as a line on this plot. A line crossing all the attributes represents a single URL. This way, we can identify patterns and correlations between different attributes for each URL.

Here's the visualization:

<iframe src="/Web-Analytics/parallel_coordinates.html" width="100%" height="100%"></iframe>

### 3D Scatter Plot: Overall Score, First Contentful Paint, Interactive, Largest Contentful Paint, and Speed Index

```python
fig3 = go.Figure(data=[go.Scatter3d(
    x=data["overall_score"],
    y=data["first_contentful_paint"],
    z=data["interactive"],
    text=data["url"],
    mode='markers',
    marker=dict(
        size=data["largest_contentful_paint"],
        color=data["speed_index"], 
        colorscale='Viridis', 
        showscale=True
    )
)])

fig3.update_layout(title='Overall Score, First Contentful Paint, Interactive, Largest Contentful Paint, and Speed Index', scene=dict(xaxis_title='Overall Score', yaxis_title='First Contentful Paint', zaxis_title='Interactive'))

pio.write_html(fig3, "../../fam-report-site/public/Web-Analytics/3d_scatter_plot.html")
fig3.show()
```

This 3D scatter plot represents a multi-dimensional view of the website performance metrics. Each point corresponds to a URL and its position in the 3D space is defined by its overall score (X-axis), first contentful paint time (Y-axis), and interactive time (Z-axis). The size and color of the points correspond to the largest contentful paint time and speed index, respectively.

Here's the plot:

<iframe 
    src="/Web-Analytics/3d_scatter_plot.html"
></iframe>

In conclusion, each plot serves a specific purpose and provides different insights into the performance metrics of the websites. By analyzing these plots, we can derive meaningful insights about the performance of the websites and identify areas of improvement.