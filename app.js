let timer;
  let startTime;
  let pauseTimes = [];

  function startTimer() {
    if (!timer) {
      startTime = Date.now() - (pauseTimes.length > 0 ? pauseTimes.reduce((acc, val) => acc + val, 0) : 0);
      timer = setInterval(updateTimer, 10); // Update every 10 milliseconds
    }
  }

  function pauseTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
      const pauseTime = Date.now() - startTime;
      pauseTimes.push(pauseTime);
      displayPauseTimes();
    }
  }

  function resetTimer() {
    clearInterval(timer);
    timer = null;
    startTime = 0;
    pauseTimes = [];
    document.getElementById('timer').innerText = '00:00:00';
    document.getElementById('pauseTimes').innerText = '';
  }

  function deleteAll() {
    resetTimer();
    document.getElementById('pauseTimes').innerText = 'All data deleted.';
  }

  function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    document.getElementById('timer').innerText = formatTime(elapsedTime);
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${formatDigit(minutes)}:${formatDigit(seconds)}:${formatDigit(milliseconds)}`;
  }

  function formatDigit(value) {
    return value < 10 ? `0${value}` : value;
  }

  function displayPauseTimes() {
    const pauseTimesContainer = document.getElementById('pauseTimes');
    pauseTimesContainer.innerHTML = '<strong>Pause Times:</strong><br>';
    pauseTimes.forEach((pauseTime, index) => {
      pauseTimesContainer.innerHTML += `${index + 1}. ${formatTime(pauseTime)}<br>`;
    });
  }