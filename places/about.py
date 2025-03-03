import streamlit as st

st.warning('This is a copy of the `README.md` file. Some links may not work correctly.', icon=':material/warning:')
with open('places/README.md', 'r') as f:
    st.markdown(f.read())
