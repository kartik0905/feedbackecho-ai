# AI Prompt Engineering Log

## System Prompt Used
"You are an expert hospitality AI."

## Variation 1: Basic Prompt
* **Prompt:** "Analyze this guest review: {review_text}. Tell me the sentiment and write a reply."
* **Example Input:** "The room was a bit small but very clean and close to the beach."
* **Example Output:** "The sentiment is mostly positive. Reply: Thank you for staying with us! We are glad you enjoyed the cleanliness and location, even though the room was small."

## Variation 2: Structured Formatting
* **Prompt:** "You are a hospitality assistant. Analyze the sentiment (Positive, Negative, Neutral) of the following review and draft a professional 2-sentence response from the host: {review_text}"
* **Example Input:** "The room was a bit small but very clean and close to the beach."
* **Example Output:** "Sentiment: Positive. Drafted Response: Thank you for your wonderful feedback regarding our clean rooms and prime location! We hope to welcome you back to the beach soon."

## Variation 3: JSON Enforced Output (Chosen)
* **Prompt:** "You are an expert hospitality AI. Analyze the following guest review. 1. Classify the sentiment strictly as 'Positive', 'Negative', or 'Neutral'. 2. Draft a polite, professional 2-sentence response from the property manager. Review: '{review_text}'. Respond strictly in JSON format with two keys: 'sentiment' and 'draftedResponse'."
* **Example Input:** "The room was a bit small but very clean and close to the beach."
* **Example Output:** `{"sentiment": "Positive", "draftedResponse": "Thank you for highlighting our property's cleanliness and convenient beach access. We appreciate your feedback regarding the room size and hope to host you again!"}`

## Conclusion
Variation 3 worked best. By explicitly defining a structured JSON output with exact key names (`sentiment` and `draftedResponse`), the frontend React application could deterministically parse the data without relying on regex or string manipulation. This prevented application crashes and allowed for clean, conditional UI rendering based on the sentiment value.