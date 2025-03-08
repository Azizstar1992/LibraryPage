// Retrieve books from localStorage or initialize an empty array
let books = JSON.parse(localStorage.getItem("books")) || [];

// Book Constructor Function
function Book(title, author, year, pages, status) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.status = status;
}

// Function to add a book and update the table
function addBook(book) {
  books.push(book);
  saveToLocalStorage();
  renderBooks();
}

// Function to render books in the table
function renderBooks() {
  const tableBody = document.querySelector("table tbody");
  tableBody.innerHTML = ""; // Clear previous rows

  books.forEach((book, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.year}</td>
      <td>${book.pages}</td>
      <td>${book.status}</td>
      <td><button onclick="deleteBook(${index})">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
}

// Function to delete a book from the list
function deleteBook(index) {
  books.splice(index, 1);  // Remove the book at the specified index
  saveToLocalStorage();
  renderBooks();
}

// Function to save books to localStorage
function saveToLocalStorage() {
  localStorage.setItem("books", JSON.stringify(books));
}

// Handle form submission
const form = document.getElementById("book-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;
  const pages = document.getElementById("pages").value;
  const status = document.getElementById("status").value;

  // Create a new book object
  const book = new Book(title, author, year, pages, status);

  // Add the book to the list
  addBook(book);

  // Clear the form
  form.reset();
});

// Render books on page load
renderBooks();
