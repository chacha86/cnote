package com.cha.cnote.global;

import com.cha.cnote.domain.auth.refreshToken.entity.RefreshToken;
import com.cha.cnote.domain.auth.refreshToken.repository.RefreshTokenRepository;
import com.cha.cnote.domain.member.entity.Member;
import com.cha.cnote.domain.member.repository.MemberRepository;
import com.cha.cnote.domain.note.entity.Note;
import com.cha.cnote.domain.notebook.entity.Book;
import com.cha.cnote.domain.notebook.repository.BookRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class TestDataInitializer implements ApplicationRunner {

    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public void makeTestData() {

        makeTestMember();

        Book book1 = Book.builder()
                .name("book1")
                .build();
        Book book2 = Book.builder()
                .name("book2")
                .build();
        Book book3 = Book.builder()
                .name("book3")
                .build();

        Book book4 = Book.builder()
                .name("book4")
                .build();
        Book book5 = Book.builder()
                .name("book5")
                .build();
        Note note1 = Note.builder()
                .title("note1")
                .content("note1 content")
                .build();
        Note note2 = Note.builder()
                .title("note2")
                .content("note2 content")
                .build();
        Note note3 = Note.builder()
                .title("note3")
                .content("note3 content")
                .build();

        book1.addSubBook(book4);
        book1.addSubBook(book5);
        book1.addNote(note1);
        book1.addNote(note2);
        book1.addNote(note3);

        Book book6 = Book.builder()
                .name("book6")
                .build();
        Book book7 = Book.builder()
                .name("book7")
                .build();

        book2.addSubBook(book6);
        book3.addSubBook(book7);

        Note note4 = Note.builder()
                .title("note4")
                .content("note4 content")
                .build();
        Note note5 = Note.builder()
                .title("note5")
                .content("note5 content")
                .build();
        Note note6 = Note.builder()
                .title("note6")
                .content("note6 content")
                .build();

        book2.addNote(note4);
        book2.addNote(note5);
        book3.addNote(note6);

        bookRepository.saveAll(List.of(book1, book2, book3));

    }

    public void makeTestMember() {
        Member m1 = Member.builder()
                .loginId("user1")
                .password("1234")
                .nickname("user1")
                .build();

        Member m2 = Member.builder()
                .loginId("user2")
                .password("1234")
                .nickname("user2")
                .build();

        memberRepository.saveAll(List.of(m1, m2));

        RefreshToken rt1 = RefreshToken.builder()
                .refreshToken("token1")
                .member(m1)
                .build();


        RefreshToken rt2 = RefreshToken.builder()
                .refreshToken("token2")
                .member(m2)
                .build();

        refreshTokenRepository.saveAll(List.of(rt1, rt2));
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("test data init");
        if (bookRepository.count() > 0) return;
        System.out.println("test data create start");
        makeTestData();
        System.out.println("test data create end");
    }
}
