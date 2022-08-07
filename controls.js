const video = document.getElementById('video');
const video_progress = document.querySelector('#video_progress');
const button_back = document.querySelector('.button_back');
const control = document.querySelector('.controls')
const button_next = document.querySelector('.button_next');
const fa_play = document.querySelector('.abcd');
const duration = document.getElementById('video_duration');
const current_time = document.querySelector('#current_time');
const volume_progress = document.getElementById('volume_progress');
var volg = document.querySelector('.volg');

function not(){
    if(video.classList.contains('not-play')){
        playin();
    }
    
    else if(video.classList.contains('isPlay')){
        paused();
    }
}

const paused = ()=>{
    video.classList.remove('isPlay');
    video.classList.add('not-play');
    fa_play.classList.add('fa-play');
    fa_play.classList.remove('fa-pause');
    video.pause(); 
}

const playin = ()=>{
    video.classList.remove('not-play');
    video.classList.add('isPlay');
    fa_play.classList.remove('fa-play');
    fa_play.classList.add('fa-pause');
    video.play();
} 

control.addEventListener('click',(e)=>{
    
    if(video.classList.contains('not-play')){
        playin();
    }
    
    else if(video.classList.contains('isPlay')){
        paused();
    }
    e.preventDefault();
})

volume_progress.addEventListener('input',(e)=>{

    const audio = e.target.value;
    if(e.target.value == 0){
        video.muted = true;
        volg.classList.remove('fa-volume-high')
        volg.classList.add('fa-volume-xmark');
    }
    else if(e.target.value > 0){
        video.muted = false;
        video.volume = audio / 100;
        volg.classList.remove('fa-volume-xmark')
        volg.classList.add('fa-volume-high')
    }
});

function calculateTime(drtn){
    var mint = Math.floor(drtn / 60);
    var scnd = Math.floor(drtn % 60);
    
    if(scnd<=9 & mint<=9){
        return ("0"+mint+":"+"0"+scnd);
    }

    else if(scnd>=10  &&  mint <=9){
        return ("0"+mint+":"+scnd);
    }

    else{
        return (mint+":"+scnd);
    }

    return (mint+':'+scnd);
}

video.addEventListener('loadedmetadata',()=>{
    video_progress.max = video.duration;
    current_time.textContent = calculateTime(video.duration); 
})

video.addEventListener('timeupdate',()=>{
    duration.innerText = calculateTime(video.currentTime);
    video_progress.value = video.currentTime;
})

video_progress.addEventListener('input',(e)=>{
    video.currentTime = e.target.value;
})


video.addEventListener('timeupdate',()=>{
    button_back.addEventListener('click',()=>{ 
        video.currentTime = video_progress.value-10;
    })  
})

video.addEventListener('timeupdate',()=>{
    button_next.addEventListener('click',(e)=>{
        var acx = parseFloat(video_progress.value);
            video.currentTime = acx + 10;
    })
})
