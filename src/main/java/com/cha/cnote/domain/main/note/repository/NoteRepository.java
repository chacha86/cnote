package com.cha.cnote.domain.main.note.repository;

import com.cha.cnote.domain.main.note.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByBookId(long bookId);
    List<Note> findByPublishedTrue();
}
