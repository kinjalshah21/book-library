const booksContainer = document.getElementById('books-container');
const searchBtn = document.getElementById('search-btn');
const toggleViewBtn = document.getElementById('toggle-view');
const searchInput = document.getElementById('search-text');
const sortSelect = document.getElementById('sort');

let currentBooks = [];
let isGridView = false;
let currentPage = 1;
let booksPerPage = 30;

//fetch book data from API
async function fetchBooksInfo() {
    try {
        const response = await fetch(`https://api.freeapi.app/api/v1/public/books?page=${currentPage}&limit=${booksPerPage}&inc=kind%252Cid%252Cetag%252CvolumeInfo`);
		const jsonData = await response.json();
        currentBooks = jsonData.data.data;
		// console.log('currentBooks ::', currentBooks);
        displayBooks(currentBooks);
    } catch (error) {
        alert('Error fetching books. Please try again in sometime.')
        console.log('Error fetching Books', error);
    }
}

//display books on UI.
function displayBooks(books) {
    
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
    displayBooks(currentBooks);

});

//search button functionality to filter by title or author
searchBtn.addEventListener('click', () => {
    booksContainer.innerHTML = '';
    let searchTerm = searchInput.value.toLowerCase();

    const filteredBooks = currentBooks.filter(book => {
        const title = book.volumeInfo.title.toLowerCase();
        const authors = book.volumeInfo.authors?.join(',').toLowerCase() || '';
        return title.includes(searchTerm) || authors.includes(searchTerm);
    })

    displayBooks(filteredBooks);

});

//function to sort the books based on title or publisher date
function sortBooks() {
    const sortBy = sortSelect.value;
    // console.log('sortby ::', sortBy);
    
    const sortedBooks = [...currentBooks];
    if(sortBy == 'title'){
        sortedBooks.sort((a, b) => {
            let titleA = a.volumeInfo.title.toLowerCase();
            let titleB = b.volumeInfo.title.toLowerCase();

            // console.log('titleA.localeCompare(titleB)' , titleA.localeCompare(titleB));
            return titleA.localeCompare(titleB);
        });
    } else if ((sortBy == 'publishedDate')) {
        sortedBooks.sort((a, b) => {
            let dateA = new Date(a.volumeInfo.publishedDate);
            let dateB = new Date(b.volumeInfo.publishedDate);
            // console.log('dateA - dateB ::', dateA - dateB);
            return dateA - dateB;
        })
    }
    // console.log(sortedBooks);
    booksContainer.innerHTML = '';
    displayBooks(sortedBooks);
}

//attach eventlistener for Sorting of the books
sortSelect.addEventListener('change', sortBooks);

//show default books
fetchBooksInfo();