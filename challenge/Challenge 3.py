import streamlit as st
import random

# Load country and capital data


@st.cache_data
def load_data():
    # Dictionary of countries and their capitals
    countries_data = {
        "United States": "Washington, D.C.",
        "United Kingdom": "London",
        "France": "Paris",
        "Germany": "Berlin",
        "Japan": "Tokyo",
        "China": "Beijing",
        "India": "New Delhi",
        "Brazil": "Brasília",
        "Russia": "Moscow",
        "Canada": "Ottawa",
        "Australia": "Canberra",
        "Italy": "Rome",
        "Spain": "Madrid",
        "Mexico": "Mexico City",
        "South Korea": "Seoul",
        "Indonesia": "Jakarta",
        "Turkey": "Ankara",
        "Saudi Arabia": "Riyadh",
        "Argentina": "Buenos Aires",
        "South Africa": "Pretoria",
        "Nigeria": "Abuja",
        "Egypt": "Cairo",
        "Pakistan": "Islamabad",
        "Bangladesh": "Dhaka",
        "Vietnam": "Hanoi",
        "Thailand": "Bangkok",
        "Sweden": "Stockholm",
        "Norway": "Oslo",
        "Finland": "Helsinki",
        "Denmark": "Copenhagen",
        "Netherlands": "Amsterdam",
        "Belgium": "Brussels",
        "Switzerland": "Bern",
        "Austria": "Vienna",
        "Portugal": "Lisbon",
        "Greece": "Athens",
        "Ireland": "Dublin",
        "New Zealand": "Wellington",
        "Singapore": "Singapore",
        "Malaysia": "Kuala Lumpur"
    }
    return countries_data


def initialize_game():
    if "lives" not in st.session_state:
        st.session_state.lives = 3
    if "score" not in st.session_state:
        st.session_state.score = 0
    if "current_country" not in st.session_state:
        get_new_question()
    if "game_over" not in st.session_state:
        st.session_state.game_over = False


def get_new_question():
    countries_data = load_data()
    countries = list(countries_data.keys())

    # Select a random country for the question
    country = random.choice(countries)
    correct_capital = countries_data[country]

    # Get 3 wrong capitals for the options
    wrong_capitals = []
    all_capitals = list(countries_data.values())
    while len(wrong_capitals) < 3:
        wrong_capital = random.choice(all_capitals)
        if wrong_capital != correct_capital and wrong_capital not in wrong_capitals:
            wrong_capitals.append(wrong_capital)

    # Create the options (correct + 3 wrong)
    options = wrong_capitals + [correct_capital]
    random.shuffle(options)

    st.session_state.current_country = country
    st.session_state.correct_capital = correct_capital
    st.session_state.options = options


def check_answer(selected_option):
    if st.session_state.game_over:
        return

    if selected_option == st.session_state.correct_capital:
        st.session_state.score += 1
        st.success("Correct! 🎉")
        get_new_question()
    else:
        st.session_state.lives -= 1
        st.error(f"Wrong! The capital of {st.session_state.current_country} is {st.session_state.correct_capital}")

        if st.session_state.lives <= 0:
            st.session_state.game_over = True
        else:
            get_new_question()


def main():
    st.title("Country Capital Quiz Game")

    initialize_game()

    # Display game information with emojis
    col1, col2 = st.columns(2)
    with col1:
        st.metric("❤️ Lives", st.session_state.lives)
    with col2:
        st.metric("⭐️ Score", st.session_state.score)

    if st.session_state.game_over:
        st.header("Game Over!")
        st.subheader(f"Your final score: {st.session_state.score}")
        if st.button("Play Again"):
            st.session_state.lives = 3
            st.session_state.score = 0
            st.session_state.game_over = False
            get_new_question()
            st.rerun()  # Updated from experimental_rerun
    else:
        st.header(f"What is the capital of {st.session_state.current_country}?")

        for option in st.session_state.options:
            if st.button(option):
                check_answer(option)
                st.rerun()  # Updated from experimental_rerun


if __name__ == "__main__":
    main()
