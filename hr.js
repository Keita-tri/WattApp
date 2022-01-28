import HeartRateSensor from "./heartRateSensor"

device1 = new HeartRateSensor

const btn = document.getElementById('bt1')
const hrvalue = document.getElementById('hrvalue')

const btn2 = document.getElementById('bt2')
const hrvalue2 = document.getElementById('hrvalue2')


btn.addEventListener('click', function() {
    hrvalue1.textContent = 'Breathe...';
    heartRates = [];
    heartRateSensor.connect()
    .then(() => heartRateSensor.startNotificationsHeartRateMeasurement().then(handleHeartRateMeasurement))
    .catch(error => {
      statusText.textContent = error;
    });
  });
