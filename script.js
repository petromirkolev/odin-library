// Global variables
let books = [];
const bookDisplay = document.querySelector(".book-library");
const libraryContainer = document.querySelector(".library-container");
const addForm = document.querySelector(".add-book-form");
const editForm = document.querySelector(".edit-book-form");

// Check which button is pressed
libraryContainer.addEventListener("click", (e) => {
  const currentId = e.target.classList[1];

  switch (e.target.classList[0]) {
    case "book-add":
      return addNewBook();
    case "book-view":
      console.log("book view");
      return;
    case "book-edit":
      return editBook(currentId);
    case "book-delete":
      return deleteBook(currentId);
    case "book-bookmark":
      console.log("book bookmark");
      return;
  }
});

// Add new book
const addNewBook = () => {
  addForm.style.visibility = "visible";
  const title = document.querySelector(".inp-add-title");
  const author = document.querySelector(".inp-add-author");
  const url = document.querySelector(".inp-add-url");
  document
    .querySelector(".btn-add-book")
    .addEventListener("click", function addBook(e) {
      e.preventDefault();
      createBook(title.value, author.value, url.value);
      title.value = author.value = url.value = "";
      renderBooks();
      addForm.style.visibility = "hidden";
      document
        .querySelector(".btn-add-book")
        .removeEventListener("click", addBook);
    });
};
// Edit existing book
const editBook = (currentId) => {
  books.map((book) => {
    if (book.id !== +currentId) return;
    editForm.style.visibility = "visible";
    document.querySelector("#edit-title").value = book.title;
    document.querySelector("#edit-author").value = book.author;
    document.querySelector("#edit-url").value = book.url;
    document
      .querySelector(".btn-edit-book")
      .addEventListener("click", function editCurrentBook(e) {
        e.preventDefault();
        book.title = document.querySelector("#edit-title").value;
        book.author = document.querySelector("#edit-author").value;
        book.url = document.querySelector("#edit-url").value;
        renderBooks();
        editForm.style.visibility = "hidden";
        document
          .querySelector(".btn-edit-book")
          .removeEventListener("click", editCurrentBook);
      });
  });
};
// Delete existing book
const deleteBook = (currentId) => {};

// Create book object constructor
class Book {
  constructor(title, author, url) {
    this.id = books.length + 1;
    this.title = title;
    this.author = author;
    this.url = url;
    this.read = false;
  }
}
// Create new book object and add it to books array
const createBook = function (title, author, url) {
  books.push(new Book(title, author, url));
};

// Display all books on home page
const renderBooks = () => {
  bookDisplay.innerHTML = "";
  console.log(books);
  books.map((book) => displayBook(book));
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
              <button class="book-bookmark ${book.id}">Bookmark</button>
              </div>
        </div>`
  );
};

createBook(
  "Az",
  "Ti",
  "https://edit.org/photos/images/cat/book-covers-big-2019101610.jpg-1300.jpg"
);
createBook(
  "toi",
  "tq",
  "https://edit.org/photos/images/cat/book-covers-big-2019101610.jpg-1300.jpg"
);

renderBooks();
