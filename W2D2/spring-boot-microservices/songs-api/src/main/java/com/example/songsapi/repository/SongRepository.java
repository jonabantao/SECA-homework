package com.example.songsapi.repository;

import com.example.songsapi.model.Song;
import org.springframework.data.repository.CrudRepository;

public interface SongRepository extends CrudRepository<Song, Long> {

}
