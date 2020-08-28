var oBtn = document.getElementById('btn');
var oW, oLeft;
var oSlider = document.getElementById('slider');
var oTrack = document.getElementById('track');
var oIcon = document.getElementById('icon');
var oSpinner = document.getElementById('spinner');
var wrapWidth = document.querySelector('.form-wrap').offsetWidth
var flag = 1;
const offsetWidth = 20 //两侧偏移量
oBtn.addEventListener('touchstart', function(e) {
    // console.log(e);
    if (flag == 1) {
        console.log(e);
        var touches = e.touches[0];
        oW = touches.clientX - oBtn.offsetLeft;
        oBtn.className = "button";
        oTrack.className = "track";
    }
}, false);
oBtn.addEventListener("touchmove", function(e) {
    if (flag == 1) {
        var touches = e.touches[0];
        oLeft = touches.clientX - oW;
        // console.log((wrapWidth - oBtn.offsetWidth), oLeft);
        if (oLeft < 0) {
            oLeft = 0;
        } else if (oLeft > wrapWidth - oBtn.offsetWidth - offsetWidth) {
            oLeft = (wrapWidth - oBtn.offsetWidth - offsetWidth);
        }
        oBtn.style.left = oLeft + "px";
        oTrack.style.width = oLeft + 'px';
    }
}, false);
oBtn.addEventListener("touchend", function() {
    if (oLeft >= (oSlider.clientWidth - oBtn.clientWidth)) {
        oBtn.style.left = (wrapWidth - oBtn.offsetWidth - offsetWidth);
        oTrack.style.width = (wrapWidth - oBtn.offsetWidth - offsetWidth);
        oIcon.style.display = 'none';
        oSpinner.style.display = 'block';
        flag = 0;
    } else {
        oBtn.style.left = 0;
        oTrack.style.width = 0;
    }
    oBtn.className = "button-on";
    oTrack.className = "track-on";
    document.querySelector('.bg-green').innerHTML = '验证通过'
    // console.log(flag);
    virifyFlag = flag
}, false);