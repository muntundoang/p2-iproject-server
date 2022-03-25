# API Documentation

## Endpoints :

List of available endpoints:


- `GET /video`
- `GET /lyric`
- `GET /lyric/:track_id`

&nbsp;

## 1. GET /video

description: fetch video data from Youtube API

Request:

- params:
```
q: 'string' <<- search content parameter
```

- body:

```json
{
    "status": "active",
    "id": 4,
    "title": "Kuproy(kuli proyek) lebos",
    "description": "penunggang helm proyek juga lebos",
    "imgUrl": "https://s.kaskus.id/images/2018/03/14/7034635_201803140525210520.jpg",
    "companyId": 2,
    "authorId": 2,
    "jobType": "full time",
    "updatedAt": "2022-03-07T15:13:32.355Z",
    "createdAt": "2022-03-07T15:13:32.355Z"
}
```

_Response (200 - Ok)_

```json
{
    {
        "title": "YUUGUREprjct",
        "thumbnails": {
            "url": "https://yt3.ggpht.com/Anxy1LFkiWkfxHteeVikdFJVSZi8jXuLb-56stU7fXmT5MPydWh-pYCcvXb8EMJ-Crj7ymAmfA=s800-c-k-c0xffffffff-no-rj-mo"
        }
    },
    {
        "title": "Diskoria, Laleilmanino, Eva Celia - C.H.R.I.S.Y.E. ( Karaoke - Remake )",
        "thumbnails": {
            "url": "https://i.ytimg.com/vi/4mHGvMOcLRU/hqdefault.jpg",
            "width": 480,
            "height": 360
        },
        "videoId": "4mHGvMOcLRU"
    },
    {
        "title": "Naif - Air Dan Api ( Karaoke )",
        "thumbnails": {
            "url": "https://i.ytimg.com/vi/gbSLSxABP6c/hqdefault.jpg",
            "width": 480,
            "height": 360
        },
        "videoId": "gbSLSxABP6c"
    },
}
```
## 2. GET /lyric

Description:
- Get Job from database by ID

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
[
  {
        "artist": "Ed Sheeran",
        "trackId": 124985075,
        "trackName": "Castle on the Hill"
    },
    {
        "artist": "Ed Sheeran",
        "trackId": 131500504,
        "trackName": "Castle on the Hill (Throttle Remix)"
    },
    {
        "artist": "Ed Sheeran",
        "trackId": 182284844,
        "trackName": "Castle on the Hill - Recorded at Spotify Studios New York City"
    },
]
```

&nbsp;

## 3. GET /lyric/:trackId

Description:

- Get 10 lyric that relate with search parameter from musixmatch

Request:

params: 
```
trackId: integer
```

_Response (200 - OK)_

```json
[
    "When I was six years old, I broke my leg\nI was running from my brother and his friends\nAnd tasted the sweet perfume of the mountain grass I rolled down\nI was younger then, take me back to when I\n\nFound my heart and broke it here\nMade friends and lost them through the years\nAnd I've not seen the roaring fields in so long\nI know I've grown, but I can't wait to go home\n\nI'm on my way\nDriving at 90 down those country lanes\nSinging to Tiny Dancer\nAnd I miss the way you make me feel, and it's real\nWhen we watched the sunset over the castle on the hill\n\nFifteen years old and smoking hand-rolled cigarettes\n...\n\n******* This Lyrics is NOT for Commercial use *******"
]
```

&nbsp;