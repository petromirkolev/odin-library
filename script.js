// Global variables
let books = [
  {
    id: 1,
    title: "My book cover",
    author: "My name here",
    url: "https://edit.org/photos/images/cat/book-covers-big-2019101610.jpg-1300.jpg",
    read: true,
    bookmarked: false,
  },
  {
    id: 2,
    title: "Lunar Storm",
    author: "Terry Crosby",
    url: "https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg",
    read: false,
    bookmarked: false,
  },
];
let bookmarks = [];
const query = document.querySelector.bind(document);
const bookDisplay = query(".book-library");
const libraryContainer = query(".library-container");
const addForm = query(".add-book-form");
const editForm = query(".edit-book-form");
const deleteForm = query(".delete-book-form");
const viewForm = query(".view-book-form");
const bookmarkedBooks = query(".bookmarked-books");
const bookmarkForm = query(".bookmark-book-form");

// Define book constructor model
class Book {
  constructor(title, author, url) {
    this.id = books.length + 1;
    this.title = title;
    this.author = author;
    this.url = url;
  }
  read = false;
  bookmarked = false;
}
// Create new book object and add it to books []
const createBook = function (title, author, url) {
  books.push(new Book(title, author, url));
};
// Button clicked controller
libraryContainer.addEventListener("click", (e) => {
  const currentId = e.target.classList[1];
  switch (e.target.classList[0]) {
    case "book-add":
      return addNewBook();
    case "book-view":
      return viewBook(currentId);
    case "book-edit":
      return editBook(currentId);
    case "book-delete":
      return deleteBook(currentId);
    case "book-bookmarked":
      return bookmarkBook();
    default:
      return;
  }
});
// Display all books on the home page
const renderBooks = () => {
  bookDisplay.innerHTML = "";
  books.map((book) => displayBook(book));
};
// Add new book to books []
const addNewBook = () => {
  addForm.style.visibility = "visible";
  const [title, author, url] = [
    query(".inp-add-title"),
    query(".inp-add-author"),
    query(".inp-add-url"),
  ];
  query(".btn-add-book").addEventListener("click", function addBook(e) {
    e.preventDefault();
    createBook(title.value, author.value, url.value);
    title.value = author.value = url.value = "";
    renderBooks();
    addForm.style.visibility = "hidden";
    query(".btn-add-book").removeEventListener("click", addBook);
  });
};
// View existing book
const viewBook = (currentId) => {
  books.map((book) => {
    if (book.id !== +currentId) return;
    viewForm.style.visibility = "visible";
    query(".view-book-img").src = book.url;
    query(".read-status").textContent = book.read ? "Yes" : "No";
    query(".bookmark-status").textContent = book.bookmarked ? "Yes" : "No";
    query(".btn-close-view-book").addEventListener("click", (e) => {
      e.preventDefault();
      viewForm.style.visibility = "hidden";
    });
  });
};
// Edit existing book
const editBook = (currentId) => {
  books.map((book) => {
    if (book.id !== +currentId) return;
    editForm.style.visibility = "visible";
    [
      query("#edit-title").value,
      query("#edit-author").value,
      query("#edit-url").value,
      query("#mark-edit").checked,
      query("#mark-bookmark").checked,
    ] = [book.title, book.author, book.url, book.read, book.bookmarked];

    query(".btn-edit-book").addEventListener(
      "click",
      function editCurrentBook(e) {
        e.preventDefault();
        [book.title, book.author, book.url, book.read, book.bookmarked] = [
          query("#edit-title").value,
          query("#edit-author").value,
          query("#edit-url").value,
          query("#mark-edit").checked,
          query("#mark-bookmark").checked,
        ];
        if (book.bookmarked === true) bookmarks.push(book);
        renderBooks();
        editForm.style.visibility = "hidden";
        query(".btn-edit-book").removeEventListener("click", editCurrentBook);
      }
    );
  });
};
// Delete existing book
const deleteBook = (currentId) => {
  books.map((book) => {
    if (book.id !== +currentId) return;
    deleteForm.style.visibility = "visible";
    query(".delete-book-img").src = book.url;
    query(".btn-delete-book").addEventListener(
      "click",
      function deleteCurrentBook(e) {
        e.preventDefault();
        deleteBookHelper(book, currentId);
        deleteBookmarkedBookHelper(book, currentId);
        deleteForm.style.visibility = "hidden";
        renderBooks();
        query(".btn-delete-book").removeEventListener(
          "click",
          deleteCurrentBook
        );
      }
    );
  });
};
// Bookmarked books
const bookmarkBook = () => {
  bookmarkForm.style.visibility = "visible";
  bookmarkedBooks.innerHTML = "";
  bookmarks.map((book) => {
    bookmarkedBooks.insertAdjacentHTML(
      "beforeend",
      `<div class="bkm-book ${book.id}">
        <img class="bookmarks-book-img" src="${book.url}" alt="Cover" />
        <button class="remove-bookmarked-book">X</button>
      </div>`
    );
  });
  query(".btn-bookmark-close").addEventListener(
    "click",
    function bookmarkCurrentBook(e) {
      e.preventDefault();
      bookmarkForm.style.visibility = "hidden";
      query(".btn-bookmark-close").removeEventListener(
        "click",
        bookmarkCurrentBook
      );
    }
  );
};
// Single book view
const displayBook = (book) => {
  bookDisplay.insertAdjacentHTML(
    "afterbegin",
    ` <div class="book">
        <img src="${book.url}" alt="Cover" />
        <div class="book-btn-container">
          <button class="book-view ${book.id}">View</button>
          <button class="book-edit ${book.id}">Edit</button>
          <button class="book-delete ${book.id}">Delete</button>
        </div>
      </div>`
  );
};
// Initialize library
renderBooks();

// Helpers
const deleteBookmarkedBookHelper = (book, currentId) => {
  const bookmarkIndex = bookmarks.findIndex((book) => book.id === +currentId);
  bookmarks.splice(bookmarkIndex, 1);
};
const deleteBookHelper = (book, currentId) => {
  const index = books.findIndex((book) => book.id === +currentId);
  books.splice(index, 1);
};
//// Remove book from bookmarked books
query(".bookmarked-books").addEventListener("click", (e) => {
  const id = e.target.parentElement.classList[1];
  let index = bookmarks.findIndex((book) => book.id === +id);
  let currentBook = bookmarks.splice(index, 1);
  books.map((book) => {
    if (book.id === currentBook[0].id) book.bookmarked = false;
  });
  bookmarkBook();
});
