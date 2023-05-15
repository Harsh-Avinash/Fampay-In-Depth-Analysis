---
title: "NGramp Analysis of App Reviews"
description: "Lorem ipsum dolor sit amet - 2"
---

In this analysis, I have used a technique called n-gram analysis to understand the most common phrases used in the Google Play Store reviews for the Fampay app. N-grams are contiguous sequences of n items from a given sample of text or speech. They are widely used in natural language processing and computational linguistics.

## Methodology

The methodology I have used involves generating n-grams from the reviews and counting their frequencies. I have used the nltk library's ngrams function to generate the n-grams. This function takes a text and an integer n as input and returns an n-gram object. I have then used the Counter class from the collections library to count the frequencies of these n-grams.

The n-grams are generated for n ranging from 1 to 10. For each value of n, I have sorted the n-grams by their frequencies in descending order. This allows me to identify the most common phrases of different lengths in the reviews.

```python
ngrams_freq = Counter(get_ngrams(text, i)) # type: ignore
sorted_ngrams = sorted(ngrams_freq.items(), key=lambda x: x[1], reverse=True)
```

## Significance

The significance of this analysis lies in its ability to identify patterns in the reviews. By looking at the most common phrases, we can get a sense of what aspects of the app users are talking about the most. This can provide valuable insights for the app's developers. For example, if a phrase like "great customer service" appears frequently, it suggests that users are happy with the app's customer service. On the other hand, if a phrase like "app crashes" appears frequently, it suggests that the app has stability issues that need to be addressed.

## Output

For each n-gram, I have also identified the review that contains this n-gram and has the most thumbs up count. This is done by iterating over the reviews and checking if the n-gram is present in the review content. If it is, I check the thumbs up count for that review and update the maximum thumbs up count and the corresponding review ID if necessary.

```python
for index, row in df.iterrows():
    thumbs_up_count = row['thumbsUpCount']
    review_content = row['content']
    if thumbs_up_count > max_thumbs_up and ngram in review_content:
        max_thumbs_up = thumbs_up_count
        max_review_id = row['reviewId']
```

This allows me to identify the reviews that are most representative of the common phrases in the reviews. These reviews are likely to be particularly informative for the app's developers.

Finally, I have computed the number of times each n-gram appears per 1000 words and stored the results in a DataFrame. This DataFrame is then saved to a CSV file for further analysis.

```python
word_count = float(freq / total_words) * 1000
results_df = results_df.append({'ngram': ngram, 'word_count': word_count, 'review_id': max_review_id, 'thumbs_up_count': max_thumbs_up}, ignore_index=True) # type: ignore
results_df.to_csv('ngram_results.csv', index=False)
```

