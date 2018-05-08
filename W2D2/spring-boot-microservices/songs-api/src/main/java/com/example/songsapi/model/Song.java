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

    @Column(name = "SONG_NAME")
    private String songName;

    @Column(name = "FIRST_NAME")
    private String firstName;

    @Column(name = "LAST_NAME")
    private String lastName;

    public Song(String songName, String firstName, String lastName) {
        this.songName = songName;
        this.firstName = firstName;
        this.lastName = lastName;
    }

}
