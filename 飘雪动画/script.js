(function() {
  let speedSlider = document.querySelector("#range-slider");
  let speedValue = speedSlider.value;
  let snow = document.querySelectorAll("#snowbanner .snow");
  let snowSwitch = true;

  speedSlider.addEventListener("input", function() {
    speedValue = speedSlider.value;
    setSeconds();
  });

  function setSeconds() {
    let seconds = (100 - speedValue) * 0.2;
    if (seconds < 0.5) {
      seconds = 0.5;
    }

    seconds >= 20 ? (snowSwitch = false) : (snowSwitch = true);

    snow.forEach(element => {
      element.style.WebkitAnimationDuration = `${seconds}s`;
      element.style.animationDuration = `${seconds}s`;

      if (snowSwitch) {
        element.style.WebkitAnimationIterationCount = "infinite";
        element.style.animationIterationCount = "infinite";
        element.style.opacity = "1";
      } else {
        element.style.WebkitAnimationIterationCount = "1";
        element.style.animationIterationCount = "1";
        element.style.opacity = "0";
      }
    });
  }
  setSeconds();
})();