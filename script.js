// Global variables
let books = [];
const libraryContainer = document.querySelector(".library-container");
const bookCollection = document.querySelector(".book-collection");

const bookLibrary = document.querySelector(".book-library");
const addBookBtn = document.querySelector(".add-new-book");
const bookControls = document.querySelector(".book-controls");
const addBookForm = document.querySelector(".add-book-form");
const editBookForm = document.querySelector(".edit-book-form");
const viewBookForm = document.querySelector(".view-book-form");
const deleteBookForm = document.querySelector(".delete-book-form");
const bookmarkBookForm = document.querySelector(".bookmark-book-form");
const bookDisplay = document.querySelector(".book-display");
let canOpenModal = true;

// === Constructors === //
// Create book object constructor
class Book {
  constructor(title, author, coverUrl) {
    this.id = books.length + 1;
    this.title = title;
    this.author = author;
    this.coverUrl = coverUrl;
    this.read = false;
  }
}
// Create new book object and add it to books array
const createBook = function (title, author, url) {
  books.push(new Book(title, author, url));
  console.log(books);
};
//////////////////////////////
//////////////////////////////
//////////////////////////////
const getInput = (action) => {
  let title = document.querySelector(`.inp-${action}-title`).value;
  let author = document.querySelector(`.inp-${action}-author`).value;
  let url = document.querySelector(`.inp-${action}-url`).value;

  return [title, author, url];
};
//////////////////////////////
//////////////////////////////
//////////////////////////////

libraryContainer.addEventListener("click", function (e) {
  if (e.target.tagName !== "BUTTON") return;

  switch (e.target.classList[0]) {
    case "add-new-book":
      openModal();
      addBookForm.style.visibility = "visible";

      document
        .querySelector(".form-add-book")
        .addEventListener("click", (e) => {
          e.preventDefault();
          const [title, author, url] = getInput("add");
          createBook(title, author, url);
          renderBooks();
        });

      break;
    case "book-view":
      console.log("asd");
      break;
    case "book-edit":
      console.log("asd");
      break;
    case "book-delete":
      console.log("asd");
      break;
    case "book-bookmark":
      console.log("asd");
      break;
    default:
      return;
  }
});

//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
// === Helper functions === //
// Display all books on home page
const renderBooks = () => {
  bookDisplay.innerHTML = "";
  books.map((book) => displayBook(book));
};
// Single book view
const displayBook = (book) => {
  bookDisplay.insertAdjacentHTML(
    "afterbegin",
    ` <div class="book">
              <img src="${book.coverUrl}" alt="Cover" />
              <div class="book-btn-container">
              <button class="book-view ${book.id}">View</button>
              <button class="book-edit ${book.id}">Edit</button>
              <button class="book-delete ${book.id}">Delete</button>
              <button class="book-bookmark ${book.id}">Bookmark</button>
              </div>
        </div>`
  );
};
// Open modal on button click
const openModal = () => {
  bookControls.style.visibility = "visible";
  canOpenModal = false;
};
// Find book in books array
bookCollection.addEventListener("click", function (e) {
  if (!e.target.classList.contains("btn-book")) return;
  const currentBookId = e.target.classList[2];
  books.find((book) => {
    if (book.id !== +currentBookId) return;
    // console.log(book);
  });
});
// === Initialize library === //
createBook(
  "Az",
  "Ti",
  "https://edit.org/photos/images/cat/book-covers-big-2019101610.jpg-1300.jpg"
);
renderBooks();
