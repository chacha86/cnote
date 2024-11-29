package com.cha.cnote.domain.notebook.controller;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByParentBookIsNull();
}

