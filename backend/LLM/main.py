import streamlit as st
import os
from langchain_groq import ChatGroq 
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import LLMChain



from dotenv import load_dotenv
load_dotenv()
## load the GROQ API Key

groq_api_key=os.getenv("GROQ_KEY")

llm=ChatGroq(groq_api_key=groq_api_key,model_name="qwen-2.5-32b")

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



# Create the sentiment analysis chain
sentiment_chain = LLMChain(llm=llm, prompt=prompt)

# Streamlit UI
st.title("Sentiment Analysis Chatbot")
st.write("Enter a review, and I'll tell you if it's Positive or Negative!")

# User Input
user_review = st.text_area("Enter your review:")

if st.button("Analyze Sentiment"):
    if user_review.strip():
        # Invoke the LangChain sentiment analysis chain
        response = sentiment_chain.invoke({"review": user_review})

        # Display Result
        st.subheader("Sentiment Result:")
        st.write(response["text"])  # Display LLM output
    else:
        st.warning("Please enter a review before analyzing.")