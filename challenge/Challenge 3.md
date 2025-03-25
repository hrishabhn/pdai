# Prompt

Using Streamlit, build a game. The game should first provide the user with a random country with 4 options. These capitals shouldn't be hardcoded, but randomly selected from a list of countries and their capitals. The user should then be able to select the correct capital from the 4 options. If the user selects the correct capital, the question should be repeated with a new random country and options. The user starts with 3 lives and loses a life for each incorrect answer. The game ends when the user runs out of lives. The game should display the user's score at the end.

# Thinking

Let's break down the task:

1. Build a Streamlit app for a game about countries and capitals.
2. The game should:
   a. Present a random country and 4 options for its capital.
   b. Capitals shouldn't be hardcoded, they should be selected from a list of countries and capitals.
   c. User selects an option.
   d. If the user selects the correct option, a new country and 4 new options are presented.
   e. User starts with 3 lives.
   f. User loses a life for each incorrect answer.
   g. Game ends when the user runs out of lives.
   h. Display the user's score at the end.

Here's the plan for the Streamlit app:

1. Set up a list of countries and their capitals. I'll use a Python dictionary for this.
2. Initialize the game state using Streamlit's session_state to keep track of lives, score, and current question.
3. Display the current country and 4 options (one correct, three wrong) for the user to choose from.
4. Handle the user's selection and update the game state accordingly.
5. Display the game over message and final score when the user runs out of lives.

Let's start:

# Response

## Country Capital Quiz Game

I'll create a Streamlit game that tests users on their knowledge of country capitals. Here's how it will work:

```python
import streamlit as st
import random
import pandas as pd

# Load country and capital data
@st.cache_data
def load_data():
    # Using a built-in pandas dataset with countries and capitals
    # You could also use an external API or CSV file
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

    # Display game information
    col1, col2 = st.columns(2)
    with col1:
        st.metric("Lives", st.session_state.lives)
    with col2:
        st.metric("Score", st.session_state.score)

    if st.session_state.game_over:
        st.header("Game Over!")
        st.subheader(f"Your final score: {st.session_state.score}")
        if st.button("Play Again"):
            st.session_state.lives = 3
            st.session_state.score = 0
            st.session_state.game_over = False
            get_new_question()
            st.experimental_rerun()
    else:
        st.header(f"What is the capital of {st.session_state.current_country}?")

        for option in st.session_state.options:
            if st.button(option):
                check_answer(option)
                st.experimental_rerun()

if __name__ == "__main__":
    main()
```

### How the Game Works

1. **Data Loading**: The game loads a dictionary of countries and their capitals.

2. **Game Initialization**: The player starts with 3 lives and a score of 0.

3. **Question Generation**:

    - A random country is selected
    - Four options are provided (the correct capital and 3 random wrong capitals)
    - The options are shuffled

4. **Gameplay**:

    - The player selects one of the options
    - If correct, their score increases and a new question appears
    - If wrong, they lose a life and get a new question
    - The game ends when the player runs out of lives

5. **Game Over**: When the game ends, the final score is displayed with an option to play again.

To run this app, save the code to a file (e.g., `capital_quiz.py`) and run it with `streamlit run capital_quiz.py` in your terminal.

# Prompt

Some changes to make:

-   Handle error `AttributeError: module 'streamlit' has no attribute 'experimental_rerun'`
-   Design it to be run from the `streamlit run` command
-   Add a '❤️' and '⭐️' for lives and score

# Thinking

Let me address each issue:

1. Handle the `AttributeError: module 'streamlit' has no attribute 'experimental_rerun'`:

    - The `st.experimental_rerun()` function has been renamed to just `st.rerun()` in newer versions of Streamlit
    - I'll update all instances of `st.experimental_rerun()` to `st.rerun()`

2. Design it to be run from the `streamlit run` command:

    - The code is already designed to be run with `streamlit run`, but I'll ensure it's clear that the code should be saved to a file and run with that command
    - I'll make sure there's nothing that would prevent it from running properly with the standard Streamlit execution model

3. Add a '❤️' and '⭐️' for lives and score:
    - I'll modify the metric display to include these emojis in the labels

Here's my updated code:

# Response

## Country Capital Quiz Game - Updated

I've made the requested changes to the game. Here's the updated code:

```python
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
```

### Changes Made:

1. Replaced `st.experimental_rerun()` with `st.rerun()` to fix the AttributeError
2. Added emoji icons '❤️' for lives and '⭐️' for score
3. Ensured the code is ready to run with the `streamlit run` command

### How to Run the Game:

1. Save this code to a file named `capital_quiz.py`
2. Open a terminal or command prompt
3. Run the command: `streamlit run capital_quiz.py`
4. The game will open in your default web browser

This simple but engaging quiz game will test your knowledge of world capitals. Good luck!
