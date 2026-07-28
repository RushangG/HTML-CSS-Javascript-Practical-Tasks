# Multiple API Requests

## Task: Create a script that fetches data from multiple APIs and combines the results.

### Requirements:

Use the Fetch API to make multiple requests.

Use promises to handle the asynchronous operations.

Combine the results from different APIs and display them on the webpage.

# How to Use

1. Automatically fetch data from multiple APIs when the page loads.

2. Use Promises.all() to wait for all requests to complete.

3. Combine into all api response to object Alldata which have array of datas.
   like albumData, postData, todoData;

4. show all data in table format using DOM manipulation.

5. Handle errors gracefully and display an error message if any request fails.

# api urls for testing:

albumApi: "https://jsonplaceholder.typicode.com/albums?_limit=20"

todoApi: "https://jsonplaceholder.typicode.com/todos?_limit=20"

postApi: "https://jsonplaceholder.typicode.com/posts?_limit=20"
