const bookShowcase = document.getElementById("books-showcase-container");
const usernameContainer = document.getElementById("username-container");

bookShowcase.addEventListener("click", function(event) {
    let target = event.target;
    let bookTarget;
    if (target.classList.contains("loan-book-button")) {
        bookTarget = target.parentElement;
    }

    let bookId = bookTarget.getElementsByClassName("book-id")[0].value;
    console.log(bookId);

    let user = encodeURIComponent(localStorage.getItem("username"));
    console.log(user);

    //let bookTitle = bookTarget.getElementsByClassName("book-title")[0].innerHTML;
    //console.log(bookTitle);
    //let bookAuthor = bookTarget.getElementsByClassName("book-author")[0].innerHTML;
    //console.log(bookAuthor);
    //let bookPageCount = bookTarget.getElementsByClassName("book-pagecount")[0].value;
    //console.log(bookPageCount);
    
    let request = new XMLHttpRequest();
    request.open("PUT", "http://localhost:8080/book/loanBook?id=" + bookId + "&loanee=" + user);
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
        for (let i in bookList)
        {
            console.log(i);
            let bookContainer = document.createElement("div");
            bookContainer.classList.add("book-container");
        
            let bookImageContainer = document.createElement("div");
            bookImageContainer.classList.add("book-image-container");
            bookContainer.appendChild(bookImageContainer)

            let bookTitle = document.createElement("div")
            bookTitle.classList.add("book-title");
            bookTitle.innerHTML = bookList[i].title;
            bookContainer.appendChild(bookTitle);

            let bookAuthor = document.createElement("div");
            bookAuthor.classList.add("book-author");
            bookAuthor.innerHTML = bookList[i].author;
            bookContainer.appendChild(bookAuthor);
            bookShowcase.appendChild(bookContainer);

        
            if (!bookList[i].loaned) {
                let loanBookButton = document.createElement("button");
                loanBookButton.innerHTML = "Loan book!";
                loanBookButton.classList.add("loan-book-button");
                bookContainer.appendChild(loanBookButton);
            }
            else {
                let loanBookButton = document.createElement("button");
                loanBookButton.innerHTML = "Loaned!";
                bookContainer.appendChild(loanBookButton);
                loanBookButton.setAttribute("disabled", "")
            }

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
        noBooksText.innerHTML = "Oh no, someone have stolen all the books in the library.";
        bookShowcase.appendChild(noBooksText);
    }
}
function onLoad() {
    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/book");
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







    /*let aDiv = document.createElement("div");
    let textObject = document.createElement("p");
    textObject.textContent = furnitureList[i].getInfo();
    aDiv.appendChild(textObject);

    // To know what item each div is associated with, I save a hidden input with its id.
    let hiddenInput = document.createElement("input");
    hiddenInput.setAttribute("type", "hidden");
    hiddenInput.setAttribute("value", furnitureList[i].id);
    aDiv.appendChild(hiddenInput);

    // The buttons have classes to identify what buttons they are.
    let buyButton = document.createElement("button");
    buyButton.classList.add("buyButton");
    buyButton.textContent = "Buy";
    aDiv.appendChild(buyButton);
    let hideButton = document.createElement("button");
    hideButton.classList.add("hideButton");
    hideButton.textContent = "Hide";
    aDiv.appendChild(hideButton);
    // Nothing appears unless it is appendChild to an existing container.
    furnitureContainer.appendChild(aDiv);

        }
    }
    request.onerror = function() {
        console.log("Oh, no! Something went wrong!");
    }
    request.ontimeout = function() {
        console.log("We did not get a response fast enough!");
    }
    request.onprogress = function() {
        console.log("We have completed the handshake and we have sent our request for processing!");
        console.log("Excellent time to say \"Loading...\"!");
    }

/*loanBook.addEventListener("click", function(event) {
    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/book");
    request.responseType = "json";
    request.send(); 
    request.onload = function() {
        console.log("We have got our response!");
        console.log("Status code: " + request.status);
        console.log(request.response);
    }
    request.onerror = function() {
        console.log("Oh, no! Something went wrong!");
    }
    request.ontimeout = function() {
        console.log("We did not get a response fast enough!");
    }
    request.onprogress = function() {
        console.log("We have completed the handshake and we have sent our request for processing!");
        console.log("Excellent time to say \"Loading...\"!");
    }
})
*/


/*for(let i in furnitureList) {
    let aDiv = document.createElement("div");
    let textObject = document.createElement("p");
    textObject.textContent = furnitureList[i].getInfo();
    aDiv.appendChild(textObject);

    // To know what item each div is associated with, I save a hidden input with its id.
    let hiddenInput = document.createElement("input");
    hiddenInput.setAttribute("type", "hidden");
    hiddenInput.setAttribute("value", furnitureList[i].id);
    aDiv.appendChild(hiddenInput);

    // The buttons have classes to identify what buttons they are.
    let buyButton = document.createElement("button");
    buyButton.classList.add("buyButton");
    buyButton.textContent = "Buy";
    aDiv.appendChild(buyButton);
    let hideButton = document.createElement("button");
    hideButton.classList.add("hideButton");
    hideButton.textContent = "Hide";
    aDiv.appendChild(hideButton);
    // Nothing appears unless it is appendChild to an existing container.
    furnitureContainer.appendChild(aDiv);
}*/

/*function createBookFromJsonObject(jsonObjects) {
    bookList = [];
    for (let i in bookList) {

    }
}*/


