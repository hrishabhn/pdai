# Travel Guide

A Streamlit application that displays list of places I've saved during my travels. Access the app [here](https://places-hn.streamlit.app/).

## Overview

This Travel Guide app provides a way to browse and filter travel destinations with the following features:

- View places in a list, table, or JSON format
- Filter places by `city`, `type`, `tags`, or top-rated status
- View statistics about places by `city`, `type`, and `tags`
- Display images, descriptions, and Google Maps links for each location
- Get AI recommendations for new places to visit

## Requirements

- Python
- Streamlit
- OpenAI Python SDK
- Pydantic

## Usage

To run the Travel Guide application, clone the repository and run the following command:

```sh
streamlit run places/app.py
```

## Pages

- **Home**: Introduction to the Travel Guide
- **Places**: Main view with filters and multiple display formats
- **Stats**: Statistical visualisations of places data
- **Recommend**: AI recommendations for new places to visit
- **About**: Information about the application

## Project Structure

- All application code is located in the `places` folder

- [`models.py`](models.py): Pydantic models for data validation
- [`get_data.py`](get_data.py): API client for data fetching and preprocessing
- [`get_recommendation.py`](get_recommendation.py): API client for AI recommendation
- [`get_taste.py`](get_taste.py): API client for user preferences
- [`app.py`](app.py): Application entry point with Streamlit configuration, navigation, and Home page
- [`places.py`](places.py): Places page
- [`stats.py`](stats.py): Stats page
- [`recommend.py`](recommend.py): Recommend page
- [`about.py`](about.py): About page

## Data

The application fetches data from an API endpoint and preprocesses it for display. The data is stored in a Notion database and fetched using the Notion API.

## AI Recommendations

The AI recommendations feature uses the OpenAI Python SDK with structured outputs to generate new places to visit based on the user's preferences. The workflow is:

1. User enters their OpenAI API Key
2. They select a data inclusion option:
   - No existing data (fresh recommendations)
   - All saved places (complete taste analysis)
   - Top-rated places only (filtered taste analysis)
3. They select the OpenAI model to use
   - `gpt-4o-mini` - smaller, cheaper model
   - `gpt-4o` - larger, more powerful model
4. They provide inputs for:
   - City they want to explore
   - Type of place they're looking for
   - Additional preference information
5. When submitted:
   - If including existing data, the app first queries OpenAI to synthesize the user's taste profile from their saved places
   - The app then queries OpenAI with a structured output format to generate a recommendation including name, description, tags, and more
   - Results are displayed in a consistent format matching the rest of the application

The recommendation system uses Pydantic models to ensure type safety and proper data validation throughout the process.
