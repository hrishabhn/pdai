# Travel Guide

A Streamlit application that displays list of places I've saved during my travels.

## Overview

This Travel Guide app provides a way to browse and filter travel destinations with the following features:

- View places in a list, table, or JSON format
- Filter places by `city`, `type`, `tags`, or top-rated status
- View statistics about places by `city`, `type`, and `tags`
- Display images, descriptions, and Google Maps links for each location

## Usage

To run the Travel Guide application, clone the repository and run the following command:

```sh
streamlit run places/app.py
```

## Pages

- **Home**: Introduction to the Travel Guide
- **Places**: Main view with filters and multiple display formats
- **Stats**: Statistical visualisations of places data

## Project Structure

- All application code is located in the `places` folder

- `app.py`: Application entry point with Streamlit configuration, navigation, and Home page
- `places.py`: Places page
- `stats.py`: Stats page
- `client.py`: API client for data fetching and preprocessing

## Data

The application fetches data from an API endpoint and preprocesses it for display. The data is stored in a Notion database and fetched using the Notion API.
