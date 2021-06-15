﻿/// <reference path="navbarfunc.js" />
// https://api.themoviedb.org/3/search/tv?api_key=1c107f2bd2f3fc2aee24aa4f2f8d8647&language=en-US&page=1&include_adult=false&query=Grey%27s%20Anatomy

$(document).ready(function () {
    $("#getTV").click(getTV);

    key = "90f77ef6862d870eb9f5fff3bc587100";

    url = "https://api.themoviedb.org/";
    imagePath = "https://image.tmdb.org/t/p/w500/";
    // 64467
    // 1416

    //https://api.themoviedb.org/3/tv/1416/season/0/episode/64467?api_key=1c107f2bd2f3fc2aee24aa4f2f8d8647&language=en-US
    //AIzaSyBAFQpdpUo7xpd6xQKspMv7Ci-Ex5xmbDg
    navBarVisability();
});

//https://api.themoviedb.org/3/tv/{tv_id}/season/{season_number}?api_key=<<api_key>>&language=en-US

function getTV() {
    i = 1;
    k = 0;
    $("#seasonsList").html("");
    $("#episodeList").html("");
    let name = $("#tvShowName").val();
    let method = "3/search/tv?";
    let api_key = "api_key=" + key;
    let moreParams = "&language=en-US&page=1&include_adult=false&";
    let query = "query=" + encodeURIComponent(name);
    let apiCall = url + method + api_key + moreParams + query;
    ajaxCall("GET", apiCall, "", getTVSuccessCB, getTVErrorCB);
    ajaxCall("GET", apiCall, "", getCredistSuccess, getCredistError);
}

////////////////////////////////////////////////////////////
function getCredistSuccess(tv){
    console.log(tv);

    $("#actors").html("");
    //castList = "<span>";
    actorsList = "";
    tvId = tv.results[0].id;

   
    
    let method = "3/tv/";
    let api_key = "api_key=" + key;

    let apiCall = url + method + tvId + "/credits?" + api_key;
    ajaxCall("GET", apiCall, "", getCastSuccessCB, getCastErrorCB);
}

function getCredistError(err) {
    alert("ERROR");
}

function getCastSuccessCB(credit) {
    console.log(credit);
    //if (k == 0)
    //    slide();
    actorsList += "<div class='actorCard'><img class= 'actorImg' style='width: 100%' src='" + imagePath + credit.cast[k].profile_path + "'/>";
    actorsList += "<div class='actorContainer'><h4 style='text-align:center'><b>" + credit.cast[k].name + "</b></h4></div></div>";
    //var actorsList = "<div class='carousel-item active'>";
    //actorsList += "<div class='col-md-3' style='float:left'>  <div class='card mb-2'> ";
    //actorsList += "<img class='card-img-top' src='" + imagePath + credit.cast[k].profile_path + "' alt='Card image cap'>";
    //actorsList += "<div class='card-body'> <h4 class='card-title'>" + credit.cast[k].name + "</h4>";
    //actorsList += "<p class='card-text'>Some text.</p></div></div></div>";
    if (k == 3) actorsList += "</div>";
    $("#actors").html(actorsList);
    k++;

    let method = "3/tv/";
    let api_key = "api_key=" + key;
    let apiCall = url + method + tvId + "/credits?" + api_key;
    ajaxCall("GET", apiCall, "", getCastSuccessCB, getCastErrorCB);
}
function getCastErrorCB(err) {
    strb += "</div> </div>";
    alert("ERROR");
}

////////////////////////////////////////////////////////////
function slide() {
    strb = "<div class='container my-4'><hr class='mb-5'/>";
    strb += "<div id='multi-item-example' class='carousel slide carousel-multi-item' data-ride='carousel'>";
    strb += "<div class='controls-top'>";
    strb += " <a class='btn-floating' href='#multi-item-example' data-slide='prev'><i class='fas fa-chevron-left'></i></a>";
    strb += "<a class='btn-floating' href='#multi-item-example' data - slide='next' > <i class='fas fa-chevron-right'></i></a >";
    strb += "</div> <div class='carousel-inner' role='listbox'>";

}

    
//var str = "<div class='carousel-item active'>";
//str += "<div class='col-md-3' style='float:left'>  <div class='card mb-2'> ";
//str += "<img class='card-img-top' src='" + imagePath + credit.cast[k].profile_path + "' alt='Card image cap'>";
//str += "<div class='card-body'> <h4 class='card-title'>" + credit.cast[k].name +"</h4>";
//str += "<p class='card-text'>Some text.</p></div></div></div>";
//if (k == 3) str += "</div>";
//    strb+="</div> </div>"
////////////////////////////////////////////////////////////
//Show the TVSohw 
function getTVSuccessCB(tv) {
    buildTvSeriese(tv);
    console.log(tv);
    $("#Episodes").html("");
    seasonsList = "<span>";
    tvId = tv.results[0].id;
    posterURL = tv.results[0].poster_path
    let poster = imagePath + posterURL;
    str = "<img src='" + poster + "'/>";
    let stars = 5;
    let popularity = tv.results[0].popularity;
    switch (true) {
        case (popularity < 40):
            stars = 1
            break;
        case (popularity < 60):
            stars = 2
            break;
        case (popularity < 200):
            stars = 3
            break;
        case (popularity < 400):
            stars = 4
            break;
    }
    str += "<img id='starsPopularity' src= '../images/" +stars + "stars.png'/>";
    $("#ph").html(str);

    let method = "3/tv/";
    let api_key = "api_key=" + key;

    let apiCall = url + method + tvId + "/season/" + i + "?" + api_key;
    ajaxCall("GET", apiCall, "", getSeasonSuccessCB, getSeasonErrorCB);
}

