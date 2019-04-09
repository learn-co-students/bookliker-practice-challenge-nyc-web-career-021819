document.addEventListener("DOMContentLoaded", function() {
   const bookList = document.querySelector("#list")
   const showPanel = document.querySelector("#show-panel")
   let allBooks;

   fetch(`http://localhost:3000/books`)
   .then(res => res.json())
   .then(books => {
      allBooks = books
      renderBookList()
   })

   function renderBookList() {
     allBooks.forEach(book => {
       let li = document.createElement("li");
       li.innerText = book.title;
       li.dataset.action = "info-render"
       li.dataset.id = book.id
       bookList.appendChild(li)
     })
   }

   function renderBook(book){
     showPanel.innerHTML=''
     let h2 = document.createElement("h2")
     h2.innerText = book.title
     h2.dataset.id = book.id
     let img = document.createElement("img")
     img.src = book.img_url
     let p = document.createElement("p")
     p.innerText = book.description
     let ul = document.createElement("ul")
     book.users.forEach(user => {
       let li = document.createElement("li")
       li.innerText = user.username
       ul.appendChild(li)
     })
     let button = document.createElement("button")
     button.innerText = "Like Book"
     button.id = "like-button"
     button.dataset.id = book.id
     showPanel.appendChild(h2)
     showPanel.appendChild(img)
     showPanel.appendChild(p)
     showPanel.appendChild(ul)
     showPanel.appendChild(button)
   }

   bookList.addEventListener('click', ev => {
      if (ev.target.dataset.action === "info-render"){
         let bookId = parseInt(ev.target.dataset.id)
         let selectedBook = allBooks.find(book => book.id === bookId)
         renderBook(selectedBook)
      }
   })

   function likePatch(bookId, users){
     fetch(`http://localhost:3000/books/${bookId}`, {
       method: "PATCH",
       headers :{ 'Content-Type':'application/json' },
       body: JSON.stringify({"users": users})
     })
     .then(res => res.json())
     .then(data => {})
   }

   showPanel.addEventListener('click', ev => {
    if (ev.target.id === "like-button"){
      let bookId = parseInt(ev.target.dataset.id)
      let bookUsers = allBooks.find(book => book.id === bookId).users
      let ul = showPanel.querySelector("ul")
          if (ev.target.innerText === "Like Book") {
           ev.target.innerText = "Unlike Book"
           bookUsers.push({"id":1, "username":"hipHipArrayClub"})
           likePatch(bookId, bookUsers)
           let li = document.createElement("li")
           li.innerText = "hipHipArrayClub"
           ul.appendChild(li)
         }
         else {
          ev.target.innerText = "Like Book"
          bookUsers.pop()
          likePatch(bookId, bookUsers)
          ul.removeChild(ul.lastChild)
         }
    }
   })

});
