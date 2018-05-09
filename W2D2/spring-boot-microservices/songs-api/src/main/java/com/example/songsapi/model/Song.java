package com.example.songsapi.model;

import lombok.*;
import javax.persistence.*;

@Data
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Entity @Table(name = "SONGS")
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "ARTIST")
    private String songArtist;

    @Column(name = "MILLISECONDS")
    private long milliseconds;

    public Song(String title, String songArtist, long milliseconds) {
        this.title = title;
        this.songArtist = songArtist;
        this.milliseconds = milliseconds;
    }

}
