document.addEventListener("DOMContentLoaded", function() {

  let all_books = []
  const ul = document.querySelector("#list")
  const showPanel = document.querySelector("#show-panel")

  fetch('http://localhost:3000/books')
  .then(function (response){
    return response.json()
  })
  .then(function (books){
    all_books = books
    books.forEach(render_li)
  })

  const render_li = function (book) {
    li = document.createElement("li")
    li.dataset.id = book.id
    li.innerText = book.title
    ul.appendChild(li)
  }

  const render_users = function (user) {
    li = document.createElement("li")
    li.innerText = user
     usersUL.appendChild(li)
  }

  const render_book_details = function (book) {
    div = document.createElement("div")
    div.innerHTML =
    `
      <p><strong>${book.title}</strong></p>
      <img src="${book.img_url}">
      <p>${book.description}</p>

      <ul id="bookdetailsul"><span>Users:</span>

      </ul>
    `
    showPanel.appendChild(div)

    usersUL = document.querySelector("#bookdetailsul")

    users = selectedBook.users.map(function (user) {
      return user.username
    })
    users.forEach(render_users)
  }

  ul.addEventListener('click', function (e){
    target_id = parseInt(e.target.dataset.id)

    selectedBook = all_books.find(function (book){
      return book.id === target_id
    })

    showPanel.innerHTML = ""

    render_book_details(selectedBook)


    console.log('selectedbook:',  selectedBook)
  })

});
