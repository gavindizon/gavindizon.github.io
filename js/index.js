window.onscroll = (e) =>{
    if((window.scrollY) > 0){
        document.querySelector('.header').style = "box-shadow: 0rem 1rem 2rem rgba(0, 0, 0, 0.8);"
    }else{
        document.querySelector('.header').style = "box-shadow: 0;"
    }
}
