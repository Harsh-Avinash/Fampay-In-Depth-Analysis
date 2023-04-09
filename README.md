# Fampay in Depth Analysis
This repository contains code and information used for creating a report for Fampay. The aim of the report is to impress the company and secure a full-time internship for the summer.

## Folder Structure
The repository is structured as follows:

**Competion:** This folder contains the code used to compare Fampay with its competitors. It includes the **notebook comp_compare.ipynb**, which compares Fampay's market share with that of its competitors, and **IndianComp.csv**, which contains data on Indian companies.

**Crawler:** This folder contains the code used to crawl the web and gather data. It includes several notebooks such as **deep_crawler.ipynb**, **deep_crawler_sel.ipynb**, and **main.ipynb**. These notebooks scrape data from different websites using different techniques such as BeautifulSoup and Selenium. The **links.txt** file contains the links of the websites to be crawled.

**Information:** This folder contains several files and subfolders that contain information about Fampay, its products, and its team. It includes documents such as **Main.docx**, which contains the main report, and **TeamFampay.xlsx**, which contains information about Fampay's team.

**Keys:** This folder contains the authentication key Analytical data.

**Performance:** This folder contains the code used to measure the performance of Fampay's website. It includes two subfolders: Code Driven and Community Driven. The former contains code-driven metrics such as **website_metrics.csv**, **mainV1.ipynb**, and **mainV2.ipynb**, while the latter contains community-driven metrics such as analytics.html and main.ipynb.

**Searcher:** This folder contains the code used to search for information related to Fampay. It includes the notebook **main.ipynb**, which searches for information related to Fampay using Google.

**Warehouse:** This folder contains the code used to clean data obtained from different sources. It includes the **notebook cleaner.ipynb**, which cleans data obtained from web crawling, and **deep_crawler_sel_clean.txt**, which contains the cleaned data.

## Usage

To use the code in this repository, you will need to have the necessary software installed. This includes Python 3.10 and the required Python packages such as pandas, numpy, and matplotlib. Additionally, you will need access to Fampay's Google Analytics data and the authentication key (fampay-analytics-xxxx.json) stored in the Keys folder.

To run the code, you can simply open the relevant notebook in Jupyter Notebook or JupyterLab and run the code cells. Before running the code, make sure to update any file paths or API keys as necessary.