I have an API that contains two endpoints. The first endpoint is a search endpoint that returns a list of products matching the query. The second endpoint is a product endpoint that returns the details of a product given its code.

Example API calls:

1. https://world.openfoodfacts.org/cgi/search.pl?search_terms=banania&search_simple=1&action=process&json=1
2. https://world.openfoodfacts.net/api/v2/product/3017624010701?fields=product_name,nutriscore_data

Generate a vanilla HTML website that performs the following functionality:

-   A search bar that allows the user to search for a product by name.
-   The search results are queried from the search endpoint and displayed in a list.
-   When a product is clicked, the product details are queried from the product endpoint and displayed on the page.

The code should be a single HTML file that can be opened in a browser. You can use vanilla JavaScript ES6, HTML5, and CSS3. Return a single code block like below:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Document</title>
        <style>
            /* Style here */
        </style>
    </head>

    <body>
        <!-- Content here -->
    </body>
</html>
```
