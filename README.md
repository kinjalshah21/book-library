# 📚 Book Library

## ✨ Features

- 📖 **Fetch Books**: Retrieve books from the API and display them in a list/grid.
- 🔄 **Toggle View**: Switch between list and grid view.
- 📌 **Book Details**: View details including:
  - 📕 **Title**
  - ✍️ **Author**
  - 🏢 **Publisher**
  - 📅 **Published Date**
  - 🖼️ **Thumbnail**
- 🔍 **Search**: Filter books by title or author.
- 📊 **Sort**: Order books by:
  - 🅰️ Alphabetical order (title)
  - 📆 Release Date (publishedDate)
- 🔄 **Pagination**: Fetch more books automatically when reaching the end of the page.
- 🌐 **External Details**: Clicking on a book item opens more details in a new tab (via `infoLink`).

## 🌍 API Information

- **API Used**: [Free API](https://api.freeapi.app/api/v1/public/books)
- **Endpoint**:

```http
GET https://api.freeapi.app/api/v1/public/books
```

- **Example Usage** (Fetch Books via Fetch API):

```javascript
const response = await fetch(`https://api.freeapi.app/api/v1/public/books`);
const jsonData = await response.json();
let books = jsonData.data.data;
```
## 🚀 Usage

- 🔍 Use the **search bar** to find books by title or author.
- 📊 Click on **Sort by** to arrange books as needed.
- 🔄 Click on **Switch to Grid** to change View.
- 🌐 Click on any book to **view details in a new tab**.

## 🖼️ Screenshots
#### List View
![image](https://github.com/user-attachments/assets/7c688fe8-680e-45f9-b5a6-0588a900c8a4)

#### Grid View
![image](https://github.com/user-attachments/assets/36743b46-f583-44c4-adb3-46932cd744e0)

#### Sort by Title
![image](https://github.com/user-attachments/assets/30c07f0f-ef32-4927-82e9-e376245a36bc)

#### Search
![image](https://github.com/user-attachments/assets/2e0504f3-2427-4c99-a79e-06c76bdda95c)

## 🌐 Live Demo

You can check out the deployed project here:

🔗 [Live Demo](https://kinjalshah21.github.io/book-library)



