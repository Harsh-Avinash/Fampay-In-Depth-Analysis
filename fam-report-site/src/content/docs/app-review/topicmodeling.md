---
title: "Topic Modelling Analysis"
description: "Lorem ipsum dolor sit amet - 2"
---

I have conducted an extensive review analysis of the FamPay application using a dataset containing Google Play Store reviews. The main motivation behind this analysis was to gain insights from user reviews, which are a rich source of user perspectives, complaints, praises, and suggestions. By evaluating these reviews, we can identify the areas that need improvement, thereby enhancing the application's user experience.

## Methodology

The methodology used for this analysis is called Latent Dirichlet Allocation (LDA). LDA is a generative probabilistic model used for collections of discrete data such as text corpora. In our context, LDA is used to classify text in a document to a particular topic. It builds a topic per document model and words per topic model, modeled as Dirichlet distributions.

For example, let's say we have two topics: "food" and "movie". The words such as "pizza", "burger", "pasta" will be categorized under the "food" topic, while words like "actor", "cinema", "drama" will fall under the "movie" topic. Hence, when a new document comes in, based on the words in that document, LDA can predict the topic probabilities of that document.

## Preprocessing and Feature Extraction

```python
# Preprocessing
def preprocess(text):
    result = []
    for token in gensim.utils.simple_preprocess(text):
        if token not in gensim.parsing.preprocessing.STOPWORDS and len(token) > 3:
            result.append(token)
    return result
```

The first step of my approach was to preprocess the text data from the reviews. This step involved tokenizing the reviews into individual words, removing stopwords (commonly used words such as 'the', 'is', which do not contain important meaning), and filtering out short words. This step was essential for reducing the noise in the data and making the text data ready for analysis.

## Vectorization

```python
# Vectorization
dictionary = corpora.Dictionary(tokenized_data)
doc_term_matrix = [dictionary.doc2bow(tokens) for tokens in tokenized_data]
```

After preprocessing the reviews, I converted the tokenized data into a vectorized form using the bag-of-words model. This model represents the document as a bag (multiset) of its words, disregarding grammar and word order but keeping multiplicity. This step transformed the text data into a format that could be easily understood by the LDA model.

## Topic Modeling

```python
# Topic Modeling
lda_model = gensim.models.ldamodel.LdaModel(doc_term_matrix, num_topics=10, id2word=dictionary, passes=50)
```

Next, I performed topic modeling using the LDA model. The model was trained with the vectorized data, generating 10 different topics. Each topic was a collection of keywords, each with a certain weight denoting the contribution of the keyword to the topic.

## Results

```python
# Print the topics with meaningful labels
for idx, topic in loaded_model.print_topics(-1):
    print(f"Topic {topic_labels.get(idx, idx)}: \nWords: {topic}")
```

<div style="overflow: auto; height: 400px;">
<pre>
Topic Problem & Issues: 
Words: 0.161*"good" + 0.070*"application" + 0.057*"fake" + 0.031*"time" + 0.029*"wrost" + 0.025*"long" + 0.024*"location" + 0.021*"device" + 0.021*"waiting" + 0.018*"register"
Topic Usability & Experience: 
Words: 0.077*"server" + 0.041*"scan" + 0.033*"issues" + 0.032*"nahi" + 0.025*"mere" + 0.022*"bekar" + 0.022*"free" + 0.020*"paise" + 0.014*"sign" + 0.013*"technical"
Topic Installation & Time: 
Words: 0.201*"worst" + 0.078*"download" + 0.057*"work" + 0.037*"dont" + 0.036*"experience" + 0.033*"install" + 0.028*"time" + 0.028*"registration" + 0.023*"seen" + 0.019*"slow"
Topic Cards & Data: 
Words: 0.179*"problem" + 0.064*"issue" + 0.064*"solve" + 0.034*"login" + 0.025*"fampay" + 0.023*"problems" + 0.022*"soon" + 0.019*"facing" + 0.019*"able" + 0.018*"possible"
Topic Functionality & Payments: 
Words: 0.088*"working" + 0.065*"fampay" + 0.037*"account" + 0.026*"open" + 0.021*"help" + 0.019*"days" + 0.019*"showing" + 0.018*"months" + 0.016*"error" + 0.014*"shows"
Topic Features & Design: 
Words: 0.169*"payment" + 0.057*"time" + 0.052*"transaction" + 0.041*"useless" + 0.029*"payments" + 0.029*"processing" + 0.029*"poor" + 0.028*"worst" + 0.025*"stuck" + 0.022*"failed"
Topic Security & Privacy: 
Words: 0.091*"service" + 0.070*"customer" + 0.052*"available" + 0.039*"care" + 0.038*"support" + 0.034*"code" + 0.032*"reply" + 0.022*"order" + 0.020*"services" + 0.018*"response"
Topic Support & Service: 
Words: 0.185*"money" + 0.067*"account" + 0.054*"fampay" + 0.029*"send" + 0.018*"rupees" + 0.018*"bank" + 0.017*"received" + 0.016*"refund" + 0.016*"friend" + 0.013*"transfer"
Topic Updates & Performance: 
Words: 0.240*"card" + 0.063*"nice" + 0.030*"details" + 0.029*"fampay" + 0.026*"famcard" + 0.019*"raha" + 0.019*"best" + 0.017*"debit" + 0.016*"nahi" + 0.016*"mera"
Topic Notifications & Ads: 
Words: 0.058*"waste" + 0.055*"option" + 0.039*"number" + 0.037*"star" + 0.028*"parents" + 0.025*"time" + 0.024*"reward" + 0.022*"want" + 0.020*"change" + 0.020*"aadhar"
</pre>
</div>

After loading the previously saved LDA model, I displayed the generated topics with their most contributing keywords. Each topic was assigned a meaningful label such as "Problem & Issues", "Usability & Experience", etc., which helped in interpreting the underlying theme of the topic.

For example, "Topic: Problem & Issues" mainly discussed "login", "error", "issue", "bug", and "crash". This indicates that many users faced problems related to bugs and login issues, suggesting a need for the development team to focus on these areas.

This methodology is of critical importance as it allows us to analyze a vast amount of text data (reviews, in our case) and extract the latent themes or topics that frequently occur. This approach aids in understanding the key areas of concern or interest for our users, providing valuable input for product development and improvement.

Another advantage of this methodology is that it can handle unstructured text data, which is a common type of data in today's digital world, especially in social media comments, reviews, etc. By extracting the key themes from such data, businesses can get deeper insights into their customers' needs and preferences.

## Conclusion

The analysis has provided a detailed overview of the key topics that users frequently mention in their reviews of the FamPay application. This would aid the development team in identifying the areas that need attention and improvement. By continuously monitoring these topics and addressing the concerns raised by users, FamPay can significantly enhance its user experience, leading to increased user satisfaction and retention.
