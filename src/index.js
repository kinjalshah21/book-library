const booksContainer = document.getElementById('books-container');
const searchBtn = document.getElementById('search-btn');
const toggleViewBtn = document.getElementById('toggle-view');

let books = [];
let isGridView = false;
let currentPage = 1;
let booksPerPage = 9;

//fetch book data from API
async function fetchBooksInfo() {
    try {
        const response = await fetch(
			`https://api.freeapi.app/api/v1/public/books?page=${currentPage}&limit=${booksPerPage}`
		);
		const jsonData = await response.json();
        books = jsonData.data.data;
		// console.log('books ::', books);
        displayBooks();
    } catch (error) {
        alert('Error fetching books. Please try again in sometime.')
        console.log('Error fetching Books', error);
    }
}

//display books on UI.
function displayBooks() {
    
    books.forEach(book => {
        let bookTitle = book.volumeInfo.title || "Unknown";
        let bookAuthors = book.volumeInfo.authors?.join(",") || "Unknown"
        let bookPublisher = book.volumeInfo.publisher || "Unknown";
        let bookPublishedDate = book.volumeInfo.publishedDate || "Unknown";

        const bookItem = document.createElement("div");
        bookItem.classList.add('book-item');

        if (isGridView) {
            bookItem.classList.add("grid-item");
        }

        bookItem.innerHTML = `
        <img src="${book.volumeInfo.imageLinks?.thumbnail}" alt="${bookTitle}">
        <div class="book-details">
                <p class="book-title">${bookTitle}</p>
                <p class="book-author">by ${bookAuthors}</p>
                <p class="book-publisher">Publisher: ${bookPublisher}</p>
                <p class="book-date">Published Date: ${bookPublishedDate}</p>
        </div>
        `;

        bookItem.addEventListener('click', () => {
            window.open(book.volumeInfo.infoLink, '_blank');
        } );

        booksContainer.appendChild(bookItem);

    })

    booksContainer.className = isGridView ? 'grid-view' : 'list-view';
}

//toggle view functionality
toggleViewBtn.addEventListener('click', () => {
	isGridView = !isGridView;
    toggleViewBtn.textContent = isGridView ? "Switch to List" : "Switch to Grid";
    booksContainer.innerHTML = '';
    displayBooks(books);

});

//search button functionality
searchBtn.addEventListener('click', () => {
    booksContainer.innerHTML = '';
    displayBooks(books);
});

//show default books
fetchBooksInfo();