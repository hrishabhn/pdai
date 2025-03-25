import streamlit as st
import requests

st.title('Open Food Facts')

# Initialize session state for selected product
if "selected_product" not in st.session_state:
    st.session_state.selected_product = None

# Function to search for products


def search_products(query):
    url = f"https://world.openfoodfacts.org/cgi/search.pl?search_terms={query}&search_simple=1&action=process&json=1"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return data.get('products', [])
    except Exception as e:
        st.error(f"Error searching products: {e}")
        return []

# Function to get product details


def get_product_details(code):
    url = f"https://world.openfoodfacts.net/api/v2/product/{code}?fields=product_name,nutriscore_data"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        st.error(f"Error fetching product details: {e}")
        return None

# Function to handle product selection


def select_product(code):
    st.session_state.selected_product = code


# Search bar
query = st.text_input("Search for a product:", key="search_input")

# Layout with columns
col1, col2 = st.columns([1, 2])

with col1:
    if query:
        products = search_products(query)

        if products:
            st.subheader("Search Results")
            for product in products:
                product_name = product.get('product_name', 'Unknown Product')
                product_code = product.get('code', '')
                if product_code:
                    if st.button(f"{product_name}", key=product_code):
                        select_product(product_code)
        else:
            st.info("No products found.")

with col2:
    if st.session_state.selected_product:
        with st.spinner("Loading product details..."):
            product_code = st.session_state.selected_product
            product_details = get_product_details(product_code)

            if product_details and 'product' in product_details:
                product_data = product_details['product']

                st.subheader(product_data.get('product_name', 'Product Details'))

                st.divider()

                # Display nutriscore data if available
                nutriscore_data = product_data.get('nutriscore_data', {})
                if nutriscore_data:
                    st.subheader("Nutriscore Data")

                    # Display in expandable section for cleaner UI
                    with st.expander("View Nutritional Score Details", expanded=True):
                        # Create a formatted display of nutriscore data
                        nutriscore_grade = nutriscore_data.get('grade', 'Unknown')
                        nutriscore_score = nutriscore_data.get('score', 'N/A')

                        st.metric("Nutriscore Grade", nutriscore_grade)
                        st.metric("Nutriscore Score", nutriscore_score)

                        # Display other available nutriscore data
                        for key, value in nutriscore_data.items():
                            if key not in ['grade', 'score']:
                                st.write(f"**{key}**: {value}")
                else:
                    st.info("No nutritional score data available for this product.")

                # Link to product on Open Food Facts
                st.markdown(f"[View on Open Food Facts](https://world.openfoodfacts.org/product/{product_code})")
            else:
                st.error("Unable to load product details.")

# Add a "Clear Selection" button when a product is selected
if st.session_state.selected_product and st.button("Clear Selection"):
    st.session_state.selected_product = None
    st.experimental_rerun()
