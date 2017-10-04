document.addEventListener('DOMContentLoaded', function() {
  console.log('main.js is connected!');

document.getElementById('submit').addEventListener('click', makeCall);

document.getElementById('input').addEventListener('click', clearInput);
function clearInput(){
  document.getElementById('input').value = "";
    }
//When enter is pressed
document.addEventListener("keydown", function(event) {
  if(event.keyCode == 13){
    document.getElementById('submit').click();
  }
})
//When submit is clicked...
function makeCall(){
  console.log('getting data...')
  console.log(input.value);

  document.getElementById('container').classList.remove('container');
  //clear main div each time submit is clicked again
  let data = document.getElementById('data');
  data.innerHTML = '';

  function changeColor(){
    let colors = ['#5EC1FF', '#FFE45E', '#FFFEA0',
    '#C5EC39', '#EB39EC', '#9038FF', '#38FF98', '#FC00FF'];
      document.body.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
  }
  changeColor();

  // document.body.style.backgroundColor = "#5EC1FF";

  $.ajax({
    url: `http://api.openweathermap.org/data/2.5/weather?zip=${input.value},us&units=imperial&appid=710e4cdeb4739917d8e8a0e3673f3211`,
    method: 'GET',
    success: function(data){
      console.log(data);
      getData(data);
    },
    error: function(){
      document.getElementById('input').value = '';
      let error = document.createElement('div');
      error.id = 'error';
      document.getElementById('data').append(error);
      document.getElementById('error').innerText = 'Enter a valid zipcode';
    }
  })
}

//When makeCall is called getData is called
function getData(data){
  let cityName = data.name;
  let temperature = data.main.temp;
  let minTemp = data.main.temp_min;
  let maxTemp = data.main.temp_max;
  let weather = data.weather[0].description;
  //check docs to write if statment to print weather description in a sentence.
  function appendData(){
    console.log(cityName);

    document.getElementById('max-min').innerHTML = '';
    document.getElementById('title').innerText = '';

    let city = document.createElement('div');
    city.id = 'city'
    city.innerText = cityName;
    document.getElementById('data').append(city);

    let mainTemp = document.createElement('div');
    mainTemp.id = 'mainTemp';
    mainTemp.innerHTML = `${Math.round(temperature)}<span>\&#176</span>`;
    if(mainTemp > 90){
      mainTemp.style.color='red';
    } else if(mainTemp < 40){
      mainTemp.style.color='blue';
    }
    document.getElementById('data').append(mainTemp);

    let message = document.createElement('div');
    message.innerText = `${weather}`;
    message.id = 'message';
    document.getElementById('data').append(message);

    let min = document.createElement('div');
    min.id = 'min';
    document.getElementById('max-min').append(min);
    min.innerHTML = `<p>Min</p></br><h1>${Math.round(minTemp)}\&#176</h1>`;

    let max = document.createElement('div');
    max.id = 'max';
    document.getElementById('max-min').append(max);
    max.innerHTML = `<p>Max</p></br><h1>${Math.round(maxTemp)}\&#176</h1>`;

  }
  appendData();

  document.getElementById('input').value = '';


};

}, false);
