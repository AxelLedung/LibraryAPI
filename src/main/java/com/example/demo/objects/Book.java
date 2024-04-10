package com.example.demo.objects;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column
    private String title;
    @Column
    private String author;
    @Column
    private int pageCount;
    @Column
    private boolean loaned;
    @Column
    private String loanee;

    public Book(String title, String author, int pageCount, boolean loaned, String loanee) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.loaned = loaned;
        this.loanee = loanee;
    }

    public Book(String title, String author, int pageCount) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getPageCount() {
        return pageCount;
    }

    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }
    public boolean getLoaned() {
        return loaned;
    }

    public void setLoaned(boolean loaned) {
        this.loaned = loaned;
    }
    public String getLoanee() {
        return loanee;
    }

    public void setLoanee(String loanee) {
        this.loanee = loanee;
    }
}
