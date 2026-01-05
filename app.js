//Array where the books will be saved
const myLibrary = [];

//Book constructor
function Book(id, title, author, pages, haveRead) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

//Function to add the book in the array
function addBookToLibrary(title, author, pages, haveRead) {
  const book = new Book(crypto.randomUUID(), title, author, pages, haveRead);
  myLibrary.push(book);
}

//Selectors divs and buttons
const books = document.querySelector(".books");
const addBtn = document.querySelector(".add-btn");
const forms = document.querySelector(".book-question");
const addLbr = document.querySelector(".add-lbr");

//Selectors inputs
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookRead = document.querySelector("#read");

//Show and hide the book form
addBtn.addEventListener("click", function () {
  if (forms.classList.contains("book-form")) {
    forms.classList.remove("book-form");
  } else {
    forms.classList.add("book-form");
  }
});

//Calls the addBookToLibrary function when addLbr is clicked
addLbr.addEventListener("click", function () {
  addBookToLibrary(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookRead.value
  );

  console.log(myLibrary);

  //Clears the input
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  bookRead.value = "";

  //Hide the form
  forms.classList.add("book-form");

  //Iterates through the array

  books.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("book");
    newDiv.textContent += `
            Id: ${myLibrary[i].id} 
            Title: ${myLibrary[i].title}
            Author: ${myLibrary[i].author} 
            Pages: ${myLibrary[i].pages}
            Have you read?: ${myLibrary[i].haveRead} 
        `;

    newDiv.dataset.id = myLibrary[i].id;

    //Creates a delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Book";
    deleteBtn.classList.add("delete-btn");

    //Adds the delete button to the new div
    newDiv.appendChild(deleteBtn);

    //Adds the new div to div container
    books.appendChild(newDiv);

    //Creates a event listener to exclude the book
    deleteBtn.addEventListener("click", function () {
      const id = this.parentElement.dataset.id;

      const index = myLibrary.findIndex((book) => book.id == id);

      if (index !== -1) {
        myLibrary.splice(index, 1);
        this.parentElement.remove();
      }
    });
  }
});
