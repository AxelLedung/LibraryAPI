const submitButton = document.getElementById("submit-button");
const nameInput = document.getElementById("username");


submitButton.addEventListener("click", function(event) {
    let username = nameInput.value;
    
    localStorage.setItem("username", username);
    window.location = "library.html";
});