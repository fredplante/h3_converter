var coordToH3Form = document.getElementById('coord_to_h3');
var h3ToCoordForm = document.getElementById('h3_to_coord');


coordToH3Form.onsubmit = function(event) {
  event.preventDefault();
  const latitude = document.getElementById('latitude').value;
  const longitude = document.getElementById('longitude').value;
  const list = document.getElementById('indexes_results_list');
  const link = document.getElementById('view_coordinates_1');
  const results = document.getElementById('indexes_results');
  const invalidText = document.getElementById('invalid_coordinates');
  results.style = "display: none"
  list.innerHTML = '';
  link.href = '';
  invalidText.style = "display: none"

  let badCoordinates = false;

  for (let resolution = 0; resolution < 16; resolution++) {
    let index = h3.geoToH3(latitude, longitude, resolution);

    if (index == null) {
      badCoordinates = true;
      break;
    }

    var li = document.createElement('li');
    var result = document.createElement('strong')

    result.appendChild(document.createTextNode(index));
    li.appendChild(document.createTextNode('Resolution :' + resolution + ': '));
    li.appendChild(result);
    list.appendChild(li);
  }

  if (badCoordinates) {
    invalidText.style = "display: block"
  } else {
    const viewCoordinatesURL = 'https://www.google.com/maps/search/?api=1&query=' + latitude + ',' + longitude;
    link.href = viewCoordinatesURL;
    results.style = "display: block"
  }
}

coordToH3Form.onreset = function(event) {
  event.preventDefault();
  const results = document.getElementById('indexes_results');
  const list = document.getElementById('indexes_results_list');
  const link = document.getElementById('view_coordinates');
  const invalidText = document.getElementById('invalid_coordinates');
  results.style = "display: none"
  list.innerHTML = '';
  link.href = '';
  invalidText.style = "display: none"
}

h3ToCoordForm.onsubmit = function(event) {
  event.preventDefault();
  const index = document.getElementById('index').value;
  const invalidText = document.getElementById('invalid_index');
  const results = document.getElementById('index_result');
  const resolution = document.getElementById('index_resolution');
  const latitude = document.getElementById('index_latitude');
  const longitude = document.getElementById('index_longitude');
  const link = document.getElementById('view_coordinates_2');
  invalidText.style = 'display: none';
  results.style = "display: none"
  latitude.innerText = '';
  longitude.innerText = '';
  resolution.innerText = '';
  link.href = '';

  if (h3.h3IsValid(index)) {
    resolution.innerText = h3.h3GetResolution(index);
    const coordinates = h3.h3ToGeo(index)
    latitude.innerText = coordinates[0];
    longitude.innerText = coordinates[1];
    const viewCoordinatesURL = 'https://www.google.com/maps/search/?api=1&query=' + coordinates[0] + ',' + coordinates[1];
    link.href = viewCoordinatesURL;
    results.style = 'display: block';
  } else {
    invalidText.style = 'display: block';
  }
}

h3ToCoordForm.onreset = function(event) {
  event.preventDefault();
  const invalidText = document.getElementById('invalid_index');
  const results = document.getElementById('index_result');
  const resolution = document.getElementById('index_resolution');
  const latitude = document.getElementById('index_latitude');
  const longitude = document.getElementById('index_longitude');
  const link = document.getElementById('view_coordinates_2');
  invalidText.style = 'display: none';
  results.style = "display: none"
  latitude.innerText = '';
  longitude.innerText = '';
  resolution.innerText = '';
  link.href = '';
}
