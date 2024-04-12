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
        
    }
}

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

    } 
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


