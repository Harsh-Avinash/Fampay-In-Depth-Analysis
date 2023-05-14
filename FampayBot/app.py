import streamlit as st
from transformers import AutoModelForCausalLM, AutoTokenizer

# Load the bigscience/bloomz-1b1 model and tokenizer from the Hugging Face library
tokenizer = AutoTokenizer.from_pretrained("bigscience/bloomz-1b1")
model = AutoModelForCausalLM.from_pretrained("bigscience/bloomz-1b1")

# read context from context.txt and save it to input_text
with open('context.txt', 'r') as file:
    input_text = file.read()

# Ask a question through Streamlit's interface
question = st.text_input("Ask a question: ")

if question:
    st.write("You: ", question)

    full_text = input_text + "\n" + question

    input_ids = tokenizer.encode(full_text, return_tensors='pt')
    outputs = model.generate(input_ids, max_length=1500)

    # Decode the model's response and display it on the screen
    response = tokenizer.decode(outputs[0])
    answer = "Fambot: " + response.replace(full_text, '')
    answer.replace("</s>", "")

    st.write(answer)

    input_text = full_text + "\n" + answer

# Save the updated context back to the file
with open('context.txt', 'w') as file:
    file.write(input_text)
