let organization = [{
        "name": "Developer Student Club",
        "abbrev": "DSC Taft",
        "description": "university based community groups for students interested in Google developer technologies",
        "startYear": "2020",
        "endYear": "Present",
        "role": "Software Engineering Lead",
        "img": "org1.png"
    },
    {
        "name": "Philippine Web Designers Organization",
        "abbrev": "PWDO",
        "description": "a volunteer non-profit that helps nurture the local design & development community.",
        "startYear": "2019",
        "endYear": "Present",
        "role": "Volunteer",
        "img": "org0.png"
    },
    {
        "name": "User Experience Philippines",
        "abbrev": "UXPH",
        "description": "A community of user experience & usability professionals who want to improve human experiences in Philippine society.",
        "startYear": "2020",
        "endYear": "Present",
        "role": "Front-End Web Developer",
        "img": "org2.png"

    }];

let html = '';    
for(let [index, orgs] of organization.entries()){
    
    
    html += `
    <div class="affiliationCard">
        <div class ="affCont">
            <div class = "affImg">
                <img src ="includes/img/${orgs.img}">
            </div>
            <div class="affTxt">
                <div class ="affName">
                    ${orgs.abbrev}
                </div>
                <div class ="affRole">
                    ${orgs.role}
                </div>
                <div class ="affDate">
                    ${orgs.startYear}-${orgs.endYear}
                </div>
            </div>
        </div>
        <div class="affHid">
            <div class="affFName">
            ${orgs.name}
            </div>
            <div class="affDesc">
            ${orgs.description}
            </div>
        </div>
    </div>`;
}

document.querySelector('.affiliationList').innerHTML = html;









//JQUERY
$(document).ready(function(){

    var welcomeTopOffset = $(".new_section1").offset().top;
    var introTopOffset = $(".section2").offset().top;
    var jobTopOffset = $(".section3").offset().top;
    var affilStatsTopOffset = $(".section4").offset().top;
    var socSection = $(".section5").offset().top;




    if($('.jobSLCT').val(0)){
        //ICON CHANGE
            $('.jobIcon i').empty();
            $('.jobIcon i').addClass("fas fa-globe");
            $('.jobTitle h4').text("Web Developer");
            $('.jobDesc p').text("I am a full-stacked Web Developer");
         }



                         

    $(window).scroll(function(){
        if(window.pageYOffset > introTopOffset - $(window).height() + 240){
            $('.section2').removeClass('hide_content');
            $('.section2').addClass('show_content');
        }
        if(window.pageYOffset > jobTopOffset - $(window).height() + 360){
            $('.myRoles').removeClass('hide_contentleft');
            $('.myRoles').addClass('show_contentleft');
            $('.jobLists').removeClass('hide_contentright');
            $('.jobLists').addClass('show_contentright');
        }    
        if(window.pageYOffset > affilStatsTopOffset - $(window).height() + 360){
            $('.section4').removeClass('hide_content');
            $('.section4').addClass('show_content');
        }
        if(window.pageYOffset > socSection - $(window).height() + 240){
            $('.section5').removeClass('hide_content');
            $('.section5').addClass('show_content');
        }

    });









    $('.jobSLCT').click(function(){
        job = false;

        $('.jobContent').removeClass('show_job');
        $('.jobContent').addClass('hide_job');

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

        setTimeout(
            function() 
            {
                $('.jobContent').addClass('show_job');
                $('.jobContent').removeClass('hide_job');
        
            }, 50);



//ICON CHANGE

    });



});