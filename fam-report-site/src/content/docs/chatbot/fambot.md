---
title: "Improving the FamApp Chatbot with a Language Mode"
description: "Docs intro"
---

### Introduction
To improve the FamApp chatbot, I've incorporated a large language model (LLM) - the bigscience/bloomz-1b1 model, also known as the Bloom model, from the Hugging Face library. This model is part of the BigScience project, a large-scale, collaborative research effort focused on advancing large language models.

### The Bloom Model
The Bloom model is trained on a diverse range of internet text, which enables it to generate human-like text based on the input it receives. This makes it an excellent tool for enhancing the chatbot's ability to handle complex queries and provide more accurate and relevant responses.

### Enhancing the Chatbot
The enhancement process involves integrating the Bloom model into the chatbot's response generation system. The model uses the conversation history (context) and the user's question to generate a response. After generating a response, the context is updated with the new question and answer, allowing the model to use this information for future responses.

Here's how I've integrated the Bloom model into the FamApp chatbot:

```python
# Load the bigscience/bloomz-1b1 model and tokenizer from the Hugging Face library
from transformers import AutoModelWithLMHead, AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("bigscience/bloomz-1b1")
model = AutoModelWithLMHead.from_pretrained("bigscience/bloomz-1b1")
```

The above code snippet loads the Bloom model and its corresponding tokenizer. The tokenizer is used to convert the input text into a format that the model can understand.

```python
# Read context from context.txt and save it to input_text
with open('context.txt', 'r') as file:
    input_text = file.read()
    file = input_text
```

Then, the chatbot prompts the user to ask a question, combines the question with the context, and uses the model to generate a response.
Finally, after three iterations of the loop, the context is reset to its original state.

<iframe
  src="/Fambot/main_bloom.html"
></iframe>

### Benefits for the Company
The integration of the Bloom model into the FamApp chatbot offers several benefits:

1. **Improved User Experience**: The Bloom model's ability to generate human-like text can make interactions with the chatbot feel more natural and engaging for users.

2. **Better Response Quality**: The model can handle a wider range of queries and provide more accurate and relevant responses, which can increase user satisfaction.

3. **Increased Efficiency**: By handling more complex queries, the chatbot can reduce the workload on human support staff, allowing them to focus on more complex issues that require human intervention.

4. **Scalability**: As an AI model, the Bloom model can handle any number of queries simultaneously, allowing the chatbot to scale with user demand.

### Conclusion
The integration of the Bloom model into the FamApp chatbot significantly enhances its capabilities and offers substantial benefits for the company. By improving user experience and response quality, increasing efficiency, and providing scalability, this enhancement can contribute to increased user engagement and satisfaction, and ultimately, to the company's success.
