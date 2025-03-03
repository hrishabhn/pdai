from pydantic import BaseModel
from typing import Literal


# shared
Model = Literal['gpt-4o-mini', 'gpt-4o']


# recommendation
class RecommendationRequest(BaseModel):
    api_key: str
    model: Model
    db: Literal['none', 'all', 'top']
    city: str
    type: str
    prompt: str


class RecommendationResponse(BaseModel):
    name: str
    city: str
    type: str
    tags: list[str]
    description: str


# taste
class TasteRequest(BaseModel):
    api_key: str
    model: Model
    top_only: bool
