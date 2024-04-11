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
    public ArrayList<Book> getLoanedBooks(Boolean loaned) { return (ArrayList<Book>) repo.findByLoaned(loaned); }

    public Book getBook(int id){
        if(repo.existsById(id)){
            return repo.findById(id).get();
        }
        return null;
    }

    public boolean addBook(Book book) {
        repo.save(book);
        if (book != null) {
            return true;
        }
        return false;
    }

    public boolean deleteBook(Integer id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean updateBook(Book book) {
        if (repo.existsById(book.getId())) {
            repo.save(book);
            return true;
        }
        return false;
    }

    public boolean loanBook(Book book, String loanee){
        if (repo.existsById(book.getId())){
            book.setLoaned(true);
            book.setLoanee(loanee);

            repo.save(book);
            return true;
        }
        return false;

    }    public boolean returnBook(Book book){
        if (repo.existsById(book.getId())){
            book.setLoaned(false);
            book.setLoanee(null);

            repo.save(book);
            return true;
        }
        return false;
    }
}
