const axios = require('axios')
const key = 'AIzaSyC_CkzPdGSfLlIReTPo56NbAQPJ3RqIi-g'

class Controller {
    static async getVideos(req, res){
        const {q} = req.query
        try {
            let searchList = await axios({
                url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${q}&key=${key}`,
                method: 'GET'
            })
            let dataVideo = []
            searchList.data.items.forEach((el) => {
                let obj = {
                    title: el.snippet.title,
                    videoId: el.id.videoId
                }
                dataVideo.push(obj)
           });
            res.status(200).json(dataVideo)
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = Controller