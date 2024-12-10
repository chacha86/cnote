package com.cha.cnote.domain.note.service;

import com.cha.cnote.domain.note.entity.Note;
import com.cha.cnote.domain.note.repository.NoteRepository;
import com.cha.cnote.domain.notebook.entity.Book;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {
    private final NoteRepository noteRepository;

    public Note writeDefault(Book parent) {
        Note note = Note.builder()
                .title("no title..")
                .content("")
                .book(parent)
                .build();

        return noteRepository.save(note);
    }

    public List<Note> getListByBookId(long bookId) {
        return noteRepository.findByBookId(bookId);
    }

    public Note getOne(long id) {
        return noteRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 노트가 존재하지 않습니다."));
    }

    @Transactional
    public Note update(long id, String title, String content) {
        Note note = getOne(id);
        return note.update(title, content);
    }

    @Transactional
    public Note publish(long id, boolean published) {
        Note note = getOne(id);
        return note.update(published);
    }

    public List<Note> getList() {
        return noteRepository.findAll();
    }

    public List<Note> getPublishedList() {
        return noteRepository.findByPublishedTrue();
    }
}
