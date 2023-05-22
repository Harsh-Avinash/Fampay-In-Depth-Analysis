---
title: "Mobile vs. Desktop Performance Analysis"
description: "Docs intro"
---

In today's digital landscape, it's essential to ensure that a website performs optimally on both mobile and desktop platforms. This section of the report focuses on the comparison between mobile and desktop environments of the websites we have analyzed.

## Why Compare Mobile and Desktop Environments?
With the widespread use of smartphones, a significant proportion of internet browsing now takes place on mobile devices. Consequently, Google has shifted towards mobile-first indexing, meaning it predominantly uses the mobile version of a website for indexing and ranking.

Despite this shift towards mobile, desktop browsing remains substantial. Some users prefer the comprehensive view offered by larger desktop screens, particularly for complex tasks or professional purposes. Therefore, discrepancies in user experience or site performance across these platforms can have significant impacts on user engagement, bounce rate, conversion, and SEO performance.

## How are Mobile and Desktop Environments Compared?
I have adopted a multi-faceted approach to compare the two environments. This approach involves analyzing and comparing several key metrics and characteristics, including response time, HTTP status codes, title and description tags, and mobile-friendliness.

## Preprocessing and Feature Extraction

Firstly, let's examine how the data is preprocessed and the features are extracted.

```python
df = pd.read_csv('../EveryTraceOfFampayPeriod/famapp_unique_links.csv')
```

Here, I have imported the csv file that contains all the unique links associated with Fampay. I will use this data to extract key metrics, such as the HTTP response time, HTTP status code, and the website's description and title.

```python
df_metrics = pd.DataFrame([get_all_metrics(url) for url in df['Link'].dropna()])
df_metrics.to_csv('website_metrics.csv', index=False)
```

In the above code, I applied a function to each URL in the dataframe that we obtained from the csv file. The function get_all_metrics() fetches key metrics from each URL, like the response time, HTTP status, title, and description of the website, as seen from both a desktop and mobile user agent. This is important because user experience and performance can significantly differ between these two types of devices.

### Response Time Analysis

The response time of a website is a key metric that can impact user experience and engagement. A slow response time can lead to a poor user experience, which may result in a high bounce rate and low conversion rate. Therefore, it is essential to ensure that a website performs optimally across different platforms.

In the next step, I analyzed the response times for both desktop and mobile versions of the websites. Fast response times are critical in ensuring a positive user experience, and slow response times can deter users from spending time on a website, or even lead them to abandon the site altogether.

```python
fig1 = go.Figure()
fig1.add_trace(go.Box(y=df_metrics['desktop_response_time'], name='Desktop'))
fig1.add_trace(go.Box(y=df_metrics['mobile_response_time'], name='Mobile'))
fig1.update_layout(title='Response Time (Desktop vs Mobile)', xaxis_title='Platform', yaxis_title='Time (s)')
fig1.write_html("../../fam-report-site/public/Web-Analytics/response_time.html")
fig1.show()
```

The resulting plot:

<iframe src="/Web-Analytics/response_time.html"></iframe>

From this plot, you can observe the distribution of the response times for both desktop and mobile versions of the websites. If the response time for the mobile version is significantly higher than that of the desktop version, this is an area that should be prioritized for improvement.

### HTTP Status Code Analysis

HTTP status codes are returned by a server in response to a client's request. These codes indicate whether the request was successful or not and can provide information about the status of the request. For example, a 200 status code indicates that the request was successful, while a 404 status code indicates that the requested resource was not found.

A status code beginning with '2' indicates success, a '3' code signifies redirection, and '4' or '5' codes indicate client and server errors, respectively.

```python
fig2 = go.Figure()
fig2.add_trace(go.Violin(y=df_metrics['desktop_http_status'], box_visible=True, line_color='blue', name='Desktop'))
fig2.add_trace(go.Violin(y=df_metrics['mobile_http_status'], box_visible=True, line_color='orange', name='Mobile'))
fig2.update_layout(title='HTTP Status (Desktop vs Mobile)', xaxis_title='Platform', yaxis_title='HTTP Status Code')
fig2.write_image("../../fam-report-site/public/Web-Analytics/http_status.png")
fig2.show()
```

The resulting plot:

