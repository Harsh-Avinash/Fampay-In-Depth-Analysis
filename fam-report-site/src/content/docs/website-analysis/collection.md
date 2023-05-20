---
title: "Website & URL Collection"
description: "Docs intro"
---

Web scraping is an automated method used to extract large amounts of data from websites quickly. In the era of data-driven decision making, it's crucial to understand how the product is presented, how it's interconnected, and how it's received by the audience. This analysis focuses on using web scraping to gather detailed information from the FamPay website.

## Libraries Used

- **Requests**: Simplifies making HTTP requests in Python.
- **BeautifulSoup**: Used for web scraping purposes to pull the data out of HTML and XML files.
- **Pandas**: An open-source data analysis and manipulation tool, used for data cleaning and handling in this project.

## Web Scraping Process

### Choosing Paths

The analysis focused on specific paths in the FamPay website including "press", "blog", "parent", "terms", "about", "partner", "privacy", "faqs", "careers", "friends", and more. This was done to understand the content in each of these sections.

```python
paths = [
    "press",
    "blog",
    "",
    "blog/",
    "contact",
    "parent",
    "terms",
    "about",
    "partner",
    "privacy",
    "faqs",
    "careers",
    "friends"
]
```

### Retrieving Links

A function `get_links(url)` was created to retrieve all the links from a given URL. This function made a GET request to the URL, parsed the content using BeautifulSoup, found all the `<a>` tags, and then further refined this list to include only those links which belong to the pre-defined paths and contain the string "fam" in the URL.

```python
def get_links(url):
    ...
```

### Crawling Through the Website

A recursive function `crawl(url, depth, writer)` was designed to start with a base URL and recursively follow links on the page to a certain depth. Depth refers to how many layers of links will be followed from the starting page, a common technique in web crawling called a depth-first search.

```python
def crawl(url, depth, writer):
    ...
```

### Data Storage and Cleaning

All the crawled links were saved in a CSV file named "famapp_crawled_links.csv" along with the page they were found on. Post-processing was done using the pandas library to remove any duplicate entries, keeping the data clean and manageable.

```python
with open("famapp_crawled_links.csv", "w") as f:
    ...

df = pd.read_csv("famapp_crawled_links.csv")
df.drop_duplicates(inplace=True)
df.to_csv("fapapp_cleaned_crawled_links.csv", index=False)
```

## Conclusion

By the end of this process, valuable insights into the structure of the FamPay website and its content were captured. The resulting data can be further used for deeper analysis and decision-making processes. This demonstrates the power and utility of web scraping for data-driven analysis and decision-making.
