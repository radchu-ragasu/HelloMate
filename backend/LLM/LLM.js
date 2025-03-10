const { ChatGroq } = require("langchain_groq");
const { ChatPromptTemplate } = require("langchain_core.prompts");
const { LLMChain } = require("langchain_chains");
require("dotenv").config();

const groq_api_key = process.env.GROQ_KEY; // Load the Groq API key from .env
const llm = new ChatGroq(groq_api_key, "qwen-2.5-32b"); // Specify the model

const prompt = ChatPromptTemplate.from_template(`
    You are an expert sentiment analysis model. Analyze the sentiment of the following review 
    and provide a sentiment score as a float with 5 decimal places.

    - If the sentiment is negative, the score should be below 5.00000.
    - If the sentiment is positive, the score should be above 5.00000.
    - The score should vary based on the review content, ranging between 0.00000 and 10.00000.

    Review: {review}
    Sentiment Score:
`);

const sentimentChain = new LLMChain({ llm, prompt });

const analyzeSentiment = async (review) => {
    const response = await sentimentChain.invoke({ review });
    const sentimentScore = parseFloat(response.text); // Extract the sentiment score from the response
    return sentimentScore;
};

module.exports = { analyzeSentiment };
