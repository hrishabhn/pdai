# Travel Guide

A Streamlit application that displays list of places I've saved during my travels. Access the app [here](https://places-hn.streamlit.app/).

## Overview

This Travel Guide app provides a way to browse and filter travel destinations with the following features:

- View places in a list, table, or JSON format
- Filter places by `city`, `type`, `tags`, or top-rated status
- View statistics about places by `city`, `type`, and `tags`
- Display images, descriptions, and Google Maps links for each location
- Get AI recommendations for new places to visit

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

## Project Structure

- All application code is located in the `places` folder

- `get_data.py`: API client for data fetching and preprocessing
- `get_recommendation.py`: API client for AI recommendation
- `app.py`: Application entry point with Streamlit configuration, navigation, and Home page
- `places.py`: Places page
- `stats.py`: Stats page
- `recommend.py`: Recommend page

## Data

The application fetches data from an API endpoint and preprocesses it for display. The data is stored in a Notion database and fetched using the Notion API.

## AI Recommendations

The AI recommendations use the OpenAI Python SDK with structured outputs to generate new places to visit based on the user's preferences. The app requires an API Key to access the recommendation service.
