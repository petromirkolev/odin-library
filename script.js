// Global variables
let books = [];
const bookCollection = document.querySelector(".book-collection");
const bookLibrary = document.querySelector(".book-library");
const book = document.querySelector(".book");
const addBook = document.querySelector(".add-new-book");
const bookControls = document.querySelector(".book-controls");
const addBookForm = document.querySelector(".add-book-form");
const editBookForm = document.querySelector(".edit-book-form");
const viewBookForm = document.querySelector(".view-book-form");
const deleteBookForm = document.querySelector(".delete-book-form");
const bookmarkBookForm = document.querySelector(".bookmark-book-form");
const bookDisplay = document.querySelector(".book-display");
let canOpenModal = true;

// === Constructors ===
class Book {
  constructor(title, author, coverUrl) {
    this.id = books.length + 1;
    this.title = title;
    this.author = author;
    this.coverUrl = coverUrl;
    this.read = false;
  }
}
// === Helpers ===
// Get form variables;
const getFormVariables = (title, author, coverUrl) => {
  const formTitle = document.querySelector(`${title}`);
  const formAuthor = document.querySelector(`${author}`);
  const formCoverUrl = document.querySelector(`${coverUrl}`);
  return [formTitle, formAuthor, formCoverUrl];
};
const openModal = (action) => {
  bookControls.style.visibility = "visible";
  action.style.visibility = "visible";
  canOpenModal = false;
};
const closeModal = () => {
  bookControls.style.visibility = "hidden";
  addBookForm.style.visibility = "hidden";
  canOpenModal = true;
};

document.querySelector("body").addEventListener("click", (e) => {
  if (canOpenModal) return;
  const eClass = e.target.classList;
  if (!eClass.contains("form")) closeModal();
});

// === Display all books on home page ===

// === Renderers ===
// Render add book form
addBook.addEventListener("click", () => {
  if (!canOpenModal) return;
  openModal(addBookForm);
});
// Render book options modals
bookLibrary.addEventListener("click", (e) => {
  const currentClass = e.target.classList;
  // Open view book modal
  if (currentClass.contains("book-back-view") && canOpenModal) {
    openModal(viewBookForm);
    return;
  }
  // Open edit book modal
  if (currentClass.contains("book-back-edit") && canOpenModal) {
    openModal(editBookForm);
    return;
  }
  // Open delete book modal
  if (currentClass.contains("book-back-delete") && canOpenModal) {
    openModal(deleteBookForm);
    return;
  }
  // Open bookmark book modal
  if (currentClass.contains("book-back-bookmark") && canOpenModal) {
    openModal(bookmarkBookForm);
    return;
  }
});

//   const [title, author, coverUrl] = getFormVariables(
//     "#add-title",
//     "#add-author",
//     "#add-cover"
//   );

//   document.querySelector("#add-book").addEventListener("click", function (e) {
//     e.preventDefault();
//     createBook(title.value, author.value, coverUrl.value);
//     title.value = author.value = coverUrl.value = "";
//     bookControls.style.visibility = "hidden";
//     addBookForm.style.visibility = "hidden";
//   });
//   renderBooks();

// === Render view book form ===

// === Render delete book form ===

// === Render bookmark book form ===

// Create new book object and add it to books array
const createBook = function (title, author, coverUrl) {
  books.push(new Book(title, author, coverUrl));
};
// === Event listeners ===
// Find book in books array
bookCollection.addEventListener("click", function (e) {
  if (!e.target.classList.contains("btn-book")) return;

  const currentBookId = e.target.classList[2];
  books.find((book) => {
    if (book.id !== +currentBookId) return;
    // console.log(book);
  });
});
// Display all books on home page
const renderBooks = () => {
  bookDisplay.innerHTML = "";
  books.map((book) => {
    bookDisplay.insertAdjacentHTML(
      "afterbegin",
      ` <div class="book">
          <div class="book-inner">
            <div class="book-front">
              <img src="${book.coverUrl}" alt="Cover" />
            </div>
            <div class="book-back">
              <img src="${book.coverUrl}" alt="Cover" />
              <div class="book-btn-container">
              <button class="btn-book book-back-view ${book.id}">View</button>
              <button class="btn-book book-back-edit ${book.id}">Edit</button>
              <button class="btn-book book-back-delete ${book.id}">Delete</button>
              <button class="btn-book book-back-bookmark ${book.id}">Bookmark</button>
              </div>
            </div>
          </div>
        </div>`
    );
  });
};
// Initialize library

createBook(
  "Az",
  "Ti",
  "https://edit.org/photos/images/cat/book-covers-big-2019101610.jpg-1300.jpg"
);

createBook(
  "2",
  "3",
  "https://edit.org/photos/images/cat/book-covers-big-2019101610.jpg-1300.jpg"
);

renderBooks();
