/**
 * Created by grahambass on 10/2/14.
 */
var directionsDisplay,
    myLat,
    myLong,
    directionsService = new google.maps.DirectionsService();

function initialize(mapOptions) {
    directionsDisplay = new google.maps.DirectionsRenderer();
    mapOptions = mapOptions || {
    zoom: 9,
    center: new google.maps.LatLng(34.167517,-118.077090)
    };
    var map = new google.maps.Map(document.getElementById('map-panel'), mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));
}
function getLocation () {
    navigator.geolocation.getCurrentPosition(foundLocation, noLocation);
    }
function foundLocation(position) {
    myLat = position.coords.latitude;
    myLong= position.coords.longitude;
    calcRoute();
    }
function noLocation() {
    alert('Could not find location');
    switchView('#g2iStartPoint');
    }
function calcRoute() {
    var start = new google.maps.LatLng(myLat,myLong),
    end = new google.maps.LatLng(34.167517,-118.077090),
    request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}
function switchView(view) {
    var controller = "#" + $(view).attr('name');
    $('.mControl').removeClass('active');
    $(controller).addClass('active');
    $('.g2iViewPanel').removeClass('shown');
    $(view).addClass('shown');
}
$(window).load( function() {
    initialize();
    $('.mControl').on('click', function() {
        switchView($(this).data('panel'));
    });
    $('#getDir').on('click', getLocation() );
    $('#g2iStartPointForm').on('submit', function(event){
        event.preventDefault();
    });
});
