const bookShowcase = document.getElementById("books-showcase-container");

function createBooksFromJsonObject(jsonObjects) {
    bookList = [];
    for (let i in jsonObjects) {
        bookList.push(new Book(
            jsonObjects[i].id,
            jsonObjects[i].title,
            jsonObjects[i].author,
            jsonObjects[i].pageCount
        ))
    }
}
function showBooks() {
    for (let i in bookList)
    {
        console.log(i);
        let bookContainer = document.createElement("div");
        bookContainer.classList.add("book-container");
        
        let bookImageContainer = document.createElement("div");
        bookImageContainer.classList.add("book-image-container");
        bookContainer.appendChild(bookImageContainer);

        let bookTitle = document.createElement("div")
        bookTitle.classList.add("book-title");
        bookTitle.innerHTML = bookList[i].title;
        bookContainer.appendChild(bookTitle);

        let bookAuthor = document.createElement("div");
        bookAuthor.classList.add("book-author");
        bookAuthor.innerHTML = bookList[i].author;
        bookContainer.appendChild(bookAuthor);
        bookShowcase.appendChild(bookContainer);
    }
}
let user = encodeURIComponent(localStorage.getItem("username"));
let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/book/bookByLoaner?loanee=" + user);
    request.responseType = "json";
    request.send(); 
    request.onload = function() {
        console.log("We have got our response!");
        console.log("Status code: " + request.status);
        console.log(request.response);
        createBooksFromJsonObject(request.response);
        showBooks();
}