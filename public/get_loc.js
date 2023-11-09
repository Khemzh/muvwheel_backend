function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
  }
  
  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        x.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
    }
  }

  var options = {
    enableHighAccuracy: true,
    timeout: 7000,
    maximumAge: 0
  };
  
  function log(data) {
    const tag = document.createElement('p');
    tag.textContent = data;
    document.body.appendChild(tag);
  }
  
  function success(pos) {
    var crd = pos.coords;
    console.log('Successfully determined a user position:', crd);
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);

  // options for current position
  const navigatorLocationOptions = {
    enableHighAccuracy: true,
    timeout: 7000,
    maximumAge: 0
  };

  // does browser have geo services enabled
  navigator.permissions.query({name:'geolocation'})
    .then((result) => {
      
      if (result.state === 'granted') {// you are good
        navigator.geolocation.getCurrentPosition(position => {
           console.log('granted user location permission', position );
            
           //.. do your stuff

        }, (error) => {
          // OS services are not enabled
          console.log('Please turn on OS located services', navigator);
          errorLocation();
        }, navigatorLocationOptions);

      } else {
        // browser issues seriveces
        console.log('Browser location services disabled', navigator);
        errorLocation();
      }
    }, (error) => {
      /* Browser doesn't support querying for permissions */
      console.log('Please turn on BROWSER location services', navigator);
      errorLocation()
    }
  );