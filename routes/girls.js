const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get('/', (req, res) => {
    res.render('girls')
})

//router.post('/', (req, res) => {
//    res.send('girls')
//})

router.get('/:girlname', async (req, res) => {
    let girl = req.params.girlname
    let path = "public/Girls/"+girl
    let nddsa = getDirectories(path)
    //console.log(nddsa)
    let thumbs = await getThumbs(nddsa, path)
    console.log("sdfsdfsdf", thumbs)
    res.render(girl, {
        Nddsa : nddsa,
        Thumbs : thumbs
    })
})

//router.get('/shiro', async (req, res) => {
//    let path = "public/Girls/Shiro"
//    let nddsa = getDirectories(path)
//    //console.log(nddsa)
//    let thumbs = await getThumbs(nddsa, path)
//    console.log("sdfsdfsdf", thumbs)
//    res.render('shiro', {
//        Nddsa : nddsa,
//        Thumbs : thumbs
//    })
//})

//router.get('/meryl', (req, res) => {
//    let nddsa = getDirectories("D:/Pron/Pics/Meryl")
//    console.log(nddsa)
//    res.render('meryl', {Nddsa : nddsa})
//})

function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path+'/'+file).isDirectory();
    });
}

async function getThumbs(filess, path){
    let thumbs = []
    await filess.forEach(item => {
        filePath = path+"/"+item;
        let directoryPath = filePath

        fs.readdir(directoryPath, function(err, files) {
        if (err) {
            thumbs.push(null)
        } else {
            thumbs.push((directoryPath+"/"+files[0]).toString());
            //files.forEach(function(file) {
            //    console.log(file)
            //})
        }
        })
    })
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    console.log(thumbs)
    return thumbs;
}

module.exports = router;