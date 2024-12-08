package com.cha.cnote.domain.notebook.repository;

import com.cha.cnote.domain.note.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {
}
