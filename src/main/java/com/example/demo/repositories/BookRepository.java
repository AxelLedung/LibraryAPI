package com.example.demo.repositories;

import com.example.demo.objects.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    ArrayList<Book> findByLoanee(String loanee);
    ArrayList<Book> findByLoaned(Boolean loaned);

}
