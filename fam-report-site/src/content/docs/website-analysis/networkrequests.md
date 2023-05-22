---
title: "Network Requests Analysis"
description: "Docs intro"
---

When we were analyzing the performance of the Fampay app, our primary objective was to gauge the response times of various aspects of the app, as well as the count of resources used. Understanding these metrics is pivotal because they directly impact user experience. An app that loads faster and uses fewer resources will likely provide a better user experience and could lead to higher user retention and satisfaction.

To gather the necessary data, we decided to use web scraping techniques to collect data from numerous unique links associated with the app. This approach enabled us to gather a substantial amount of data, which we could then analyze to better understand the performance characteristics of the app.

<!-- 
Methodology and Significance
Web Performance Metrics
I focused on four key web performance metrics: Connect Time, Wait Time, Total Time, and Resource Count. 'Connect Time' refers to the time it takes for a HEAD request to a given link to be completed. This is essentially the time taken to establish a connection with the server. 'Wait Time' is the time it takes for a GET request to a given link to be completed. This is the time taken for the server to process our request and send back a response. 'Total Time' is simply the sum of the Connect Time and Wait Time, representing the total time taken for a round-trip request. Finally, 'Resource Count' is the count of the number of resources (links, scripts, images) present on the page of a given link.

Understanding these metrics is pivotal to ensuring that our website's pages load quickly and efficiently. If the Connect Time is high, this could indicate network issues or server unresponsiveness. If the Wait Time is high, it could indicate that our server is taking too long to process requests and send responses. If the Resource Count is high, it might mean that our web pages are potentially resource-heavy, which could slow down page load times.

Web Scraping and Data Collection
To gather these metrics, I made use of web scraping techniques. I started by reading a csv file containing unique links associated with Fampay, and for each link, I recorded the Connect Time, Wait Time, Total Time, and Resource Count. For handling HTTP requests, I used the 'requests' library in Python. For parsing the HTML content of the pages, I used 'BeautifulSoup', a popular Python library for web scraping.

Once I collected these metrics, I saved them into a csv file for further analysis.

Here is a snippet of how I collected the metrics:

python
Copy code
# Create a session object
s = requests.Session()

# Iterate over the links in the DataFrame
for link in df['Link']:
    try:
        # Record the start time
        start_time = time.time()

        # Make a HEAD request to the link to measure connect time
        response = s.head(link)
        
        # Record the connect time
        connect_time = time.time() - start_time

        # Make a GET request to the link to measure wait time and count resources
        start_time = time.time()
        response = s.get(link)

        # Record the wait time and total time
        wait_time = time.time() - start_time
        total_time = connect_time + wait_time

        # Parse the HTML and count the number of resources
        soup = BeautifulSoup(response.text, 'html.parser')
        resource_count = len(soup.find_all(['link', 'script', 'img']))

        # Add the link and times to the results DataFrame
        results = results.append({'Link': link, 'Connect Time': connect_time, 'Wait Time': wait_time, 'Total Time': total_time, 'Resource Count': resource_count}, ignore_index=True) # type: ignore
    except requests.exceptions.RequestException as e:
        print(f"Error: Unable to get {link}. Reason: {e}")
Visualization and Analysis
Once the data was collected, I proceeded to visualize the metrics using several bar charts and a scatter plot. I used the 'plotly' library in Python for this purpose, due to its interactive and user-friendly nature. -->

## Methodology and Significance

### Web Performance Metrics

I focused on four key web performance metrics: Connect Time, Wait Time, Total Time, and Resource Count. 'Connect Time' refers to the time it takes for a HEAD request to a given link to be completed. This is essentially the time taken to establish a connection with the server. 'Wait Time' is the time it takes for a GET request to a given link to be completed. This is the time taken for the server to process our request and send back a response. 'Total Time' is simply the sum of the Connect Time and Wait Time, representing the total time taken for a round-trip request. Finally, 'Resource Count' is the count of the number of resources (links, scripts, images) present on the page of a given link.

