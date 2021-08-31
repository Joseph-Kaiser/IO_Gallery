window.onscroll = function() {myFunction()};

function myFunction() {
    let bar = document.getElementById('topsbar')
    if(bar!==null){
        var y = window.scrollY;
        if(y<=35){
            bar.classList.remove("topsbarLow");
            bar.classList.remove("minilogoLow");
        }
        if(y>35){
            bar.classList.add("topsbarLow");
            bar.classList.add("minilogoLow");
        }
    }
}

function redir(page)
{
    window.location=page
}