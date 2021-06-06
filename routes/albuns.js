const express = require("express");
const router = express.Router();
const fs = require("fs");
const { randomBytes } = require("crypto");

router.get('/', async (req, res) => {
    let path = "public/Albums/"
    let albumNm = getDirectories(path)
    let preThumb = await getPreThumb(albumNm)
    res.render('albums', {
        AlbumTh : preThumb
    })
})

router.get('/:albumname', async (req, res) => {
    let album = req.params.albumname
    let path = `public/Albums/${album}`
    let nddsa = getDirectories(path)
    //console.log(nddsa)
    let galData = await getThumbs(nddsa, path)
    res.render("galleries", {
        GalData : galData,
        Album : album
    })
})

router.get('/:albumname/:galName', async (req,res) => {
    let album = req.params.albumname
    let gal = req.params.galName
    let path = `public/Albums/${album}/${gal}`
    let images = await getImages(path)
    res.render("gallery", {
        Gal : gal,
        Images : images
    })
})

router.get('/:albumname/:galName/:subFolder', async (req,res) => {
    let album = req.params.albumname
    let gal = req.params.galName
    let fol = req.params.subFolder
    let path = `public/Albums/${album}/${gal}/${fol}`
    let images = await getImages(path)
    res.render("gallery", {
        Gal : gal,
        Images : images
    })
})

function naturalSort(ary, fullNumbers) {
    var re = fullNumbers ? /[\d\.\-]+|\D+/g : /\d+|\D+/g;
    for (var i=ary.length;i--;)
        ary[i] = [ary[i]].concat((ary[i]+"").match(re).map(function(s){
        return isNaN(s) ? [s,false,s] : [s*1,true,s];
        }));
    ary.sort(function(a,b){
        var al = a.length, bl=b.length, e=al>bl?al:bl;
        for (var i=1;i<e;++i) {
            
        if (i>=al) return -1; else if (i>=bl) return 1;
        else if (a[i][0]!==b[i][0])
          return (a[i][1]&&b[i][1]) ?        // 
                 (a[i][0]-b[i][0]) :         // 
                 (a[i][2]<b[i][2]) ? -1 : 1; // 
        }
        return 0;
    });

    // Restore the original values into the array
    for (var i=ary.length;i--;) ary[i] = ary[i][0];
    return ary;
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

async function getPreThumb(albums){
    let thumbs = []
    let gall = []
    await albums.forEach((item,index) => {
        let galleries = getDirectories(`public/Albums/${item}`)
        let ks = galleries[randomRange(0, galleries.length)]
        let directoryPath = `public/Albums/${albums[index]}/${ks}`
        fs.readdir(directoryPath, function(err, files) {
            files = extractValidThumb(files);
            if (err) {
                thumbs.push(null)
            } else {
                thumbs.push((directoryPath+"/"+files[randomRange(0,5)]).toString());
            }
        })
        gall[index] = galleries.length
    })
    thumbs.sort((a, b) => a.firstname.localeCompare(b.firstname))
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    return item = {
        'Thumbs' : thumbs,
        'GallCount' : gall
    }
}

async function getThumbs(filess, path){
    let thumbs = []
    let count = []
    await filess.forEach((item, index)=> {
        filePath = path+"/"+item;
        let directoryPath = filePath

        fs.readdir(directoryPath, function(err, files) {
            count[index] = files.length
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
    return galData = {
        'Thumbs' : thumbs,
        'Count' : count
    };
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
    Images = naturalSort(Images)
    return Images
}

function extractValidThumb(data){
    let td = [ ]
    data.forEach(item => {
        let iname = item.substr(-4).toLowerCase();
        if (iname === '.jpg' || iname === '.gif' 
        || iname === '.png' || iname === 'jpeg' || iname === 'jfif'){
            td.push(item)
        } 
    });
    return td
}

module.exports = router;