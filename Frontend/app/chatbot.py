from flask import Flask, request, jsonify
import random

app = Flask(__name__)

# Sample data for service providers and grocery shops
service_providers = {
    "carpenter": ["visnu", "thasa"],
    "plumber": ["bavan", "subee"],
}

grocery_shops = {
    "shop1": ["Milk", "Bread", "Eggs"],
    "shop2": ["Apples", "Bananas", "Oranges"],
}

# Define the chatbot's responses
def get_response(user_input):
    user_input = user_input.lower()
    if "hello" in user_input:
        return "Hello! How can I assist you today?"
    elif "carpenter" in user_input:
        return f"Here are some carpenters near you: {', '.join(service_providers['carpenter'])}"
    elif "plumber" in user_input:
        return f"Here are some plumbers near you: {', '.join(service_providers['plumber'])}"
    elif "grocery" in user_input:
        return f"Here are some grocery shops near you: {', '.join(grocery_shops.keys())}"
    elif "order" in user_input:
        return "What would you like to order from the grocery shop?"
    elif any(item in user_input for item in ["milk", "bread", "eggs", "apples", "bananas", "oranges"]):
        return f"Your order has been placed. It will be delivered soon!"
    else:
        return "I'm sorry, I didn't understand that. Can you please rephrase?"

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    response = get_response(user_input)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
