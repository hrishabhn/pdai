from pydantic import BaseModel
from typing import Literal
from openai import OpenAI


# pydantic models
class RecommendationRequest(BaseModel):
    api_key: str
    model: Literal['gpt-4o-mini'] | Literal['gpt-4o']
    city: str
    type: str
    prompt: str


class RecommendationResponse(BaseModel):
    name: str
    city: str
    type: str
    tags: list[str]
    description: str


# function to get recommendation
def get_recommendation(request: RecommendationRequest) -> RecommendationResponse:
    # initialize OpenAI client
    client = OpenAI(api_key=request.api_key)

    # get recommendation
    completion = client.beta.chat.completions.parse(
        model=request.model,
        messages=[
            # system message
            {"role": "system", "content": '\n'.join([
                'You are a travel guide concierge. Your task is to assist users by providing personalized recommendations based on their preferences. Users will specify their preferences, which include the city, type of place, and any additional information they wish to share. Keep in mind that users might use abbreviated or informal city names, so ensure you return the full city name in your response. If the user specifies an overly specific type of place, offer a more general category in your response while including the specific type as a tag. Tags should be capitalized (first letter of each word). Ensure all recommendations reflect real-world options.',
            ])},
            {"role": "user", "content": '\n'.join([
                f'City: {request.city}',
                f'Type: {request.type}',
                f'Additional Information: {request.prompt}' if request.prompt else '',
            ]).strip()},
        ],
        response_format=RecommendationResponse
    )

    # return recommendation
    return completion.choices[0].message.parsed