Understanding these metrics is pivotal to ensuring that our website's pages load quickly and efficiently. If the Connect Time is high, this could indicate network issues or server unresponsiveness. If the Wait Time is high, it could indicate that our server is taking too long to process requests and send responses. If the Resource Count is high, it might mean that our web pages are potentially resource-heavy, which could slow down page load times.

### Web Scraping and Data Collection

To gather these metrics, I made use of web scraping techniques. I started by reading a csv file containing unique links associated with Fampay, and for each link, I recorded the Connect Time, Wait Time, Total Time, and Resource Count. For handling HTTP requests, I used the 'requests' library in Python. For parsing the HTML content of the pages, I used 'BeautifulSoup', a popular Python library for web scraping.

Once I collected these metrics, I saved them into a csv file for further analysis.

Here is a snippet of how I collected the metrics:

```python
# Create a session object
s = requests.Session()

# Iterate over the links in the DataFrame
for link in df['Link']:
    try:
        # Record the start time
        start_time = time.time()

        # Make a HEAD request to the link to measure connect time
        response = s.head(link)
        
        # Record the connect time
        connect_time = time.time() - start_time

        # Make a GET request to the link to measure wait time and count resources
        start_time = time.time()
        response = s.get(link)

        # Record the wait time and total time
        wait_time = time.time() - start_time
        total_time = connect_time + wait_time

        # Parse the HTML and count the number of resources
        soup = BeautifulSoup(response.text, 'html.parser')
        resource_count = len(soup.find_all(['link', 'script', 'img']))

        # Add the link and times to the results DataFrame
        results = results.append({'Link': link, 'Connect Time': connect_time, 'Wait Time': wait_time, 'Total Time': total_time, 'Resource Count': resource_count}, ignore_index=True) # type: ignore
    except requests.exceptions.RequestException as e:
        print(f"Error: Unable to get {link}. Reason: {e}")
```

## Visualization and Analysis

Once the data was collected, I proceeded to visualize the metrics using several bar charts and a scatter plot. I used the 'plotly' library in Python for this purpose, due to its interactive and user-friendly nature.

### Connect Times
Here, I have visualized the 'Connect Times' for each link in the form of a bar chart. Each bar represents a different link and the height of the bar indicates the Connect Time for that link.

```python
# Bar chart of connect times
fig1 = go.Figure(data=[go.Bar(x=df['Link'], y=df['Connect Time'])])
fig1.update_layout(title_text='Connect Times')
fig1.write_html("../../fam-report-site/public/Web-Analytics/connect_times.html")
fig1.show()
```

<iframe
src = "/Web-Analytics/connect_times.html"
></iframe>

From the plot, we can identify the links that take a longer time to establish a connection.

### Wait Times
In this chart, I have visualized the 'Wait Times' for each link. Each bar represents a different link and the height of the bar indicates the Wait Time for that link.

```python
fig2 = go.Figure(data=[go.Bar(x=df['Link'], y=df['Wait Time'])])
fig2.update_layout(title_text='Wait Times')
fig2.write_html("../../fam-report-site/public/Web-Analytics/wait_times.html")
fig2.show()
```

<iframe
src = "/Web-Analytics/wait_times.html"
></iframe>

The Wait Time plot can help us identify any links that are particularly slow in terms of server response.

### Total Times
Here, I have visualized the 'Total Times' for each link.

```python
df = backup.sort_values(by=['Total Time'], ascending=False).head(30)

fig3 = go.Figure(data=[go.Bar(x=df['Link'], y=df['Total Time'])])
fig3.update_layout(title_text='Total Times')
fig3.write_html("../../fam-report-site/public/Web-Analytics/total_times.html")
fig3.show()
```

<iframe
src = "/Web-Analytics/total_times.html"
></iframe>

This plot allows us to identify the links that have a long total time (sum of Connect and Wait times), and might need further optimization.

### Resource Counts
This plot showcases the 'Resource Counts' for each link.