<div style="overflow: auto; height: 400px;">
<pre>
ngram,word_count,review_id,thumbs_up_count,ngram_word_count
Ngam count of : 1
app,40.17196387366552,fb1efa00-85b4-48ae-b444-454cf3261b4d,5900,1
is,25.65405764611479,fb1efa00-85b4-48ae-b444-454cf3261b4d,5900,1
I,20.603751580888293,3fc5411b-ce5f-4e13-8fce-4eaf5ae6f4a2,5787,1
to,18.378359921149297,fb1efa00-85b4-48ae-b444-454cf3261b4d,5900,1
and,17.43212522605225,3fc5411b-ce5f-4e13-8fce-4eaf5ae6f4a2,5787,1
for,17.133348830306826,3fc5411b-ce5f-4e13-8fce-4eaf5ae6f4a2,5787,1
the,15.55213221282335,fb1efa00-85b4-48ae-b444-454cf3261b4d,5900,1
this,14.43648145156736,fb1efa00-85b4-48ae-b444-454cf3261b4d,5900,1
my,13.668855942498348,fb1efa00-85b4-48ae-b444-454cf3261b4d,5900,1
not,13.488276802212653,fb1efa00-85b4-48ae-b444-454cf3261b4d,5900,1
Ngram count of : 2
this app,6.177776552028463,fb1efa00-85b4-48ae-b444-454cf3261b4d,5900,2
app for,5.765399460757855,7a6263a3-2b8b-4446-975a-5ed5de026268,564,2
is not,4.2767706933845,fb1efa00-85b4-48ae-b444-454cf3261b4d,5900,2
app is,4.039062879626602,90844e2a-51bf-4b44-9a88-5ad5f3fd520b,1515,2
nice app,3.241231405273436,ae72340c-b6cc-47d5-b0e6-3bcd10ca0129,851,2
good app,3.2175919541814904,90844e2a-51bf-4b44-9a88-5ad5f3fd520b,1515,2
for teenagers,3.074441944791375,7ba080f0-271f-47de-923e-3e3cc1771113,916,2
I am,3.046862585184105,7eaf43cd-d49f-4a47-8290-269e7f51acbb,3839,2
is very,3.0035235915155387,e3cd21a5-65da-468a-b698-cc8f50c17a08,1142,2
very good,2.692927470224141,77e15adc-aeff-4d1a-ba45-9cd284af0180,350,2
Ngram count of : 3
This app is,1.6856241931395688,7ba080f0-271f-47de-923e-3e3cc1771113,916,3
app for teenagers,1.6422851994710017,7a6263a3-2b8b-4446-975a-5ed5de026268,564,3
is not working,1.0237195625650906,23af139e-d562-4fa0-af66-9e0736750332,2165,3
this app is,0.9784106146388614,3490a6a5-3c4d-43c3-bec3-48f62e1b35d9,663,3
very good app,0.9429514380009428,e59ec378-f0a6-4e0c-9fbd-971929e65a2b,104,3
app is very,0.9153720783936732,e44225e8-90c0-4aa1-9a28-62ac7c12a741,48,3
not able to,0.8168743655105661,90844e2a-51bf-4b44-9a88-5ad5f3fd520b,1515,3
good app for,0.7617156462960263,65c7f558-76b0-4fc7-9a1f-629dc64fe6d6,151,3
best app for,0.7610589948768056,4c88590d-51fa-4b86-aa59-8164e41d45a2,162,3
Best app for,0.7485826179116121,3ed0a1e9-2d24-4f78-a541-2866313a99d3,314,3
Ngram count of : 4
This app is very,0.4898619587386514,277678c6-744f-4f11-85f7-93b14ae6a6a7,43,4
am not able to,0.4189436054628145,393f67fc-2649-4560-8380-17805d508ddb,588,4
I am not able,0.3348922238025633,393f67fc-2649-4560-8380-17805d508ddb,588,4
very good app for,0.2685704304612714,094184a2-5b90-414c-9c5a-5f143a659bcc,31,4
app is very good,0.2528107963999742,949a9500-8808-4fbd-92a6-35107ab84daf,20,4
this app is very,0.2423043736924428,e4d8941d-d0ac-4f1b-a374-1e99b5a14ba5,12,4
I love this app,0.2423043736924428,57d8523c-ef06-442d-9460-9e5c47154d99,255,4
best app for teenagers,0.2357378595002357,4c88590d-51fa-4b86-aa59-8164e41d45a2,162,4
Best app for teenagers,0.2265447396311457,eeb3f50c-7cb9-428d-913c-a60836cd07dd,24,4
good app for teenagers,0.2252314367927043,094184a2-5b90-414c-9c5a-5f143a659bcc,31,4
Ngram count of : 5
I am not able to,0.317162635483604,393f67fc-2649-4560-8380-17805d508ddb,588,5
This app is very good,0.1267337239095975,70545606-c90b-45b6-987e-acf04b5e2d58,11,5
is the best app for,0.1083474841714175,4c88590d-51fa-4b86-aa59-8164e41d45a2,162,5
i am not able to,0.0847080330794718,6b85ee87-d55b-4218-b7e6-d5d83da9b34e,23,5
very good app for teenagers,0.082081427402589,094184a2-5b90-414c-9c5a-5f143a659bcc,31,5
is a very good app,0.0748582617911612,e4e5165b-9421-4f53-a5b5-a2ac12076520,85,5
This app is good but,0.0669784447605126,677f5c3d-8120-4c1b-a816-818211ef9a10,17,5
this app is very good,0.0656651419220712,7d6e6720-75ef-4800-9399-c999fa9b8631,6,5
This is the best app,0.0636951876644091,74faa10e-6404-492e-bfa8-e306f35c55ee,7,5
a very good app for,0.0636951876644091,e4d8941d-d0ac-4f1b-a374-1e99b5a14ba5,12,5
Ngram count of : 6
This is the best app for,0.0400557365724634,d2763a67-bdc9-400e-9dff-19478c668a85,6,6
is the best app for teenagers,0.038742433734022,4c88590d-51fa-4b86-aa59-8164e41d45a2,162,6
is a very good app for,0.0328325709610356,e4d8941d-d0ac-4f1b-a374-1e99b5a14ba5,12,6
This is a very good app,0.0315192681225941,5ce7da45-b71a-4e5e-ab10-b601b0760bb5,9,6
I am not able to do,0.0275793596072699,54d4860e-9aef-4ab7-b44b-cf5978a9c881,5,6
This app is very useful for,0.0275793596072699,2cbbe105-b0ab-40aa-959c-0a432c2571e7,13,6
this is the best app for,0.0256094053496077,4c88590d-51fa-4b86-aa59-8164e41d45a2,162,6
This app is very good for,0.0236394510919456,a624c987-3662-4bf6-a89f-08e04a66da34,1,6
I am not able to see,0.0229827996727249,54ecc150-3261-4f83-8df5-26750a8e202f,5,6
I am not able to pay,0.0216694968342835,a1d3b6a8-fa6e-443a-a065-8119c01c34ef,2,6
Ngram count of : 7
I am not able to see my,0.0183862397381799,54ecc150-3261-4f83-8df5-26750a8e202f,5,7
This is a very good app for,0.0137896798036349,5ce7da45-b71a-4e5e-ab10-b601b0760bb5,9,7
This is the best app for teenagers,0.0124763769651935,d2763a67-bdc9-400e-9dff-19478c668a85,6,7
This app is very useful for teenagers,0.0118197255459728,2cbbe105-b0ab-40aa-959c-0a432c2571e7,13,7
I have been using this app for,0.0105064227075313,b7b85473-21bf-4900-b383-bdcffde8e410,53,7
this is the best app for teenagers,0.0098497712883106,4c88590d-51fa-4b86-aa59-8164e41d45a2,162,7
am not able to see my card,0.0091931198690899,df2ee056-497c-4152-ad23-7f1cb868bc71,2,7
is one of the best app for,0.0091931198690899,ebffa39b-470a-4bc0-a3b2-6b5c83dbff14,3,7
I am not able to send money,0.0085364684498692,8c6d507d-f861-455d-b184-4c73a13ab84f,1,7
for teenagers so I would highly recommend,0.0085364684498692,,0,7
Ngram count of : 8
are currently building the fam experience for your,0.0072231656114278,d6c810e9-300a-4f59-a31d-b505b10563af,1,8
I am not able to see my card,0.0072231656114278,df2ee056-497c-4152-ad23-7f1cb868bc71,2,8
for teenagers so I would highly recommend this,0.0072231656114278,,0,8
we are currently building the fam experience for,0.0065665141922071,d6c810e9-300a-4f59-a31d-b505b10563af,1,8
debit card app which is specially made for,0.0065665141922071,,0,8
app in my phone which is specially made,0.0059098627729864,,0,8
in my phone which is specially made for,0.0059098627729864,,0,8
so I would highly recommend this app to,0.0052532113537656,,0,8
my phone which is specially made for teenagers,0.0052532113537656,,0,8
app I have ever seen in my life,0.0045965599345449,6e28611e-09f7-4dd8-991b-e746c69628f2,24,8
Ngram count of : 9
we are currently building the fam experience for your,0.0059098627729864,d6c810e9-300a-4f59-a31d-b505b10563af,1,9
app in my phone which is specially made for,0.0059098627729864,,0,9
in my phone which is specially made for teenagers,0.0052532113537656,,0,9
"is the best debit card for teenagers, lovely tool",0.0045965599345449,,0,9
are currently building the fam experience for your location,0.0039399085153242,d6c810e9-300a-4f59-a31d-b505b10563af,1,9
apps available in play store but this FamPay app,0.0039399085153242,,0,9
available in play store but this FamPay app is,0.0039399085153242,,0,9
in play store but this FamPay app is really,0.0039399085153242,,0,9
the best debit card for teenagers who do well.,0.0039399085153242,,0,9
so I would highly recommend this card to everyone.,0.0039399085153242,,0,9
</pre>
</div>

## General Approach

The general approach I have taken in this analysis is to use n-gram analysis to identify patterns in the reviews and then use these patterns to identify the most representative reviews. This approach is based on the assumption that the most common phrases in the reviews are likely to be the most important aspects of the app from the users' perspective. By identifying the most representative reviews, I can provide the app's developers with concrete examples of these aspects.
