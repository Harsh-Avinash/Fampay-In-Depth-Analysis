---
title: "APK Links and Information"
description: "Docs intro"
---

In this project, I have developed a Python script that automates the process of extracting data about FamPay's app versions from APKMirror. The script uses a combination of Selenium WebDriver and BeautifulSoup to navigate the website, locate the relevant data, and extract it. The data is then saved to a CSV file for further analysis. Additionally, I've implemented a function to convert the scraped APK links to a more standardized format.

### Methodology

#### 1\. Web Scraping with Selenium

Selenium WebDriver is a powerful tool for automating browser activities. In this project, it is used to load the APKMirror webpage that lists the FamPay app versions. The WebDriver waits until the page is fully loaded before proceeding.

```python
try:
    driver = webdriver.Chrome()
    driver.get(url)
    print("URL loaded")
except Exception as e:
    print(f"Error loading URL: {e}")

```

#### 2\. Data Extraction

Once the page is loaded, the script uses Selenium's built-in functions to locate the elements that contain the data we're interested in. This includes the app's title, developer name, upload date, app link, and APK link. The script iterates over all the app rows on the page, extracting this data and storing it in lists.

```python
for app_row in app_rows:
    try:
        # Extract relevant data
        app_title = app_row.find_element(By.CLASS_NAME, 'appRowTitle').text
        app_link = app_row.find_element(By.CLASS_NAME, 'appRowTitle').find_element(By.TAG_NAME, 'a').get_attribute('href')
        developer = app_row.find_element(By.CLASS_NAME, 'byDeveloper').text
        upload_date = app_row.find_element(By.CLASS_NAME, 'dateyear_utc').text
        apk_link = app_row.find_element(By.CLASS_NAME, 'downloadLink').get_attribute('href')

        app_titles.append(app_title)
        developers.append(developer)
        upload_dates.append(upload_date)
        app_links.append(app_link)
        apk_links.append(apk_link)
    except Exception as e:
        print(f"Error extracting data for an app: {e}")

```

#### 3\. Pagination Handling

The script also handles pagination on the website. After extracting the data from the current page, it checks if there's a "next" button to go to the next page. If such a button is found, the script navigates to the next page and repeats the data extraction process. This continues until no more pages are found.

```python
while True:
    # Extract data from the current page
    titles, devs, dates, links, apk_links_page = extract_data(driver)
    app_titles.extend(titles)
    developers.extend(devs)
    upload_dates.extend(dates)
    app_links.extend(links)
    apk_links.extend(apk_links_page)

    # Check if there's a "next" button to go to the next page
    try:
        next_page = driver.find_element(By.CLASS_NAME, "nextpostslink")
        next_page_url = next_page.get_attribute("href")
        driver.get(next_page_url)
    except Exception as e:
        print("No more pages found")
        break

```

#### 4\. Data Storage

The extracted data is stored in a pandas DataFrame, which is a versatile data structure for data manipulation and analysis. The DataFrame is then saved to a CSV file, which can be easily imported into other data analysis tools.

```python
# Save data to a dataframe
data = {'App Title': app_titles,
        'Developer': developers,
        'Upload Date': upload_dates,
        'App Link': app_links,
        'APK Link': apk_links}

df = pd.DataFrame(data)

driver.quit()

df.to_csv('apkmirror_fam.csv', index=False)

```

#### 5\. URL Conversion

Finally, the script reads the saved CSV file and applies a function to convert the APK links to a more standardized format. This involves extracting the version number from the original URL and using it to construct a new URL that follows a specific pattern. The converted URLs are then saved back to the CSV file.

```python
import re

def convert_url(input_url):
    # define the pattern to match the version number
    pattern = r'(\d+-){2}\d+'

    # define the base URL and the version string
    base_url = 'https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/'
    version_string = 'fampay-teen-upi-payment-app-'

    # extract the version number from the input URL
    version_number = re.search(pattern, input_url).group(0)

    # construct the output URL
    output_url = base_url + version_number + '-release/' + version_string + version_number + '-android-apk-download/'

    # return the output URL
    return output_url

df = pd.read_csv('apkmirror_fam_more.csv')
df['APK Link'] = df['APK Link'].apply(convert_url)
df.to_csv('apkmirror_fam.csv', index=False)
```

### Links

<div style="overflow: auto; height: 500px;">
<pre>
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-3-2-6-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-3-2-5-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-3-2-4-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-3-2-3-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-3-2-2-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-3-1-7-famx-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-3-2-1-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-3-1-6-famx-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-3-1-1-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-3-0-2-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-3-0-1-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-9-9-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-9-8-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-9-7-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-9-6-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-9-3-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-9-2-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-9-1-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-9-0-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-8-9-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-8-7-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-8-5-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-8-4-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-8-3-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-8-1-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-2-7-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-2-3-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-1-7-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-1-6-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-1-4-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-1-2-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-0-8-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-0-7-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-0-6-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-0-4-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-0-3-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-0-2-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-2-0-0-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-9-9-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-9-7-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-9-4-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-9-0-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-8-9-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-8-8-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-8-7-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-8-6-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-8-5-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-8-3-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-8-1-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-7-8-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-7-7-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-7-5-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-7-4-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-7-3-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-7-2-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-7-1-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-6-9-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-6-8-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-6-7-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-6-6-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-6-2-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-6-1-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-5-9-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-5-8-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-5-6-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-5-5-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-5-3-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-4-8-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-4-7-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-4-5-release/
https://www.apkmirror.com/apk/fampay/fampay-prepaid-card-payments-for-teenagers/fampay-prepaid-card-payments-for-teenagers-1-4-1-release/
</pre>
</div>


### Conclusion

This script automates the process of extracting data about FamPay's app versions from APKMirror, transforming the data into a more usable format, and saving it for further analysis. This can save a significant amount of time and effort compared to manually searching for and recording this data. Furthermore, the script can be easily adapted to extract data about other apps or from other websites, making it a versatile tool for a variety of web scraping tasks.