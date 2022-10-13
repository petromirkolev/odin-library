// Global variables
let books = [];
const bookCollection = document.querySelector(".book-collection");

// Event listeners

bookCollection.addEventListener("click", function (e) {
  if (!e.target.classList.contains("book-back-select")) return;

  const currentBookId = e.target.classList[1];

  let foundBook = books.find((book) => book.id === currentBookId);
  console.log(foundBook);
});

// Book constructor
class Book {
  constructor(id, title, author, coverUrl) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.coverUrl = coverUrl;
    this.read = false;
  }
}

const createBook = function (id, title, author, coverUrl) {
  let book = new Book(id, title, author, coverUrl);
  books.push(book);
};

createBook(
  `${books.length + 1}`,
  "Lord of the rings",
  "The Lord",
  "https://m.media-amazon.com/images/I/51kfFS5-fnL._SX332_BO1,204,203,200_.jpg"
);
createBook(
  `${books.length + 1}`,
  "The Hobbit",
  "Hobbitts",
  "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546071216l/5907.jpg"
);

books.map((book) => {
  bookCollection.insertAdjacentHTML(
    "beforeend",
    ` <div class="book">
          <div class="book-inner">
            <div class="book-front">
              <img src="${book.coverUrl}" alt="Cover" />
            </div>
            <div class="book-back">
              <img src="${book.coverUrl}" alt="Cover" />
              <div class="btn-container">
              <button class="book-back-view ${book.id}">View</button>
              <button class="book-back-edit ${book.id}">Edit</button>
              <button class="book-back-delete ${book.id}">Delete</button>
              <button class="book-back-bookmark ${book.id}">Bookmark</button>
              </div>
            </div>
          </div>
        </div>`
  );
});
