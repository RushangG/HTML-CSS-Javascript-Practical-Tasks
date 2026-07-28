# Music Player with Playlist
## Task: Build a music player application that plays songs asynchronously and manages playlists.

### Requirements:

Use callbacks to handle song playback events (play, pause, stop).

Implement features such as adding/removing songs from playlists and shuffling songs.

Display current song information and playlist dynamically.






# How to use:

1) music Player with playlist task

2) for add new song :

      a)  add song name 

      b) add artist name

      c) song url onine path .mp3

          example :
          1) url : https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3
          2) url : https://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3
          3) url : https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3


      d) song image online url .jpg or .png

          example :
          1) url : https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300
          2) url : https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300
          3) url : https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300

      OR 
    
    a) add local song to playlist use File Upload . 

    b)  select correct formtae .mp3 file than upload it to playlist.

        example : 1) song name : Vallah Cocktail 2.mp3
                  2) song name : Title Track Welcome To The Jungle.mp3
                  available in songs folder of this project.

3) remove song from playlist by clicking on remove button.

4) other fetures are same as music player task.
    play, pause, next, previous, volume control,  stop, progress bar,
     
     shuffle : suffle the playlist and play random song from playlist.

# Other features:
 
For play  uploaded song . 

 use   url = URL.createObjectURL(file) // return Blob URL and save in-memory of song file.

   to get the temporary url of uploaded song.
   
  conver to temporary url and add it to playlist array. 
  then play the song from playlist.
