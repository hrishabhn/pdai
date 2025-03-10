import streamlit as st
from get_data import get_data
from get_recommendation import get_recommendation
from models import RecommendationRequest
from openai import AuthenticationError


# page header
st.write('# AI Recommendations')
st.write('Use the curated list of places to get your next recommendation.')


# get data
df = get_data()


# get api key
api_key = st.text_input('Enter your OpenAI API Key:')


if api_key:
    # recommendation form
    st.write('## Get Recommendation')
    st.write('Enter your preferences below to get a recommendation:')

    # user inputs
    model_map = {
        'gpt-4o-mini': 'GPT-4o Mini',
        'gpt-4o': 'GPT-4o',
    }
    db_map = {
        'none': 'None',
        'all': 'All',
        'top': 'Top Only',
    }

    user_db = st.segmented_control(
        'Use Database',
        ['none', 'all', 'top'],
        format_func=lambda db: db_map[db],
        selection_mode='single',
        default='none',
        help='Use the curated list of places to get recommendations.',
    )
    user_model = st.segmented_control(
        'Model',
        ['gpt-4o-mini', 'gpt-4o'],
        format_func=lambda model: model_map[model],
        selection_mode='single',
        default='gpt-4o-mini',
        help='Select the model to use for generating recommendations. The GPT-4o Mini model is faster and cheaper, while the GPT-4o model is more powerful and accurate.',
    )
    user_city = st.text_input('City')
    user_type = st.text_input('Type')
    user_prompt = st.text_area('Additional Information')

    # get recommendation
    if user_city and user_type:
        if st.button('Get Recommendation'):
            try:
                recommendation = get_recommendation(RecommendationRequest(
                    api_key=api_key,
                    model=user_model,
                    db=user_db,
                    city=user_city,
                    type=user_type,
                    prompt=user_prompt,
                ))
                st.write('## Recommendation')
                st.write(f'## {recommendation.name}')
                st.write(' • '.join([
                    f'📍 **{recommendation.city}**',
                    recommendation.type,
                    *recommendation.tags,
                ]))
                st.write(recommendation.description)
            except AuthenticationError:
                st.write('Invalid API Key. Please try again.')