//create obj for sql table - in button "add" we send it to the sql table
seriesObj = null;
function buildTvSeriese(tv) {
    seriesObj = {
        Id: tv.results[0].id,
        First_air_date: tv.results[0].first_air_date,
        Name: tv.results[0].name,
        Origin_country: tv.results[0].origin_country[0],
        Original_language: tv.results[0].original_language,
        Overview: tv.results[0].overview,
        Popularity: tv.results[0].popularity,
        Poster_path: imagePath + tv.results[0].poster_path
    }
}

function getTVErrorCB(err) {
    console.log(err);
}

function getSeasonSuccessCB(season) {
    console.log(season);
    epArr = [];
    if (season.poster_path == null)
        season.poster_path = posterURL;
    seasonsList += "<div id= '" + i + "' class='card' onclick=showEpisode(this.id)>";
    seasonsList += "<img id= 'imgInCard' src='" + imagePath + season.poster_path + "'style='width:100%'>";
    seasonsList += "<h4 style='text-align:center'><b>" + season.name + "</b></h4></div>";
    if (i % 5 == 0)
        seasonsList += "</span>";

    i++;
    if (i % 5 == 1) {
        seasonsList += "<span>";
    }
    $("#seasonsList").html(seasonsList);
    let method = "3/tv/";
    let api_key = "api_key=" + key;

    let apiCall = url + method + tvId + "/season/" + i + "?" + api_key;
    ajaxCall("GET", apiCall, "", getSeasonSuccessCB, getSeasonErrorCB);
}


function getSeasonErrorCB(err) {
    if (err.status == 404) {
        seasonsList += "</span>";
        $("#seasonsList").html(seasonsList);
        console.log(err);
    }
}

function showEpisode(seasonNum) {
    j = 1;
    saveSeasonNum = seasonNum;
    episodesList = "<tr>";
    $("#Episodes").html(episodesList);
    let method = "3/tv/";
    let api_key = "api_key=" + key;

    apiCall = url + method + tvId + "/season/" + seasonNum + "/episode/" + j + "?" + api_key;
    ajaxCall("GET", apiCall, "", getEpisodeSuccessCB, getEpisodeErrorCB);
}

c = 0;
episode = null;
function getEpisodeSuccessCB(episodes) {
    episode = {
        EpisodeId: episodes.id,
        SeriesId: seriesObj.Id,//foreign key
        SeriesName: seriesObj.Name,
        SeasonNum: episodes.season_number,
        EpisodeName: episodes.name,
        ImageURL: imagePath + episodes.still_path,
        Overview: episodes.overview,
        AirDate: episodes.air_date
    }

    epArr.push(episode);    //מערך של כל הפרקים
    episodesList += "<td class='card2'><img class= 'imgCard' id='" + j + "' src='" + imagePath + episodes.still_path + "'>";
    episodesList += "<div id='episodeBlock'><br><b id='episodeTitle'>" + (episodes.name).slice(0, 17);
    episodesList += "</b></br> " + episodes.air_date + "</br></br><div id='episodeOverView'>" + episodes.overview + "</div></div>";
    if (localStorage.user != undefined) {
        episodesList += "</br><button class='addBtn' id='" + c + "' type='button' onclick=PostToServer(epArr[this.id])> Add </button> </center>";
    }
    episodesList += "</td>";
    //if ((c + 1) % 4 == 0)
    //    episodesList += "</tr>";

    c++;
    //if ((c + 1) % 4 == 1) {
    //    episodesList += "<tr>";
    //}

    $("#Episodes").html(episodesList);
    j++;
    let method = "3/tv/";
    let api_key = "api_key=" + key;
    let apiCall = url + method + tvId + "/season/" + saveSeasonNum + "/episode/" + j + "?" + api_key;
    ajaxCall("GET", apiCall, "", getEpisodeSuccessCB, getEpisodeErrorCB);
}

function getEpisodeErrorCB(err) {
    c = 0;
    console.log(err);
}

function PostToServer(episodeToAdd) {
    let api = "../api/Totals";
    //add new object for DB
    console.log(episodeToAdd);
    totalObj = {
        Series: seriesObj,
        Episode: episodeToAdd,
        UserId: user.Id
    }
    ajaxCall("POST", api, JSON.stringify(totalObj), postSqlSuccessCB, postSqlErrorCB);
}
function postSqlSuccessCB(feedback) {
    if (feedback == 1) //just for user
        alert("inserted");
    else
        alert("preference already exists");

}
function postSqlErrorCB() {
    alert("ERROR");
}