$(document).ready(function(){

    if($('.jobSLCT').val(0)){
        //ICON CHANGE
                    $('.jobIcon i').empty();
                    $('.jobIcon i').addClass("fas fa-globe");
                    $('.jobTitle h4').text("Web Developer");
                    $('.jobDesc p').text("I am a full-stacked Web Developer");
                }
    var welcomeTopOffset = $(".section1").offset().top;
    var introTopOffset = $(".section2").offset().top;
    var jobTopOffset = $(".section3").offset().top;
    var affilStatsTopOffset = $(".section4").offset().top;
    var socSection = $(".section5").offset().top;
                        

    $(window).scroll(function(){
        if(window.pageYOffset > introTopOffset - $(window).height() + 360){
            $('.section2').removeClass('hide_content');
            $('.section2').addClass('show_content');
        }
        if(window.pageYOffset > jobTopOffset - $(window).height() + 340){
            $('.myRoles').removeClass('hide_contentleft');
            $('.myRoles').addClass('show_contentleft');
            $('.jobLists').removeClass('hide_contentright');
            $('.jobLists').addClass('show_contentright');

        }    
    
    });









    $('.jobSLCT').click(function(){
        job = false;
        
        for(i = 0; i < 3 && !job; i++){
            var idName = "#jobOpt" + i + ":checked";
            if($(idName).val() == 0)
                job = true;
        }
        

        switch(i){
            case 1:
                $('.jobIcon i').removeClass();
                $('.jobIcon i').addClass("fas fa-globe");
                $('.jobTitle h4').text("Web Developer");
                $('.jobDesc p').text("I am a Full-Stacked Web Developer.");
                break;
            case 2:
                $('.jobIcon i').removeClass();
                $('.jobIcon i').addClass("fas fa-mobile-alt");
                $('.jobTitle h4').text("Software Engineer");
                $('.jobDesc p').text("I am also knowledgeable in numerous programming languages.");
                break;
            case 3:
                $('.jobIcon i').removeClass();
                $('.jobIcon i').addClass("fas fa-graduation-cap");
                $('.jobTitle h4').text("College Student");
                $('.jobDesc p').text("I am currently a CS student at De La Salle University. I specialize in software technology.");
                break;
            default:
                break;

        }

//ICON CHANGE

    });



});