function changeGallerySize(op){
    let btnP = document.getElementById('btnPlus')
    let btnM = document.getElementById('btnMinus')

    if(op == '+'){
        var cols = document.getElementsByClassName('galleryItem');
        var cols2 = document.getElementsByClassName('gImage');
        btnP.disabled = true;
        btnM.disabled = false;
        
        for(i = 0; i < cols.length; i++) {
            cols[i].classList.remove("galleryItemInner");
            cols[i].classList.add("galleryItemInnerSm");
        }
        for(i = 0; i < cols2.length; i++) {
            cols2[i].classList.remove("gallerieImage");
            cols2[i].classList.add("gallerieImageSm");
        }
    }else{
        var cols = document.getElementsByClassName('galleryItem');
        var cols2 = document.getElementsByClassName('gImage');
        btnP.disabled = false;
        btnM.disabled = true;

        for(i = 0; i < cols.length; i++) {
            cols[i].classList.remove("galleryItemInnerSm");
            cols[i].classList.add("galleryItemInner");
        }
        for(i = 0; i < cols2.length; i++) {
            cols2[i].classList.remove("gallerieImageSm");
            cols2[i].classList.add("gallerieImage");
        }
    }
}

function searchGeneral(wr){
    let q = document.getElementById('searchQ').value.toLowerCase();
    let elems = document.getElementsByClassName(wr)
    for (let index = 0; index < elems.length; index++) {
        const item = elems[index];
        if(q.length <= 1){
            item.classList.remove('hidden')
        }else if(q.length > 30){
            return null;
        }else{
            if(item.id.toLowerCase().includes(q)){
                console.log(item.id)
                item.classList.remove('hidden')
            }else{
                item.classList.add('hidden')
            }
        }
    }
}

function isImg(ext){
    if(ext==='.jpg' || ext==='.gif' || ext==='.png' || ext==='jpeg' || ext==='jfif'){return true}
    else return false
}

function isVid(ext){
    if(ext==='.mp4' || ext==='.webm'){return true}
    else return false
}

function searchGallery(media){
    let elems = document.getElementsByClassName('galleryItem')
    for (let index = 0; index < elems.length; index++) {
        const item = elems[index];
        const id = item.id.toLowerCase()
        const ext = id.substr(-4)
        switch (media) {
            case 'video':
                if(isVid(ext)){
                    if(item.classList.contains('hidden')){
                        item.classList.remove('hidden')
                    }else{
                        item.classList.add('hidden')
                    }
                }
                break;
            case 'image':
                if(isImg(ext)){
                    if(item.classList.contains('hidden')){
                        item.classList.remove('hidden')
                    }else{
                        item.classList.add('hidden')
                    }
                }
                break;
            case 'other':
                if(!isVid(ext) && !isImg(ext)){
                    if(item.classList.contains('hidden')){
                        item.classList.remove('hidden')
                    }else{
                        item.classList.add('hidden')
                    }
                }
                break;
            default:
                break;
        }
    }
}

function btnToggle(id){
    let btn = document.getElementById(id)
    if(btn.classList.contains('active')){
        btn.classList.remove('active')
    }else{
        btn.classList.add('active')
    }
    
}

function btnSizeToggle(id){
    if(id=="btnPlus" || "btnMinus"){
        let btnP = document.getElementById('btnPlus')
        let btnM = document.getElementById('btnMinus')
        if(id=="btnPlus" && btnM.classList.contains('active')){
            btnP.classList.add('active')
            btnM.classList.remove('active')
        }if(id=="btnMinus" && btnP.classList.contains('active')){
            btnM.classList.add('active')
            btnP.classList.remove('active')
        }
    }
}