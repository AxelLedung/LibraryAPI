package com.example.demo.controllers;

import com.example.demo.objects.Book;
import com.example.demo.services.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
}
