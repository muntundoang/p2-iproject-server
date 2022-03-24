const axios = require('axios')
const keyMM = process.env.keyMM
const keyYT = process.env.keyYT

class Controller {
    static async getVideos(req, res){
        const {q} = req.query
        try {
            let searchList = await axios({
                url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${q}&key=${keyYT}`,
                method: 'GET'
            })
            let dataVideo = []
            searchList.data.items.forEach((el) => {
                console.log(el);
                let obj = {
                    title: el.snippet.title,
                    thumbnails: el.snippet.thumbnails.high,
                    videoId: el.id.videoId
                }
                dataVideo.push(obj)
           });
            res.status(200).json(dataVideo)
        } catch (error) {
            console.error(error)
        }
    }

    static async getListLyric(req, res){
        const {q_track, q_artist, q_lyrics} = req.query
        try {
            let getlyric = await axios({
                url: `https://api.musixmatch.com/ws/1.1/track.search?q_track=${q_track}&q_artist=${q_artist}&apikey=${keyMM}&q_lyrics=${q_lyrics}`,
                method: 'GET'
            })
            let dataArtist = []
            getlyric.data.message.body.track_list.forEach((el) => {
                let obj = {
                    artist: el.track.artist_name,
                    trackId: el.track.track_id,
                    trackName: el.track.track_name
                }
                dataArtist.push(obj)
           });
            res.status(200).json(dataArtist)
        } catch (error) {
            console.error(error)
        }
    }

    static async getLyric(req, res){
        const {track_id} = req.params
        try {
            let getlyric = await axios({
                url: `https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=${keyMM}&track_id=${track_id}`,
                method: 'GET'
            })
            let dataArtist = []
            getlyric.data.message.body.track_list.forEach((el) => {
                console.log(el);
                let obj = {
                    artist: el.track.artist_name,
                    trackId: el.track.track_id,
                    trackName: el.track.track_name
                }
                dataArtist.push(obj)
           });
            res.status(200).json(dataArtist)
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = Controller