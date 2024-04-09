package com.example.demo.controllers;

import com.example.demo.objects.Book;
import com.example.demo.services.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("book/")
public class BookController {
    private BookService bookService;

    @GetMapping("")
    public ArrayList<Book> bookArrayList() { return bookService.getAllBooks();}

    @GetMapping("/bookById")
    public ResponseEntity<Book> getSpecifiedBook(int id){
        Book book = bookService.getBook(id);
        if (book != null){
            return ResponseEntity.status(HttpStatus.OK).body(book);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
    @GetMapping("/bookByLoaner")
    public ResponseEntity<ArrayList<Book>> getBooksByLoanee(String loanee) {
        ArrayList<Book> bookArrayList = bookService.getBooksFromLoanee(loanee);
            if (bookArrayList != null) {
                return ResponseEntity.status(HttpStatus.OK).body(bookArrayList);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
    @GetMapping("/getLoanedBooks")
    public ResponseEntity<ArrayList<Book>> getLoanedBooks(Boolean loaned) {
        ArrayList<Book> bookArrayList = bookService.getLoanedBooks(loaned);
        if (bookArrayList != null) {
            return ResponseEntity.status(HttpStatus.OK).body(bookArrayList);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @PutMapping("/updateBook")
    public ResponseEntity<String> updateBookById ( String title, String author, int pageCount, boolean loaned, String loanee){
        Book book = new Book(title, author, pageCount, loaned, loanee);
        boolean success = bookService.updateBook(book);
        if(success){
            return ResponseEntity.status(HttpStatus.OK).body("Book was successfully updated!");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Book could not be updated!");
    }

    @PutMapping("/loanBook")
    public  ResponseEntity<String> loanBook (int id, boolean loaned){
        if(!bookService.getBook(id).getLoaned()){
            Book book = bookService.getBook(id);
            bookService.updateLoaned(book, loaned);
            return ResponseEntity.status(HttpStatus.OK).body("Loan was successfully made.");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Loan could not be made");
    }

    @PutMapping("/returnBook")
    public  ResponseEntity<String> returnBook (int id, boolean loaned){
        if(bookService.getBook(id).getLoaned()){
            Book book = bookService.getBook(id);
            bookService.updateLoaned(book, loaned);
            return ResponseEntity.status(HttpStatus.OK).body("Return was successfully made.");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Return could not be made");
    }

    @PostMapping("/add")
    public ResponseEntity<Book> addBook (String title, String author, int pagecount, boolean loaned, String loanee) {
        Book book = new Book(title, author, pagecount, loaned, loanee);
        boolean success = bookService.addBook(book);
        if (success) {
            return ResponseEntity.ok().body(book);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteBook (Integer id) {
        boolean success = bookService.deleteBook(id);
        if(success){
            return ResponseEntity.status(HttpStatus.OK).body("Book was successfully removed!");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Book could not be deleted!");
    }
}
