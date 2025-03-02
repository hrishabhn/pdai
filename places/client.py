import streamlit as st
import pandas as pd


# caches data for 2 minutes
@st.cache_data(ttl=120)
def get_data():
    # load data
    df = pd.read_json('https://places-hn.vercel.app/api')

    # preprocessing
    df['city'] = df['city'].apply(lambda x: x['name'] if x else None)
    df['type'] = df['type'].apply(lambda x: [y['name'] for y in x] if x else None)
    df['tags'] = df['tags'].apply(lambda x: [y['name'] for y in x] if x else None)

    df['maps_link'] = df['maps_id'].apply(lambda x: f'https://www.google.com/maps/place/?q=place_id:{x}' if x else None)

    # return df
    return df
