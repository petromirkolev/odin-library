const renderBook = function () {
  return `
  <div class="book">
    <div class="book-inner">
      <div class="book-front">
        <img
          src="images/book-covers-big.jpeg"
          alt="Avatar"
          style="width: 300px; height: 300px"
        />
        <button class="view">View</button>
        <button class="edit">Edit</button>
        <button class="delte">Delete</button>
      </div>
      <div class="book-back">
        <img
          src="images/book-covers-big.jpeg"
          alt="Avatar"
          style="width: 300px; height: 300px"
        />
      </div>
    </div>
  </div>`;
};

export default renderBook();
