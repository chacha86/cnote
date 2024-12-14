package com.cha.cnote.domain.main.notebook.repository;

import com.cha.cnote.domain.main.notebook.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByParentBookIsNull();
}

