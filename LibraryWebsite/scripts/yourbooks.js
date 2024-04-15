const bookShowcase = document.getElementById("books-showcase-container");
const usernameContainer = document.getElementById("username-container");

bookShowcase.addEventListener("click", function(event) {
    let target = event.target;
    let bookTarget;
    if (target.classList.contains("return-book-button")) {
        bookTarget = target.parentElement;
    }

    let bookId = bookTarget.getElementsByClassName("book-id")[0].value;

    //let bookTitle = bookTarget.getElementsByClassName("book-title")[0].innerHTML;
    //console.log(bookTitle);
    //let bookAuthor = bookTarget.getElementsByClassName("book-author")[0].innerHTML;
    //console.log(bookAuthor);
    //let bookPageCount = bookTarget.getElementsByClassName("book-pagecount")[0].value;
    //console.log(bookPageCount);
    
    let request = new XMLHttpRequest();
    request.open("PUT", "http://localhost:8080/book/returnBook?id=" + bookId + "&id=" + bookId);
    request.responseType = "json";
    request.send(); 
    request.onload = function() {
        console.log("We have got our response!");
        console.log("Status code: " + request.status);
        console.log(request.response);
        window.location.reload();
    }
});

function createBooksFromJsonObject(jsonObjects) {
    bookList = [];
    for (let i in jsonObjects) {
        bookList.push(new Book(
            jsonObjects[i].id,
            jsonObjects[i].title,
            jsonObjects[i].author,
            jsonObjects[i].pageCount,
            jsonObjects[i].loaned,
            jsonObjects[i].loanee
        ))
    }
}
function showBooks() {
    if (bookList.length > 0) {
        for (let i in bookList) {
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

            let returnBookButton = document.createElement("button");
            returnBookButton.innerHTML = "Return book!";
            returnBookButton.classList.add("return-book-button");
            bookContainer.appendChild(returnBookButton);

            let bookId = document.createElement("input");
            bookId.classList.add("book-id");
            bookId.setAttribute("type", "hidden");
            bookId.setAttribute("value", bookList[i].id);
            bookContainer.appendChild(bookId);

            let bookPageCount = document.createElement("input");
            bookPageCount.classList.add("book-pagecount");
            bookPageCount.setAttribute("type", "hidden");
            bookPageCount.setAttribute("value", bookList[i].pageCount);
            bookContainer.appendChild(bookPageCount);
        }
    }
    else {
        let noBooksText = document.createElement("h2");
        noBooksText.innerHTML = "You have not loaned any books!";
        bookShowcase.appendChild(noBooksText);
    }
}
function onLoad() {
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
        usernameContainer.innerHTML = encodeURIComponent(localStorage.getItem("username"));
    }   
}

onLoad();