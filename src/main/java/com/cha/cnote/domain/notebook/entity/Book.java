package com.cha.cnote.domain.notebook.controller;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 30)
    private String name;
    @OneToMany(mappedBy = "parentBook", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Book> subBooks = new ArrayList<>();
    @ManyToOne
    private Book parentBook;

    public void addSubBook(Book book) {
        this.subBooks.add(book);
        book.setParentBook(this);
    }

    public void setParentBook(Book parentBook) {
        this.parentBook = parentBook;
    }

    public BookDto toDto() {
        return BookDto.builder()
                .id(this.id)
                .name(this.name)
                .subBooks(this.toSubBookDto())
                .build();
    }

    public List<BookDto> toSubBookDto() {
        List<BookDto> bookDtos = new ArrayList<>();
        for (Book subBook : this.subBooks) {
            bookDtos.add(subBook.toDto());
        }
        return bookDtos;
    }
}