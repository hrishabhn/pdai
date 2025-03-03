from models import RecommendationRequest, RecommendationResponse, TasteRequest
from get_taste import get_taste
from openai import OpenAI


# function to get messages
def get_messages(request: RecommendationRequest):
    messages = []

    # system message
    messages.append({
        'role': 'system',
        'content': 'You are a travel guide concierge. Your task is to assist users by providing personalized recommendations based on their preferences. Users will specify their preferences, which include the city, type of place, and any additional information they wish to share. Keep in mind that users might use abbreviated or informal city names, so ensure you return the full city name in your response. If the user specifies an overly specific type of place, offer a more general category in your response while including the specific type as a tag. Tags should be capitalized (first letter of each word). Ensure all recommendations reflect real-world options.',
    })

    # taste message
    if request.db != 'none':
        taste = get_taste(TasteRequest(api_key=request.api_key, model=request.model, top_only=request.db == 'top'))
        messages.append({'role': 'system', 'content': taste})

    # user message
    messages.append({
        'role': 'user',
        'content': '\n'.join([
            f'City: {request.city}',
            f'Type: {request.type}',
            f'Additional Information: {request.prompt}' if request.prompt else '',
        ]).strip()
    })

    return messages


# function to get recommendation
def get_recommendation(request: RecommendationRequest) -> RecommendationResponse:
    # initialize OpenAI client
    client = OpenAI(api_key=request.api_key)

    # get recommendation
    completion = client.beta.chat.completions.parse(
        model=request.model,
        messages=get_messages(request),
        response_format=RecommendationResponse,
    )

    # return recommendation
    recommendation = completion.choices[0].message.parsed
    print(f'\n\n-- Recommendation --\n{recommendation.model_dump_json(indent=4)}\n\n')
    return recommendation
