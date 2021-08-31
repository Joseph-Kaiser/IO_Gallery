const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const fs = require("fs");

router.get('/', (req, res) => {
    res.redirect('/auth/login')
})

router.get('/login', async (req, res) => {
    if(localStorage.getItem('Logged') == 'true'){res.redirect('/albums')}
    else{
        let backImg = await getImg()
        let exxp = req.params.exp || "false"
        let storesOldPass = localStorage.getItem('CurrentPass')
        if(storesOldPass == null){
            res.render('login', {
                "exps": exxp,
                "first": "true",
                "backImg": backImg
            })
        }else{
            res.render('login', {
                "exps": exxp,
                "first": "false",
                "backImg": backImg
            })
        }
    }
})

router.post('/login', async (req, res) => {
    let backImg = await getImg()
    let pass = req.body.pass;
    let storedPass = localStorage.getItem('CurrentPass')
    bcrypt.compare(pass, storedPass, function(err, result) {
        if(result){
            localStorage.setItem('Logged', 'true');
            res.redirect('/albums')
        }else{
            res.render("login", {
                "exps": "true",
                "first": "false",
                "backImg": backImg
            })
        }
    });
})

router.get('/setpass', async (req, res) => {
    let storesOldPass = localStorage.getItem('CurrentPass')
    let exxp = req.params.exp || "false"
    if(localStorage.getItem('Logged') == 'true'){res.redirect('/albums')}
    else{
        let backImg = await getImg()
        if(storesOldPass == null){
            res.render('passmanager', {
                "exps": exxp,
                "first": "true",
                "backImg": backImg
            })
        }else{
            res.render('passmanager', {
                "exps": exxp,
                "first": "false",
                "backImg": backImg
            })
        }
    }
})

router.post('/setpass', async (req, res) => {
    let backImg = await getImg()
    let storesOldPass = localStorage.getItem('CurrentPass')
    if(storesOldPass == null){ // Se for primeiro acesso, pedir somente senha nova/primeira
        let firstPass = req.body.newPass;
        bcrypt.hash(firstPass, 10, function(err, hash) {
            localStorage.setItem('CurrentPass', hash)
        });
        res.redirect('/')
    }else{
        storesOldPass = localStorage.getItem('CurrentPass')
        let oldPass = req.body.oldPass;
        let newPass = req.body.newPass;
        bcrypt.compare(oldPass, storesOldPass, function(err, result) {
            if(result){
                bcrypt.hash(newPass, 10, function(err, hash) {
                    localStorage.setItem('CurrentPass', hash)
                });
                res.redirect('/')
            }else{
                res.render("passmanager", {
                    "exps": "true",
                    "first": "false",
                    "backImg": backImg
                })
            }
        });
    }
})

router.get('/logout', (req, res) => {
    localStorage.setItem('Logged', 'false'); 
    res.redirect('/')
})

router.get('/saimeu', (req, res) => {
    localStorage.removeItem('CurrentPass')
    localStorage.setItem('Logged', 'false');
    res.redirect('/') 
})

function randomRange(min, max) {  
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

async function getImg(){
    let backImg
    fs.readdir('public/CustomLogin/', (err, imgs) => {
        let img = imgs[randomRange(0,imgs.length)];
        backImg = `public/CustomLogin/${img}`
    })
    await new Promise((resolve, reject) => setTimeout(resolve, 500));
    return backImg
}

module.exports = router;