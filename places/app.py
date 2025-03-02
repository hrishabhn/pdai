import streamlit as st

st.set_page_config(
    page_title='Travel Guide',
    page_icon=':material/location_on:',
    layout='wide',
)


# home page
def home():
    st.write('# Travel Guide')
    st.write('A list of the best places that I have encountered on my travels, curated by me. To learn more, visit the [GitHub repository](https://github.com/hrishabhn/pdai/tree/main/places).')


# navigation
pg = st.navigation({
    'Menu': [
        st.Page(home, title='Home', icon=':material/house:'),
        st.Page('places.py', title='Places', icon=':material/location_on:'),
        st.Page('stats.py', title='Stats', icon=':material/query_stats:'),
    ]})
pg.run()
