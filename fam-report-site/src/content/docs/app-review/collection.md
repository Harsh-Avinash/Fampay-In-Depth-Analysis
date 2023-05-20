---
title: "App Review Collection"
description: "Docs intro"
---
For the purpose of this report, I decided to undertake a detailed evaluation of the FamPay application available on the Google Play Store. FamPay, as we know, is a unique solution that enables cashless transactions for teenagers, making them more financially aware. The Google Play Store is a prime source of direct user feedback and it's crucial for the development team to gain insights from these reviews.

Understanding and analyzing the reviews from the Play Store will allow us to draw actionable insights to further improve the app. User feedback is a gold mine of information which could provide insights about potential improvements, bugs, and general sentiment about the application.

## Methodology

I decided to implement an approach to fetch and analyze user reviews from the Google Play Store for the FamPay application. The methodology consists of two steps:
1.	**Data Collection**: I used the google_play_scraper Python library, which allows us to scrape Google Play Store reviews conveniently. With this library, we can specify the number of reviews to fetch, sort them by relevance, and filter them by star rating.
2.	**Data Analysis**: After fetching and storing the reviews, the next step would be to analyze them. This could be through various methods such as sentiment analysis, natural language processing, frequency analysis, etc. Though this code doesn't cover the analysis part, this will be the next crucial step.

Here's how the code works:

```python
# Defining the function to get reviews
def get_reviews(app_id, lang, country, token=None):
    print("Fetching reviews for", app_id, "with token", token)
    result, continuation_token = reviews(
        app_id,
        lang=lang,
        country=country,
        count=1000, # Count of reviews to fetch per request
        sort=2,  # Sort by most relevant
        filter_score_with=i,  # Filter by star rating
        continuation_token=token 
    )
    return result, continuation_token
```

## The Code

I start by defining some variables and creating a function that fetches the reviews. The function get_reviews uses the reviews function from the google_play_scraper library.

The function takes four arguments - app_id, lang, country, and token. The app_id is the unique identifier for the FamPay app on the Play Store. I've set lang and country to 'en' and 'in' respectively, to focus on English language reviews from India. The token is used for pagination to fetch the next batch of reviews.
I set the count parameter to 1000 to fetch 1000 reviews per request. I used sort=2 to sort the reviews by relevance and filter_score_with=i to filter the reviews based on the star rating (from 1 to 5 stars).
After defining the function, I used a loop to iterate over different star ratings (1 to 5). For each star rating, I created a CSV file, initiated the CSV writer, and started fetching the reviews in batches.

```python
# Fetch one-star reviews in batches and save them to a CSV file
with open(file_name, 'w', newline='', encoding='utf-8') as csvfile:
    fieldnames = ['reviewId', 'userName', 'userImage', 'content', 'score', 'thumbsUpCount', 'reviewCreatedVersion', 'at', 'replyContent', 'repliedAt']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    
    writer.writeheader()
    
    token = None
    review_count = 0

    while review_count < 10000000:  # Change this to the desired number of reviews
        reviews_batch, token = get_reviews(app_id, lang, country, token)
        if not reviews_batch:
            break  # Break if there are no more reviews

        for review in reviews_batch:
            writer.writerow(review)
            review_count += 1

        print(review_count, "reviews fetched so far")
```

In this part, I used the csv module to create a CSV writer and set the field names as per the review data structure. I started with no continuation token (token = None) and set review_count to 0. I fetched the reviews in batches until I've fetched the desired number of reviews. For each batch of reviews, I wrote them to the CSV file and incremented the review_count.

This process results in five CSV files each containing reviews of a specific star rating. This categorization can help us in analyzing the reviews based on their ratings, which can provide useful insights.

## Conclusion

This method of fetching and organizing reviews based on their star rating is an efficient way of managing large amounts of feedback. It allows us to pinpoint specific issues faced by users who gave a certain rating. This approach is scalable and can be used regularly to keep track of user feedback.

In the next steps, these reviews can be analyzed using various data analysis techniques to gain deeper insights and understand the user sentiment towards the FamPay application. This understanding can then guide the development process and assist in making data-driven decisions.