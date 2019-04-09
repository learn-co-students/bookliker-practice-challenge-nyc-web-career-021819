document.addEventListener("DOMContentLoaded", function() {

   const bookList = document.querySelector("#list");
   let books;
   const showPanel = document.querySelector("#show-panel");
   //Helpers
   const renderSingleBook = function(book) {
      return showPanel.innerHTML = `
           <h1>${book.title}</h1>
            <img src="${book.img_url}">
            <p>${book.description}</p>
            <h3 id="user-name">${book.users.map(user => user.username).join("<br>")}</h3>
            <button data-id="${book.id}"> Read </button>
            <button data-id="${book.id}" data-action="like"> Like </button>
           `;
   };

  //Fetch
  fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(function(booksArr) {
      books = booksArr;
      books.forEach(book => {
        bookList.innerHTML += `
        <li id='${book.id}'>${book.title}</li>
        `;
      });
    });

  bookList.addEventListener("click", ev => {
    const bookId = parseInt(ev.target.id);
    const foundBook = books.find(book => book.id === bookId);
    showPanel.innerHTML = renderSingleBook(foundBook);
    const likeBtn = document.querySelector(`button[data-action="like"]`);
    likeBtn.addEventListener("click", ev => {
      const likedBookId = parseInt(ev.target.dataset.id);
      const foundBook = books.find(book => book.id === likedBookId);
      const userData = { id: 1, username: "pouros" };
      showPanel.innerHTML = renderSingleBook(foundBook);

      foundBook.users.push(userData);
      fetch(`http://localhost:3000/books/${likedBookId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ users: foundBook.users })
      }) // end of the patch
        .then(res => res.json())
        .then(book => {
           renderSingleBook(book)
        });
    });
  });
});

//find the specific buttons for the each book
// Click and render the User info who read the book
//end of the the Booklist Event Listener
// end of the DOMContentLoaded Event