<iframe src="/Web-Analytics/http_status.html"></iframe>

From this plot, you can observe the distribution of the HTTP status codes for both desktop and mobile versions of the websites. If there are significant differences in the HTTP status codes across platforms, this is an area that should be prioritized for improvement.

### Mobile-Friendliness Analysis

Mobile-friendliness is a key factor in ensuring a positive user experience. A website that is not optimized for mobile devices can be difficult to navigate and use, leading to a poor user experience and low engagement.

```python
fig3 = px.pie(df_metrics, names='is_mobile_friendly', title='Mobile-friendly Websites Distribution', hole=0.3)
fig3.write_html("../../fam-report-site/public/Web-Analytics/mobile_friendly.html")
fig3.show()
```

The resulting plot:

<iframe src="/Web-Analytics/mobile_friendly.html"></iframe>

From this plot, you can observe the distribution of mobile-friendly and non-mobile-friendly websites. If a website is not mobile-friendly, this is an area that should be prioritized for improvement.

### Title and Description Analysis

The title and description of a website are essential for SEO and user experience. The title and description are displayed in search engine results, and they can significantly impact click-through rate and user engagement.

```python
df_metrics['title_similarity'] = df_metrics.apply(lambda x: similarity_ratio(x['desktop_title'], x['mobile_title']), axis=1)
df_metrics['description_similarity'] = df_metrics.apply(lambda x: similarity_ratio(x['desktop_description'], x['mobile_description']), axis=1)
```

In the above code, I have calculated the similarity between the title and description of the desktop and mobile versions of the websites. This is important because a significant difference in the title and description across platforms can lead to confusion and a poor user experience.

```python
fig4 = px.histogram(df_metrics, x='title_similarity', nbins=50, title='Title Tag Similarity (Desktop vs Mobile)')
fig4.update_xaxes(title_text='Similarity Ratio')
fig4.update_yaxes(title_text='Count')
fig4.write_html("../../fam-report-site/public/Web-Analytics/title_similarity.html")
fig4.show()
```

The resulting plot:

<iframe src="/Web-Analytics/title_similarity.html"></iframe>

From this plot, you can observe the distribution of the similarity between the title tags for both desktop and mobile versions of the websites. If there are significant differences in the title tags across platforms, this is an area that should be prioritized for improvement.

## Few Metrics Analysis

In this section, I will analyze a few metrics that can be used to evaluate the performance of a website.

#### Observation 1: **Variation in HTTP Status Codes**

```python
status_diff_df = df_metrics[df_metrics['desktop_http_status'] != df_metrics['mobile_http_status']]
status_diff_df
```

<style>
table {
  width: 100%;
  table-layout: fixed;
}

