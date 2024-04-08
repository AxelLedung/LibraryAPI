package com.example.demo.services;

import com.example.demo.objects.Book;
import com.example.demo.repositories.BookRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class BookService{
    private BookRepository repo;

    public BookService(BookRepository repository) {
        repo = repository;
    }
    public void createBook(Book book) {
        repo.save(book);
    }
    public ArrayList<Book> getAllBooks() {
        return (ArrayList<Book>) repo.findAll();
    }
    public ArrayList<Book> getBooksFromLoanee(String loanee) {
        return (ArrayList<Book>) repo.findByLoanee(loanee);
    }

    public Book getBook(int id){
        if(repo.existsById(id)){
            return repo.findById(id).get();
        }
        return null;
    }

    public void deleteBook(Book book) {
        repo.delete(book);
    }

    public boolean updateBook(Book book) {
        if (repo.existsById(book.getId())) {
            repo.save(book);
            return true;
        }
        return false;
    }
}
