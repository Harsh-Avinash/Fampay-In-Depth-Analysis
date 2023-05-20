---
title: "Regression Analysis of App Reviews"
description: "Lorem ipsum dolor sit amet - 2"
---

In this analysis, I have used a dataset of Google Play Store reviews for the Fampay app. The dataset was scraped and stored in a CSV file, which I then loaded into a pandas DataFrame for further analysis. The aim of this analysis is to understand the relationship between the app's version, the number of thumbs up a review received, and the score given by the user. This is a crucial metric for evaluation as it helps us understand how different versions of the app are received by users and how popular opinion (expressed through thumbs up) correlates with the user's score.

## Methodology

The methodology I used involves several steps of data preprocessing, model training, and model evaluation. The first step in this process is data cleaning. I removed any rows with missing values in the 'score', 'thumbsUpCount', and 'reviewCreatedVersion' columns. This is done to ensure that the model is trained on complete data and does not suffer from any bias or inaccuracies that could be introduced by missing values.

```python
df = df.dropna(subset=['score', 'thumbsUpCount', 'reviewCreatedVersion'])
df = df.reset_index(drop=True)
```

Next, I encoded the 'reviewCreatedVersion' column using Label Encoding. This is a categorical variable that represents the version of the app when the review was created. By encoding this variable, I transformed it into a numerical format that can be used by the machine learning model. This is an essential step as machine learning models require numerical input.

```python
le = LabelEncoder()
df['reviewCreatedVersion_encoded'] = le.fit_transform(df['reviewCreatedVersion'])
```

I also normalized the 'thumbsUpCount' column using MinMaxScaler. Normalization is a technique used to bring all values within a certain range, usually between 0 and 1. This is done to ensure that all features contribute equally to the model's prediction, regardless of their original scale.

```python
scaler = MinMaxScaler()
df[['thumbsUpCount_normalized']] = scaler.fit_transform(df[['thumbsUpCount']])
```

## Model Training and Evaluation

After preprocessing the data, I split it into a training set and a testing set. The training set is used to train the model, and the testing set is used to evaluate its performance. I used a Linear Regression model for this task. Linear Regression is a simple yet powerful machine learning algorithm that predicts a target variable by fitting the best linear relationship between the features and the target.

```python
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
regression_model = LinearRegression()
regression_model.fit(X_train, y_train)
```

I evaluated the model using three metrics: R-squared, Mean Squared Error (MSE), and Mean Absolute Error (MAE). R-squared measures the proportion of the variance in the dependent variable that is predictable from the independent variables. MSE measures the average of the squares of the errors, and MAE measures the average of the absolute differences between prediction and actual observation. These metrics provide a comprehensive view of the model's performance.

```python
y_pred = regression_model.predict(X_test)
r2 = r2_score(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)
```

<div style="overflow: auto; height: auto;">
<pre>
R-squared:  0.0047422929139170344
Mean Squared Error:  2.7091208058050067
Mean Absolute Error:  1.4321246906046519
</pre>
</div>

Finally, I saved the trained model using pickle for future use and analyzed the coefficients and intercepts of the model. The coefficients represent the relationship between the features and the target variable, and the intercept is the point where the estimated regression line crosses the y-axis.

```python
pickle.dump(regression_model, open('model.pkl', 'wb'))
coef_dict = {feature: coef for feature, coef in zip(X.columns, regression_model.coef_)}
print("Coefficients: ", coef_dict)
print("Intercept: ", regression_model.intercept_)
```

<div style="overflow: auto; height: auto;">
<pre>
Coefficients:  {'thumbsUpCount_normalized': -4.751381138861692, 'reviewCreatedVersion_encoded': -0.003954022270358937}
Intercept:  4.3059838488685385
</pre>
</div>

## Significance of the Analysis

The R-squared value is 0.0047. This value is quite low, indicating that the model explains only about 0.47% of the variance in the target variable, 'score'. This suggests that the features 'thumbsUpCount_normalized' and 'reviewCreatedVersion_encoded' do not have a strong predictive power on the 'score'.

The Mean Squared Error (MSE) is 2.7091. This value represents the average squared difference between the predicted and actual scores. A lower MSE indicates a better fit of the model. In this case, the relatively high MSE suggests that the model's predictions may not be very accurate.

The Mean Absolute Error (MAE) is 1.4321. This value represents the average absolute difference between the predicted and actual scores. Like MSE, a lower MAE indicates a better fit of the model. The MAE suggests that on average, the model's predictions are about 1.43 units away from the actual scores.

Looking at the coefficients, the 'thumbsUpCount_normalized' has a coefficient of -4.75, and the 'reviewCreatedVersion_encoded' has a coefficient of -0.0039. This suggests that for every unit increase in the normalized thumbs up count, the score decreases by about 4.75 units, holding all other features constant. Similarly, for every unit increase in the encoded review created version, the score decreases by about 0.0039 units, holding all other features constant. This is somewhat counter-intuitive as one might expect more thumbs up to correlate with a higher score. However, it's important to remember that correlation does not imply causation, and these results might be influenced by other factors not included in the model.

The intercept of the model is 4.3059. This means that when all the features are zero, the predicted score is approximately 4.31.

In conclusion, while the model provides some insights into the relationship between the app's version, the number of thumbs up a review received, and the score given by the user, its predictive power is quite limited. This suggests that there may be other factors not included in the model that have a significant impact on the score. Further analysis and feature engineering might be required to improve the model's performance.
