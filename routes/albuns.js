const express = require("express");
const router = express.Router();
const fs = require("fs");
const { randomBytes } = require("crypto");
const { exception } = require("console");

router.get('/', async (req, res) => {
    if(localStorage.getItem('Logged') == 'false'){res.redirect('/auth/login')}
    else{
        let path = "public/Albums/"
        let albumNm = getDirectories(path)
        let preThumbs = await getPreThumb(albumNm)
        res.render('albums', {
            AlbumTh : preThumbs
        })
    }
})

router.get('/:albumname', async (req, res) => {
    let album = req.params.albumname
    if(localStorage.getItem('Logged') == 'false'){res.redirect('/auth/login')}
    else if(album.length <= 0){
        res.redirect('/')
        }else{
            try {
                let path = `public/Albums/${album}`
                let galleryList = getDirectories(path)
                let galData = await getThumbs(galleryList, path)
                if(galData == null){throw "Filesystem Error"}
                res.render("galleries", {
                    GalData : galData,
                    Album : album
                })
            } catch (error) {
                console.log(error)
                res.redirect('/albums')
            }
    }
})

router.get('/:albumname/:galName', async (req,res) => {
    if(localStorage.getItem('Logged') == 'false'){res.redirect('/auth/login')}
    else{
        try {
            let album = req.params.albumname
            let gal = req.params.galName
            let path = `public/Albums/${album}/${gal}`
            let images = await getImages(path)
            if(images[0] == null){throw "Folder doesn't exist / Empty"}
            res.render("gallery", {
                Gal : gal,
                Images : images
            })
        } catch (error) {
            console.log(error)
            res.redirect(`/albums`)
        }
        
    }
})

router.get('/:albumname/:galName/:subFolder', async (req,res) => {
    if(localStorage.getItem('Logged') == 'false'){res.redirect('/auth/login')}
    else{
        try {
            let album = req.params.albumname
            let gal = req.params.galName
            let fol = req.params.subFolder
            let path = `public/Albums/${album}/${gal}/${fol}`
            let images = await getImages(path)
            if(images[0] == null){throw "Folder doesn't exist / Empty"}
            res.render("gallery", {
                Gal : gal,
                Images : images
            })
        } catch (error) {
            console.log(error)
            res.redirect(`/albums`)
        }
    }
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

//                                    Main engine para Albums.ejs
async function getPreThumb(albums){ //Escolhe uma thumbnail aleatória dentre as Galerias do Album parent
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
                if(files.length <= 5){
                    thumbs.push((directoryPath+"/"+files[0]).toString());
                }else{
                    thumbs.push((directoryPath+"/"+files[randomRange(0,5)]).toString());
                }
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
    let galData = []
    try {
        await filess.forEach((item, index) => {
                let directoryPath = `${path}/${item}`;
                fs.readdir(directoryPath, function(err, files) {
                    try {
                        files = extractValidThumb(files);
                        if(err){
                            galData.push({Thumb: null, Count: null})
                        } else {
                            galData.push({Thumb: `${directoryPath}/${files[randomRange(0,files.length)].toString()}`, Count: files.length.toString()})
                        }
                    } catch (error) {
                        galData.push({Thumb: '../public/images/Folder-placeholder.jpg', Count: 0})
                    }
                })
        });
        await new Promise((resolve, reject) => setTimeout(resolve, 1000));
        //Custom pra essa etapa
        galData.sort(function(a, b) {
            return ((a.Thumb < b.Thumb) ? -1 : ((a.Thumb == b.Thumb) ? 0 : 1));
        });
        return galData;
    } catch (error) {
        console.log(error)
        return null
    }
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
        || iname === '.png' || iname === 'jpeg'
        || iname === 'jfif' || iname === 'webp'){
            td.push(item)
        } 
    });
    return td
}

module.exports = router;