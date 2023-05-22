---
title: "Page Size and Resource Analysis"
description: "Docs intro"
---

In this analysis, I have focused on the evaluation of web resources utilized by different pages linked to Fampay. The primary metrics I have considered are the sizes of the pages and the resources they use, such as images, scripts, and stylesheets. This is a crucial aspect of web performance optimization, as the size of a page and its resources directly impact the load time of the page, which in turn affects user experience and SEO ranking.

The methodology I have employed involves web scraping and data analysis. I have used the BeautifulSoup library in Python to scrape the HTML content of the pages and identify the resources they use. I have then used the requests library to fetch these resources and calculate their sizes. This data is then analyzed using pandas and visualized using plotly.

## Code Explanation and Approach

Firstly, I have defined a few helper functions to fetch a page, calculate its size, and analyze its resources. The get_page_size function fetches a page and calculates its size in kilobytes. The get_resource_size function fetches a resource and calculates its size, handling both absolute and relative URLs. The analyze_resources function uses BeautifulSoup to parse a page's HTML content and identify its resources, which are then fetched and their sizes calculated using the previous two functions.

```python
def get_page_size(url):
    response = requests.get(url)
    page_size = len(response.content) / 1024  # Convert bytes to kilobytes
    return page_size
```

I have then read the input CSV file containing the links to the pages into a pandas DataFrame. I have added two new columns to this DataFrame, 'Page Size (KB)' and 'Resource Sizes', which are initially set to None.

```python
df = pd.read_csv(input_csv)
df['Page Size (KB)'] = None
df['Resource Sizes'] = None
```

Next, I have iterated over each link in the DataFrame, fetched the page, calculated its size, and analyzed its resources. The results are then stored in the DataFrame.

```python
for index, row in df.iterrows():
    link = row['Link']
    page_size = get_page_size(link)
    resource_sizes = analyze_resources(link)
    df.at[index, 'Page Size (KB)'] = page_size
    df.at[index, 'Resource Sizes'] = resource_sizes
```
    
After the analysis, I have saved the DataFrame to a new CSV file. I have then loaded this file into a new DataFrame, converted the 'Resource Sizes' column from a string to a list of tuples, and computed the total resource size and number of resources for each page.

```python
df.to_csv(output_csv, index=False)
df = pd.read_csv('resources.csv')
df['Resource Sizes'] = df['Resource Sizes'].apply(ast.literal_eval)
df['Total Resource Size (KB)'] = df['Resource Sizes'].apply(lambda x: sum(size for url, size in x))
df['Resource Count'] = df['Resource Sizes'].apply(len)
```

Finally, I have created several plots to visualize the data. These include histograms of page sizes, total resource sizes, and resource counts, as well as bar charts of the top 30 URLs by page size and total resource size.

```python
fig = px.histogram(df, x='Page Size (KB)')
fig.update_layout(title='Page Sizes', xaxis_title='Page Size (KB)', yaxis_title='Count')
fig.show()
```

## Visualization and Analysis
### Histogram of Page Sizes

```python
fig = px.histogram(df, x='Page Size (KB)')
fig.update_layout(title='Page Sizes', xaxis_title='Page Size (KB)', yaxis_title='Count')
fig.show()
fig.write_html('../../fam-report-site/public/Web-Analytics/page_sizes.html')
```

<iframe src="/Web-Analytics/page_sizes.html"></iframe>

This histogram shows the distribution of page sizes. From this plot, wecan infer the range and frequency of page sizes. Pages with smaller sizes are generally preferred as they load faster, providing a better user experience.

### Histogram of Total Resource Sizes

```python
fig = px.histogram(df, x='Total Resource Size (KB)')
fig.update_layout(title='Total Resource Sizes', xaxis_title='Total Resource Size (KB)', yaxis_title='Count')
fig.show()
fig.write_html('../../fam-report-site/public/Web-Analytics/total_resource_sizes.html')
```

<iframe src="/Web-Analytics/total_resource_sizes.html"></iframe>

This histogram shows the distribution of total resource sizes for each page. This includes the sizes of all images, scripts, and stylesheets used by the page. A page with a large total resource size may take longer to load, especially on slower networks, which could negatively affect user experience.

### Histogram of Resource Counts

```python
fig = px.histogram(df, x='Resource Count')
fig.update_layout(title_text='Resource Count per Page')
fig.show()
fig.write_html('../../fam-report-site/public/Web-Analytics/resource_counts.html')
```

<iframe src="/Web-Analytics/resource_counts.html"></iframe>

This histogram shows the distribution of the number of resources used by each page. A high number of resources can increase the complexity of a page and potentially its load time, even if the total resource size is not particularly large.

### Top 30 URLs by Page Size

```python
top_pages = df.nlargest(30, 'Page Size (KB)')
fig = px.bar(top_pages, x='Link', y='Page Size (KB)')
fig.update_layout(title_text='Top 30 URLs by Page Size')
fig.update_layout(showlegend=False)
fig.show()
fig.write_html('../../fam-report-site/public/Web-Analytics/top_pages.html')
```

<iframe src="/Web-Analytics/top_pages.html"></iframe>

This bar chart shows the top 30 URLs by page size. These are the pages that contribute the most to the total data usage of the website. Reducing the size of these pages could significantly improve the overall performance of the website.

### Top 30 URLs by Total Resource Size

```python
top_resources = df.nlargest(30, 'Total Resource Size (KB)')
fig = px.bar(top_resources, x='Link', y='Total Resource Size (KB)', labels={'Link': '', 'Total Resource Size (KB)': 'Resource Size (KB)'})
fig.update_traces(textposition='auto')
fig.update_layout(showlegend=False)
fig.update_layout(title_text='Top 30 URLs by Total Resource Size')
fig.show()
fig.write_html('../../fam-report-site/public/Web-Analytics/top_resources_bar.html')
```

<iframe src="/Web-Analytics/top_resources_bar.html"></iframe>

This bar chart shows the top 30 URLs by total resource size. These are the pages that use the most resources, in terms of total size. Optimizing these resources, for example by compressing images or minifying scripts and stylesheets, could significantly reduce the load time of these pages.

## Results

```python
stats = df.describe()
print(stats)
```

<div style="overflow: auto; height: auto">
<pre>
Metric   Page Size (KB)  Total Resource Size (KB)  Resource Count
count      246.000000                246.000000      246.000000
mean        39.956821                409.822964       21.365854
std         11.655578                855.234966       14.719011
min         14.641602                  0.000000       14.000000
25%         34.849854                280.895508       15.000000
50%         41.213867                281.811523       19.000000
75%         44.180420                282.334961       22.000000
max        138.898438               7758.075195      156.000000
</pre>
</div>

The results of this analysis provide valuable insights into the performance of the Fampay website. By identifying the pages and resources that contribute the most to data usage and load time, we can prioritize our optimization efforts to achieve the greatest impact. This could involve reducing the size of large pages, optimizing the use of resources, or even redesigning certain pages to be more efficient. Ultimately, these improvements could lead to a better user experience, higher SEO ranking, and increased engagement with the website.