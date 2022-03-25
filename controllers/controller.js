const axios = require('axios')
const keyMM = process.env.keyMM
const keyYT = process.env.keyYT
const {User} = require('../models')
const {compare} = require('../helpers/bcrypt.js')
const {generateToken} = require('../helpers/jwt.js')

class Controller {
    static async getVideos(req, res){
        const {q} = req.query
        try {
            let searchList = await axios({
                url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${q}&key=${keyYT}`,
                method: 'GET'
            })
            let dataVideo = []
            searchList.data.items.forEach((el) => {
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
            let status = getlyric.data.message.header.status_code
            let lyric = getlyric.data.message.body.lyrics.lyrics_body
            res.status(status).json(lyric)
        } catch (error) {
            console.error(error)
        }
    }

    static async register(req, res){
        const {email, password} = req.body
        try {
            const regis = await User.create({email, password})
            res.status(201).json({email: regis.email, password: regis.password})
        } catch (err) {
            res.status(500).json({message: "Internal server error"})
            // belum error handling
        }
    }

    static async login(req, res){
        const {email, password} = req.body
        try {
            if(!email || email === ""){
                throw {message: "Email is required"}
            } else if (!password || password === ""){
                throw {message: "Password is required"}
            }
            
            const userData = await User.findOne({where: {email}})
            if (userData === null) {
                throw {message: "Invalid email/password"}
            }
            const validPass = compare(password, userData.password)
            if(!validPass){
                throw {message: "Invalid email/password"}
            }
            const access_token = generateToken(userData.id)
            res.status(201).json({access_token})
        } catch (err) {
            res.status(500).json({message: "Internal server error"})
            // belum error handling
        }
    }
}

module.exports = Controller