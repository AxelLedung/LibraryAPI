class Book {
    #private_variable;
    _protected_variable;

    constructor(id, title, author, pageCount, loaned, loanee) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.loanee = loaned;
        this.loaned = loanee;
    }
}