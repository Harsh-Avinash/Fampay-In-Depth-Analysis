---
title: "Instagram Data Collection"
description: "Docs intro"
---

In this section, I will detail how I used Instagram's public API to collect data from FamPay's Instagram profile. I will also go over the techniques I employed for storing and organizing the data.

#### Tools I Used

*   [Instaloader](https://instaloader.github.io/): A Python library that allowed me to download Instagram posts and other media.
*   [Pandas](https://pandas.pydata.org/): A Python library that I used for data manipulation and analysis.

#### Steps I Followed

### 1\. Setting up the Environment

First, I installed the necessary Python libraries for the project. Instaloader was used to access Instagram's API and pandas was used to manage the data I collected.

```python
import instaloader
import pandas as pd
import csv
```

### 2\. Logging into Instagram

I set up an Instagram account specifically for this project and logged in using the following script:

```python
username = 'HA_Scrapper'
password = 'Disturbuteablepassword'

L = instaloader.Instaloader()

L.context.username = username
L.context.password = password
L.login(username, password)
```

### 3\. Fetching FamPay's Instagram Profile

With the help of Instaloader, I fetched FamPay's Instagram profile:

```python
profile = instaloader.Profile.from_username(L.context, 'fam.india')
```

### 4\. Extracting Post Data

Next, I extracted the following information from each of FamPay's Instagram posts:

*   Shortcode
*   Caption
*   Upload time
*   Number of likes
*   Number of comments
*   Whether it's a video or not
*   Number of video views (if it's a video)
*   Post URL

The code snippet for the same is as follows:

```python
for post in profile.get_posts():
    post_data = {
        'shortcode': post.shortcode,
        'caption': post.caption,
        'upload_time': post.date_local,
        ...
    }
    posts_data.append(post_data)
```

### 5\. Saving the Data to a CSV File

Finally, I saved the extracted data into a CSV file, 'fampay\_instagram\_data\_latest\_all.csv', for later use. The CSV file has a row for each Instagram post and a column for each piece of information I gathered.

```python
with open('fampay_instagram_data_latest_all.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    ...
    writer.writerow(post_data)
```

#### Conclusion

This completes the data extraction process for Instagram posts. In the subsequent sections, I will discuss how I used this data to gather insights and reviews. Stay tuned!

### Instagram Comments (Reviews) Collection

In addition to gathering post data, I also extracted comments from each post, treating them as user reviews. Here are the steps I followed:

#### Tools I Used

*   Instaloader: As mentioned earlier, this Python library helped me fetch Instagram posts and other media.
*   Pandas: I used this powerful Python data handling library to manage and save my collected comments.

#### Steps I Followed

### 1\. Loading Session from Instagram

I logged in to Instagram using my previously set up account.

```python
INSTAGRAM_USERNAME = 'HA_Scrapper'
INSTAGRAM_PASSWORD = 'Disturbuteablepassword'

loader = login_instagram(INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD)
```

### 2\. Extracting Post Comments

I then extracted the comments from each post using the `get_post_comments` function. This function goes through each comment of the post and saves the commenter's username, the comment text, and the time the comment was created.

```python
for shortcode in shortcodes:
    if shortcode in processed_shortcodes:
        print(f"Skipping shortcode {shortcode} as it's already processed.")
        continue

    comments = get_post_comments(loader, shortcode)

    print(count, "/", count_total, end='\r')
    print(f"Got {len(comments)} comments for shortcode {shortcode}")

    for idx, comment in enumerate(comments, start=1):
        count_c += 1
        print(count_c, "/", len(comments), end='\r')
        data.append({'username': comment['username'], 'text': comment['text'], 'shortcode': shortcode, 'time': comment['time']})

    processed_shortcodes.add(shortcode) # Add shortcode to processed set after processing all comments

    # Write to CSV after each shortcode is processed
    dfr = pd.concat([dfr, pd.DataFrame(data)])
    dfr = dfr.drop_duplicates()  # Remove duplicate rows
    dfr.to_csv(output_csv, mode='a', header=not os.path.exists(output_csv), index=False)
    data = [] # Clear the data list

    count_c = 0
```

Next, I extracted the following information from each of FamPay's reviews posts:

*  Username
*  Comment text
*  Post shortcode
*  Time of comment

### 3\. Writing Comments to a CSV File

I stored the comments in a DataFrame, a special data structure provided by pandas. After collecting comments for all posts, I saved the DataFrame to a CSV file 'fampay\_instagram\_comments\_all\_new.csv'. The CSV file contains a row for each comment and columns for the username, comment text, the post's shortcode, and the time the comment was made.

```python
dfr = pd.concat([dfr, pd.DataFrame(data)])
dfr = dfr.drop_duplicates()  # Remove duplicate rows
dfr.to_csv(output_csv, mode='a', header=not os.path.exists(output_csv), index=False)
```

#### Conclusion

With this, I've collected and stored all comments from each post made by FamPay on Instagram. These comments, acting as user reviews, provide valuable insights into user sentiment and feedback, which are critical for improving FamPay's services and customer experience. This process demonstrates the power of social media scraping for gathering user-generated content. In the next section, I will delve into how I analyze the collected post and review data.