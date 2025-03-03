from models import TasteRequest
from openai import OpenAI
from get_data import get_data


# function to get taste
def get_taste(request: TasteRequest) -> str:
    # initialize OpenAI client
    client = OpenAI(api_key=request.api_key)

    # get data
    df = get_data()
    if request.top_only:
        df = df[df['top']]

    # get taste
    completion = client.chat.completions.create(
        model=request.model,
        messages=[
            # system message
            {
                'role': 'system',
                'content': 'You are a travel guide concierge. Your task is to convert a database of user places into a brief description of the taste of the user. Do not include any specific details about the places, such as names or locations. Instead, focus on the overall experience and atmosphere of the places. Provide a decsription in the third person.',
            },
            # user message
            {'role': 'user', 'content': f'Database: {df.to_dict(orient='records')}'}
        ]
    )
    taste = completion.choices[0].message.content
    print(f'\n\n-- User Taste --\n{taste}\n\n')
    return taste