th, td {
  word-wrap: break-word;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

| Sno | url | desktop_response_time | mobile_response_time | desktop_http_status | mobile_http_status | desktop_title | mobile_title | desktop_description | mobile_description | is_mobile_friendly | title_similarity | description_similarity | response_time_difference |
| --- | --- | -------------------- | -------------------- | ------------------- | ------------------ | ------------- | ------------ | ------------------- | ------------------ | ----------------- | ---------------- | ---------------------- | ------------------------ |
| 522 | [https://www.linkedin.com/company/famindia/](https://www.linkedin.com/company/famindia/) | 0.498417 | 0.951617 | 429 | 999 | NaN | NaN | NaN | NaN | False | 0.0 | 0.0 | 0.4532 |

#### Observation 2: **Title and Description Similarity**

```python
title_diff_df = df_metrics[df_metrics['desktop_title'] != df_metrics['mobile_title']]
description_diff_df = df_metrics[df_metrics['desktop_description'] != df_metrics['mobile_description']]
print(f'Websites with different title for desktop and mobile:\n{title_diff_df}')
print(f'Websites with different description for desktop and mobile:\n{description_diff_df}')
title_diff_df.to_csv('title_difference.csv', index=False)
description_diff_df.to_csv('description_difference.csv', index=False)
```

Websites with different title for desktop and mobile:

<div style="overflow: auto; height: 500px;">
<pre>
Websites with different title for desktop and mobile:
                                                   url  desktop_response_time  \
100  https://www.facebook.com/sharer/sharer.php?u=h...               0.431044   
101  https://twitter.com/intent/tweet?text=How%20to...               1.063523   
102                    https://facebook.com/fampay.in/               0.664518   
107  https://www.facebook.com/sharer/sharer.php?u=h...               0.338678   
108  https://twitter.com/intent/tweet?text=Discover...               1.009599   
..                                                 ...                    ...   
483  https://twitter.com/intent/tweet?text=How%20a%...               1.099900   
497  https://www.facebook.com/sharer/sharer.php?u=h...               0.359163   
498  https://twitter.com/intent/tweet?text=How%20I%...               1.187847   
521               https://www.instagram.com/fam.india/               0.695001   
522         https://www.linkedin.com/company/famindia/               0.498417   

     mobile_response_time  desktop_http_status  mobile_http_status  \
100              1.033060                  200                 200   
101              1.197412                  200                 200   
102              0.708838                  200                 200   
107              1.086183                  200                 200   
108              1.215056                  200                 200   
..                    ...                  ...                 ...   
483              1.193512                  200                 200   
497              0.925535                  200                 200   
498              1.162639                  200                 200   
521              0.789330                  200                 200   
522              0.951617                  429                 999   

    desktop_title                                       mobile_title  \
100      Facebook                Facebook में लॉग इन करें | Facebook   
101           NaN                                                NaN   
102      Facebook                                  सामग्री नहीं मिली   
107      Facebook                Facebook में लॉग इन करें | Facebook   
108           NaN                                                NaN   
..            ...                                                ...   
483           NaN                                                NaN   
497      Facebook                Facebook में लॉग इन करें | Facebook   
498           NaN                                                NaN   
521     Instagram  FamApp (@fam.india) • Instagram photos and videos   
522           NaN                                                NaN   

    desktop_description                                 mobile_description  \
100                 NaN  अपने दोस्तों, परिवार और परिचित लोगों से शेयर क...   
101                 NaN                                                NaN   
102                 NaN                                                NaN   
107                 NaN  अपने दोस्तों, परिवार और परिचित लोगों से शेयर क...   
108                 NaN                                                NaN   
..                  ...                                                ...   
483                 NaN                                                NaN   
497                 NaN  अपने दोस्तों, परिवार और परिचित लोगों से शेयर क...   
498                 NaN                                                NaN   
521                 NaN  498K Followers, 0 Following, 708 Posts - See I...   
522                 NaN                                                NaN   

     is_mobile_friendly  title_similarity  description_similarity  \
100               False          0.228571                     0.0   
101                True          0.000000                     0.0   
102               False          0.000000                     0.0   
107               False          0.228571                     0.0   
108                True          0.000000                     0.0   
..                  ...               ...                     ...   
483                True          0.000000                     0.0   
497               False          0.228571                     0.0   
498                True          0.000000                     0.0   
521                True          0.183673                     0.0   
522               False          0.000000                     0.0   

     response_time_difference  
100                  0.602016  
101                  0.133889  
102                  0.044320  
107                  0.747505  
108                  0.205457  
..                        ...  
483                  0.093612  
497                  0.566372  
498                  0.025208  
521                  0.094329  
522                  0.453200  

[171 rows x 13 columns]
Websites with different description for desktop and mobile:
                                            url  desktop_response_time  \
11         https://fampay.in/blog/author/arohi/               0.257125   
12     https://fampay.in/blog/tag/teens/page/2/               0.329621   
24   https://fampay.in/blog/tag/parents/page/2/               0.242870   
35       https://fampay.in/blog/author/garvita/               0.262975   
38        https://fampay.in/blog/author/suhani/               0.272344   
..                                          ...                    ...   
510              https://famapp.in/blog/page/3/               0.203628   
511              https://famapp.in/blog/page/4/               0.195726   
512              https://famapp.in/blog/page/5/               0.192802   
521        https://www.instagram.com/fam.india/               0.695001   
522  https://www.linkedin.com/company/famindia/               0.498417   

     mobile_response_time  desktop_http_status  mobile_http_status  \
11               0.285484                  200                 200   
12               0.319796                  200                 200   
24               0.270195                  200                 200   
35               0.281540                  200                 200   
38               0.245682                  200                 200   
..                    ...                  ...                 ...   
510              0.203122                  200                 200   
511              0.202963                  200                 200   
512              0.177484                  200                 200   
521              0.789330                  200                 200   
522              0.951617                  429                 999   

                          desktop_title  \
11     Arohi Kaushal - UnRead by FamPay   
12                       FamPay | Teens   
24                     FamPay | Parents   
35   Garvita Gulhati - UnRead by FamPay   
38   Suhani Malhotra - UnRead by FamPay   
..                                  ...   
510           UnRead by FamPay (Page 3)   
511           UnRead by FamPay (Page 4)   
512           UnRead by FamPay (Page 5)   
521                           Instagram   
522                                 NaN   

                                          mobile_title desktop_description  \
11                    Arohi Kaushal - UnRead by FamPay                 NaN   
12                                      FamPay | Teens                 NaN   
24                                    FamPay | Parents                 NaN   
35                  Garvita Gulhati - UnRead by FamPay                 NaN   
38                  Suhani Malhotra - UnRead by FamPay                 NaN   
..                                                 ...                 ...   
510                          UnRead by FamPay (Page 3)                 NaN   
511                          UnRead by FamPay (Page 4)                 NaN   
512                          UnRead by FamPay (Page 5)                 NaN   
521  FamApp (@fam.india) • Instagram photos and videos                 NaN   
522                                                NaN                 NaN   

                                    mobile_description  is_mobile_friendly  \
11                                                 NaN                True   
12                                                 NaN                True   
24                                                 NaN                True   
35                                                 NaN                True   
38                                                 NaN                True   
..                                                 ...                 ...   
510                                                NaN                True   
511                                                NaN                True   
512                                                NaN                True   
521  498K Followers, 0 Following, 708 Posts - See I...                True   
522                                                NaN               False   

     title_similarity  description_similarity  response_time_difference  
11           1.000000                     0.0                  0.028359  
12           1.000000                     0.0                  0.009825  
24           1.000000                     0.0                  0.027325  
35           1.000000                     0.0                  0.018565  
38           1.000000                     0.0                  0.026661  
..                ...                     ...                       ...  
510          1.000000                     0.0                  0.000507  
511          1.000000                     0.0                  0.007236  
512          1.000000                     0.0                  0.015318  
521          0.183673                     0.0                  0.094329  
522          0.000000                     0.0                  0.453200  
</pre>
</div>

#### Observation 3: **Non Mobile Friendly Websites**

```python
non_mobile_friendly_df = df_metrics[df_metrics['is_mobile_friendly'] == False]
print(f'Websites that are not mobile-friendly:\n{non_mobile_friendly_df}')
non_mobile_friendly_df.to_csv('non_mobile_friendly_websites.csv', index=False)
```

<div style="overflow: auto; height: 500px;">
<pre>
Websites that are not mobile-friendly:
                                                   url  desktop_response_time  \
100  https://www.facebook.com/sharer/sharer.php?u=h...               0.431044   
102                    https://facebook.com/fampay.in/               0.664518   
107  https://www.facebook.com/sharer/sharer.php?u=h...               0.338678   
111  https://www.facebook.com/sharer/sharer.php?u=h...               0.333694   
115  https://www.facebook.com/sharer/sharer.php?u=h...               0.582654   
..                                                 ...                    ...   
473  https://www.facebook.com/sharer/sharer.php?u=h...               0.332674   
477  https://www.facebook.com/sharer/sharer.php?u=h...               0.565465   
482  https://www.facebook.com/sharer/sharer.php?u=h...               0.592070   
497  https://www.facebook.com/sharer/sharer.php?u=h...               0.359163   
522         https://www.linkedin.com/company/famindia/               0.498417   

     mobile_response_time  desktop_http_status  mobile_http_status  \
100              1.033060                  200                 200   
102              0.708838                  200                 200   
107              1.086183                  200                 200   
111              1.032703                  200                 200   
115              0.993295                  200                 200   
..                    ...                  ...                 ...   
473              1.011664                  200                 200   
477              0.917697                  200                 200   
482              0.970162                  200                 200   
497              0.925535                  200                 200   
522              0.951617                  429                 999   

    desktop_title                         mobile_title desktop_description  \
100      Facebook  Facebook में लॉग इन करें | Facebook                 NaN   
102      Facebook                    सामग्री नहीं मिली                 NaN   
107      Facebook  Facebook में लॉग इन करें | Facebook                 NaN   
111      Facebook  Facebook में लॉग इन करें | Facebook                 NaN   
115      Facebook  Facebook में लॉग इन करें | Facebook                 NaN   
..            ...                                  ...                 ...   
473      Facebook  Facebook में लॉग इन करें | Facebook                 NaN   
477      Facebook  Facebook में लॉग इन करें | Facebook                 NaN   
482      Facebook  Facebook में लॉग इन करें | Facebook                 NaN   
497      Facebook  Facebook में लॉग इन करें | Facebook                 NaN   
522           NaN                                  NaN                 NaN   

                                    mobile_description  is_mobile_friendly  \
100  अपने दोस्तों, परिवार और परिचित लोगों से शेयर क...               False   
102                                                NaN               False   
107  अपने दोस्तों, परिवार और परिचित लोगों से शेयर क...               False   
111  अपने दोस्तों, परिवार और परिचित लोगों से शेयर क...               False   
115  अपने दोस्तों, परिवार और परिचित लोगों से शेयर क...               False   
..                                                 ...                 ...   
473  अपने दोस्तों, परिवार और परिचित लोगों से शेयर क...               False   
477  अपने दोस्तों, परिवार और परिचित लोगों से शेयर क...               False   
482  अपने दोस्तों, परिवार और परिचित लोगों से शेयर क...               False   
497  अपने दोस्तों, परिवार और परिचित लोगों से शेयर क...               False   
522                                                NaN               False   

     title_similarity  description_similarity  response_time_difference  
100          0.228571                     0.0                  0.602016  
102          0.000000                     0.0                  0.044320  
107          0.228571                     0.0                  0.747505  
111          0.228571                     0.0                  0.699009  
115          0.228571                     0.0                  0.410641  
..                ...                     ...                       ...  
473          0.228571                     0.0                  0.678990  
477          0.228571                     0.0                  0.352232  
482          0.228571                     0.0                  0.378093  
497          0.228571                     0.0                  0.566372  
522          0.000000                     0.0                  0.453200  
</pre>
</div>

#### Observation 4: **Error Status Codes**

```python
error_status_df = df_metrics[(df_metrics['desktop_http_status'] >= 400) | (df_metrics['mobile_http_status'] >= 400)]
print(f'Websites with error status codes:\n{error_status_df}')
```

<div style="overflow: auto; height: 500px;">
<pre>
Websites with error status codes:
                                                   url  desktop_response_time  \
144           https://www.linkedin.com/company/fampay/               0.731333   
220  https://www.linkedin.com/company/fampay/mycomp...               0.527399   
252  https://fampay.in/blog/famcard-your-first-debi...               0.317363   
522         https://www.linkedin.com/company/famindia/               0.498417   

     mobile_response_time  desktop_http_status  mobile_http_status  \
144              0.585905                  999                 999   
220              0.509985                  999                 999   
252              0.326149                  404                 404   
522              0.951617                  429                 999   

        desktop_title      mobile_title desktop_description  \
144               NaN               NaN                 NaN   
220               NaN               NaN                 NaN   
252  UnRead by FamPay  UnRead by FamPay                 NaN   
522               NaN               NaN                 NaN   

    mobile_description  is_mobile_friendly  title_similarity  \
144                NaN               False               0.0   
220                NaN               False               0.0   
252                NaN                True               1.0   
522                NaN               False               0.0   

description_similarity  response_time_difference  
144                     0.0                  0.145428  
220                     0.0                  0.017414  
252                     0.0                  0.008787  
522                     0.0                  0.453200  
</pre>
</div>

### Results

Following the analysis, I observed some key insights:

- Variation in response times and HTTP status codes between desktop and mobile versions of the website.
- Differences in title and descriptions across platforms.
- Non-mobile-friendly websites within the data set.
- Websites with error status codes.
- These observations were obtained through the comparison of metrics derived from desktop and mobile versions of each URL.

Each observation points towards a specific area where improvement may be needed. This process enables the proactive identification and resolution of issues that may negatively impact user experience and engagement.

Overall, this methodology offers a comprehensive approach for evaluating the performance of a website across different platforms, helping to ensure an optimal and consistent user experience.