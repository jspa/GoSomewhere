	var map;
	var markersArray = [];
	var myLat;
	var myLng;


	// onError Callback receives a PositionError object
	//
	function onError(error) {
		alert('code: '    + error.code    + '\n' +
			  'message: ' + error.message + '\n');
	}

	function initialize() {
		var onSuccess = function(position) {
		myLat = position.coords.latitude;
		myLng = position.coords.longitude;
		var myLoc = new google.maps.LatLng(myLat, myLng);
		var mapOptions = {
		zoom: 15,
		center: myLoc,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
	  map =  new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

	  google.maps.event.addListener(map, 'click', function(event) {
		addMarker(event.latLng, 1);
	  });
		addMarker(myLoc);
		
		for(var i=0; i<myData.data.length; i++){
			var markerLat = myData.data[i].place.location.latitude;
			var markerLng = myData.data[i].place.location.longitude;
			var markerLoc = new google.maps.LatLng(markerLat, markerLng);
			addMarker(markerLoc, 2);
		}
		
		for(var j=0; j<myData2.data.length; j++){
			var markerLat2 = myData2.data[j].place.location.latitude;
			var markerLng2 = myData2.data[j].place.location.longitude;
			var markerLoc2 = new google.maps.LatLng(markerLat2, markerLng2);
			addMarker(markerLoc2, 1);
		}
		
	};
		//  var myLoc = new google.maps.LatLng(49.283, -123.104);

		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}
	
	var markerimage = ['red.png', 'blue.png', 'yellow.png'];
	
	
	function addMarker(location, markertype) {
	  marker = new google.maps.Marker({
		position: location,
		title: name,
		map: map,
		icon: markerimage[markertype]
	  });
	  markersArray.push(marker);
	}

	// Removes the overlays from the map, but keeps them in the array
	function clearOverlays() {
	  if (markersArray) {
		for (i in markersArray) {
		  markersArray[i].setMap(null);
		}
	  }
	}

	// Shows any overlays currently in the array
	function showOverlays() {
	  if (markersArray) {
		for (i in markersArray) {
		  markersArray[i].setMap(map);
		}
	  }
	}

	// Deletes all markers in the array by removing references to them
	function deleteOverlays() {
	  if (markersArray) {
		for (i in markersArray) {
		  markersArray[i].setMap(null);
		}
		markersArray.length = 0;
	  }
	}

