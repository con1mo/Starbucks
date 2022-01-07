//youtube iframe api - 유튜브 동영상 삽입을 위한 스크립트
//매개변수 정보 : https://developers.google.com/youtube/player_parameters.html?playerVersion=HTML5&hl=ko#Parameters

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'An6LvWQuj_8',
        playerVars: {
            autoplay: true,
            loop: true,
            playlist: 'An6LvWQuj_8' // 반복 재생할 유튜브 영상 ID
        },
        events : {
            onReady: function (event) {
                event.target.mute() // 음소거
            }
        }
    });
}