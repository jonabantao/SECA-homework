package com.example.songsapi.controller;

import com.example.songsapi.model.Song;
import com.example.songsapi.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
public class SongsController {
    @Autowired
    private SongRepository songRepository;

    @GetMapping("/")
    public Iterable<Song> findAllSongs() {
        return songRepository.findAll();
    }

    @GetMapping("/{songId}")
    public Song findSongById(@PathVariable Long songId) {
        return songRepository.findOne(songId);
    }

    @GetMapping("/search")
    public Iterable<Song> findSongByTitle(@RequestParam("title") String title) {
        return songRepository.findByTitleContaining(title);
    }

    @DeleteMapping("/{songId}")
    public HttpStatus deleteSongById(@PathVariable Long songId) {
        songRepository.delete(songId);
        return HttpStatus.OK;
    }

    @PostMapping("/")
    public Song createNewSong(@RequestBody Song newSong) {
        return songRepository.save(newSong);
    }

    @PatchMapping("/{songId}")
    public Song updateSongById(@PathVariable Long songId, @RequestBody Song songRequest) {

        Song songFromDb = songRepository.findOne(songId);

        songFromDb.setTitle(songRequest.getTitle());
        songFromDb.setSongArtist(songRequest.getSongArtist());
        songFromDb.setLength(songRequest.getLength());

        return songRepository.save(songFromDb);
    }
}