```python
df = backup.sort_values(by=['Resource Count'], ascending=False).head(30)

fig4 = go.Figure(data=[go.Bar(x=df['Link'], y=df['Resource Count'])])
fig4.update_layout(title_text='Resource Counts')
fig4.write_html("../../fam-report-site/public/Web-Analytics/resource_counts.html")
fig4.show()
```

<iframe
src = "/Web-Analytics/resource_counts.html"
></iframe>

From this plot, we can infer which links are particularly resource-heavy and may need some optimization to reduce the load time.

### Total Time vs. Resource Count
In this scatter plot, I have compared 'Total Time' with 'Resource Count'. Each marker on the plot represents a different link.

```python
fig5 = go.Figure(data=[go.Scatter(x=backup['Total Time'], y=backup['Resource Count'], mode='markers')])
fig5.update_layout(title_text='Total Time vs. Resource Count', xaxis_title='Total Time', yaxis_title='Resource Count')
fig5.write_html("../../fam-report-site/public/Web-Analytics/total_vs_resource.html")
fig5.show()
```

<iframe
src = "/Web-Analytics/total_vs_resource.html"
></iframe>

This visualization helps in understanding the correlation between the total time taken and the number of resources present in a page. Pages with high resources and high total time can be identified as potential candidates for performance optimization.

### Overlapping Times & Resource Counts
In this overlapped bar chart, I have visualized the Connect Times, Wait Times, Total Times, and Resource Counts all together. Each bar represents a different link.

```python
fig = go.Figure()

df = backup.sort_values(by=['Total Time'], ascending=False).head(30)

# Connect Times
fig.add_trace(go.Bar(
    x=df['Link'], 
    y=df['Connect Time'], 
    name='Connect Time',
    opacity=0.6
))

# Wait Times
fig.add_trace(go.Bar(
    x=df['Link'], 
    y=df['Wait Time'], 
    name='Wait Time',
    opacity=0.6
))

# Total Times
fig.add_trace(go.Bar(
    x=df['Link'], 
    y=df['Total Time'], 
    name='Total Time',
    opacity=0.6
))

# Resource Counts
fig.add_trace(go.Bar(
    x=df['Link'], 
    y=df['Resource Count'], 
    name='Resource Count',
    opacity=0.6
))

fig.update_layout(
    title_text='Overlapping Times & Resource Counts',
    barmode='overlay'
)

fig.write_html("../../fam-report-site/public/Web-Analytics/overlapped_graph.html")
fig.show()
```

<iframe
src = "/Web-Analytics/overlapped_graph.html"
></iframe>

This comprehensive chart gives us a clearer idea of how these different metrics correlate and how they vary across different links.

### Pairplot
Finally, I have visualized the distribution of all the metrics using a pairplot.

```python
# make a pairplot of the data
fig = px.scatter_matrix(backup, dimensions=['Connect Time', 'Wait Time', 'Total Time', 'Resource Count'])
fig.write_html("../../fam-report-site/public/Web-Analytics/pairplot.html")
fig.show()
```

<iframe
src = "/Web-Analytics/pairplot.html"
></iframe>

## Results
To summarize the metrics, I've provided the statistical description of the collected data:

```python
stats = df.describe()
print(stats)
```

<div style="overflow: auto; height: auto;">
<pre>
Metrix   Connect Time   Wait Time  Total Time  Resource Count
count    523.000000  523.000000  523.000000      523.000000
mean       0.198072    0.489220    0.687292       31.982792
std        0.132511    0.427274    0.523743       16.957398
min        0.026751    0.029096    0.064658        0.000000
25%        0.038381    0.162211    0.250045       28.000000
50%        0.256647    0.557543    0.825571       30.000000
75%        0.277166    0.721885    1.075085       33.000000
max        1.298495    6.333222    6.635834      167.000000
</pre>
</div>

This gives us an overview of the distribution of our metrics, including the mean, standard deviation, min, max, and quartile values.

Understanding these metrics and their distributions can help us identify potential bottlenecks and issues that can then be addressed to improve the overall performance and user experience of the Fampay application.