import streamlit as st
from get_data import get_data


# page header
st.write('# Stats')
st.write('This page shows some statistics about the places.')

top_only = st.toggle('Top Only')

# get data
df = get_data()
if top_only:
    df = df[df['top']]


# create chart data
city_df = df['city'].value_counts()
type_df = df['type'].explode().value_counts()
tags_df = df['tags'].explode().value_counts()


# render charts
st.write('### Places by City')
st.bar_chart(
    city_df,
    horizontal=True,
    use_container_width=True,
)

st.write('### Places by Type')
st.bar_chart(
    type_df,
    horizontal=True,
    use_container_width=True,
)

st.write('### Places by Tags')
st.bar_chart(
    tags_df,
    horizontal=True,
    use_container_width=True,
)
