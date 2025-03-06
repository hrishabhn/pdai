import streamlit as st
from get_data import get_data


# page header
st.write('# All Places')


# get data
df = get_data()


# create filters class
class Filters:
    TopOnly = False
    City = []
    Type = []
    Tags = []


# add filter inputs
with st.expander('Filter by Properties'):
    Filters.TopOnly = st.toggle('Top Only')
    Filters.City = st.multiselect('City', sorted(df['city'].dropna().unique()))
    Filters.Type = st.multiselect('Type', sorted(df['type'].explode().dropna().unique()))
    Filters.Tags = st.multiselect('Tags', sorted(df['tags'].explode().dropna().unique()))


# apply filters
if Filters.TopOnly:
    df = df[df['top'] == True]
if Filters.City:
    df = df[df['city'].dropna().isin(Filters.City)]
if Filters.Type:
    df = df[df['type'].dropna().apply(lambda types: any(t in Filters.Type for t in types))]
if Filters.Tags:
    df = df[df['tags'].dropna().apply(lambda tags: any(t in Filters.Tags for t in tags))]


# show number of results
st.write(f'{len(df)} places found')


# create tabs
tab_list, tab_table, tab_json = st.tabs(['List', 'Table', 'JSON'])


# list view
with tab_list:
    st.write('## List View')
    for i, row in df.iterrows():
        st.divider()
        if row['image']:
            st.image(row['image'], use_container_width=True)
        st.write(f'### {row['name']}')

        info = []
        if row['top']:
            info.append('⭐️')
        if row['city']:
            info.append(f'📍 **{row['city']}**')
        if row['type']:
            info.extend(row['type'])
        if row['tags']:
            info.extend(row['tags'])

        if len(info) > 0:
            st.write(' • '.join(info))

        if row['maps_id']:
            st.page_link(row['maps_link'], label='Open in Google Maps', icon=':material/location_on:')

        if row['description']:
            st.write(row['description'])

# table view
with tab_table:
    st.write('## Table View')
    st.dataframe(
        df[['name', 'top', 'city', 'image', 'type', 'tags', 'description', 'maps_link']],
        column_config={
            'name': 'Name',
            'top': 'Top',
            'city': st.column_config.ListColumn('City'),
            'image': st.column_config.ImageColumn('Image'),
            'type': st.column_config.ListColumn('Type'),
            'tags': st.column_config.ListColumn('Tags'),
            'description': 'Description',
            'maps_link': st.column_config.LinkColumn('Google Maps'),
        },
        hide_index=True,
    )


# json view
with tab_json:
    st.write('## Inspect the data')
    for i, row in df.iterrows():
        st.divider()
        st.write(f'### {row['name']}')
        st.json(row.to_json())

    st.json(df.to_json(orient='records'))
