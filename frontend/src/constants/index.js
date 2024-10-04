// Album image lists
import Rectangle6 from "../assets/list1/Rectangle6.png";
import Rectangle7 from "../assets/list1/Rectangle7.png";
import Rectangle8 from "../assets/list1/Rectangle8.png";
import Rectangle9 from "../assets/list1/Rectangle9.png";

// Genre image lists
import afro from "../assets/genre/afro.jpg";
import rnb from "../assets/genre/rnb.jpg";
import hipHop from "../assets/genre/hipHop.jpg";
import reggae from "../assets/genre/reggae.jpg";
import drill from "../assets/genre/drill.jpg";
import electronic from "../assets/genre/electronic.jpg";
import jazz from "../assets/genre/jazz.jpg";
import trap from "../assets/genre/trap.jpg";
import pop from "../assets/genre/pop.jpg";

import { addisMusic } from "../assets";

export const brandName = {
  name: "Addis Music",
  logo: addisMusic,
};

export const genreList = [
  {
    id: "asdsjdsjd",
    name: "Afro",
    image: afro,
    path: "afro",
  },
  {
    id: "asdsjdsjb",
    name: "R&B",
    image: rnb,
    path: "rnb",
  },
  {
    id: "asdsjdsjn",
    name: "Hip-Hop",
    image: hipHop,
    path: "hiphop",
  },
  {
    id: "asdsjdsjx",
    name: "Reggae",
    image: reggae,
    path: "reggae",
  },
  {
    id: "asdsjdsjg",
    name: "Drill",
    image: drill,
    path: "drill",
  },
  {
    id: "asdsjdsjq",
    name: "Electronic",
    image: electronic,
    path: "electronic",
  },
  {
    id: "asdsjdsjp",
    name: "Jazz",
    image: jazz,
    path: "jazz",
  },
  {
    id: "asdsjdsjf",
    name: "Trap",
    image: trap,
    path: "trap",
  },
  {
    id: "asdsjdsjl",
    name: "Pop",
    image: pop,
    path: "pop",
  },
];

export const currentPlay = {
  id: "uuididds3456789rtyui567y8u9io",
  artist: "Hana Girma",
  title: "Chereka ጨረቃ",
  length: "4.36",
};

export const albumList = [
  {
    id: "1",
    name: "Rectangle",
    image: Rectangle6,
  },
  {
    id: "2",
    name: "Rectangle",
    image: Rectangle7,
  },
  {
    id: "3",
    name: "Rectangle",
    image: Rectangle8,
  },
  {
    id: "4",
    name: "Rectangle",
    image: Rectangle9,
  },
  {
    id: "5",
    name: "Rectangle",
    image: Rectangle6,
  },
  {
    id: "6",
    name: "Rectangle",
    image: Rectangle7,
  },
  {
    id: "7",
    name: "Rectangle",
    image: Rectangle8,
  },
  {
    id: "8",
    name: "Rectangle",
    image: Rectangle9,
  },
];


export const playlistData = {
  id: 'id',
  name: 'Chill pop',
  createdAt: '10-10-2023',
  playlist: [
      {
          songId: 'song_id',
          songThumb: afro,
          songTitle: 'Title',
          artist: 'Artist',
          songLength: '33:33',
      },
      {
          songId: 'song_id',
          songThumb: rnb,
          songTitle: 'Title',
          artist: 'Artist',
          songLength: '33:33',
      },
      {
          songId: 'song_id',
          songThumb: hipHop,
          songTitle: 'Title',
          artist: 'Artist',
          songLength: '33:33',
      },
      {
        songId: 'song_id',
        songThumb: reggae,
        songTitle: 'Title',
        artist: 'Artist',
        songLength: '33:33',
    },
    {
      songId: 'song_id',
      songThumb: electronic,
      songTitle: 'Title',
      artist: 'Artist',
      songLength: '33:33',
  },
  {
      songId: 'song_id',
      songThumb: jazz,
      songTitle: 'Title',
      artist: 'Artist',
      songLength: '33:33',
  },
  {
      songId: 'song_id',
      songThumb: trap,
      songTitle: 'Title',
      artist: 'Artist',
      songLength: '33:33',
  },
  ]
}

