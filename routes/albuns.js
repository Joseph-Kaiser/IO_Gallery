const express = require("express");
const router = express.Router();
const fs = require("fs");
const { randomBytes } = require("crypto");

router.get('/', (req, res) => {
    let path = "public/Albums/"
    let albumNm = getDirectories(path)
    res.render('albums', {
        AlbumNm : albumNm
    })
})

router.get('/:albumname', async (req, res) => {
    let album = req.params.albumname
    let path = "public/Albums/"+album
    let nddsa = getDirectories(path)
    console.log(nddsa)
    let thumbs = await getThumbs(nddsa, path)
    res.render("galleries", {
        Thumbs : thumbs,
        Album : album
    })
})

router.get('/:albumname/:galName', async (req,res) => {
    let album = req.params.albumname
    let gal = req.params.galName
    let path = "public/Albums/"+album+"/"+gal
    let images = await getImages(path)
    res.render("gallery", {
        Gal : gal,
        Images : images
    })
})

var customSort = function (a, b) {
    return (Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])))
}

function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path+'/'+file).isDirectory();
    });
}

function randomRange(min, max) {  
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

async function getThumbs(filess, path){
    let thumbs = []
    await filess.forEach(item => {
        filePath = path+"/"+item;
        let directoryPath = filePath

        fs.readdir(directoryPath, function(err, files) {
            files = extractValidThumb(files);
            if (err) {
                thumbs.push(null)
            } else {
                thumbs.push((directoryPath+"/"+files[randomRange(0,5)]).toString());
            }
        })
    })
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    thumbs = thumbs.sort()
    console.log(thumbs)
    return thumbs;
}

async function getImages(path){
    let Images = []
    await fs.readdir(path, function(err, files) {
        if (err) {
            Images.push(null)
        } else {
            files.forEach(file => {
                Images.push((path+"/"+file).toString());
            });
        }
    })
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    Images = Images.sort(customSort)
    console.log(Images)
    return Images
}

function extractValidThumb(data){
    let td = [ ]
    data.forEach(item => {
        let iname = item.substr(-3);
        if (iname === 'jpg' || iname === 'ong' || iname === 'gif' || iname === 'GIF'){
            console.log(item)
            td.push(item)
        } 
    });
    return td
}

module.exports = router;