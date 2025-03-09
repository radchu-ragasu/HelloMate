import streamlit as st  # Import Streamlit for creating the web UI
import os  # Import OS module to access environment variables
from langchain_groq import ChatGroq  # Import ChatGroq from LangChain for LLM integration
from langchain_core.prompts import ChatPromptTemplate  # Import prompt template from LangChain
from langchain.chains import LLMChain  # Import LLMChain to create a chain for sentiment analysis

from dotenv import load_dotenv  # Import dotenv to load environment variables
load_dotenv()  # Load environment variables from .env file

# Retrieve the Groq API key from environment variables
groq_api_key = os.getenv("GROQ_KEY")

# Initialize the ChatGroq model with the specified API key and model name
llm = ChatGroq(groq_api_key=groq_api_key, model_name="qwen-2.5-32b")

# Define the prompt template for sentiment analysis
prompt = ChatPromptTemplate.from_template(
    """
    You are an expert sentiment analysis model. Analyze the sentiment of the following review 
    and provide a sentiment score as a float with 5 decimal places.

    - If the sentiment is negative, the score should be below 5.00000.
    - If the sentiment is positive, the score should be above 5.00000.
    - The score should vary based on the review content, ranging between 0.00000 and 10.00000.

    Review: {review}
    Sentiment Score:
    """
)

# Create the sentiment analysis chain using the LLM and prompt
sentiment_chain = LLMChain(llm=llm, prompt=prompt)

# Streamlit UI
st.title("Sentiment Analysis Chatbot")  # Title of the app
st.write("Enter a review, and I'll tell you if it's Positive or Negative!")  # Short description

# User input text area
user_review = st.text_area("Enter your review:")

# Button to trigger sentiment analysis
if st.button("Analyze Sentiment"):
    if user_review.strip():  # Ensure the user entered a review
        # Invoke the LangChain sentiment analysis chain
        response = sentiment_chain.invoke({"review": user_review})

        # Display the sentiment analysis result
        st.subheader("Sentiment Result:")
        st.write(response["text"])  # Display the LLM output
    else:
        st.warning("Please enter a review before analyzing.")  # Show warning if input is empty
