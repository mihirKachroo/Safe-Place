<?php
// Check for empty fields
if(empty($_POST['name']) || empty($_POST['email']) || empty($_POST['phone']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
  http_response_code(500);
  exit();
}

$name = strip_tags(htmlspecialchars($_POST['name']));

// We define our address
$address = strip_tags(htmlspecialchars($_POST['name']));
echo"<PRE>";
print_r(get_lat_long($address));

// function to get  the address
function get_lat_long($address) {
   $array = array();
   $geo = file_get_contents('http://maps.googleapis.com/maps/api/geocode/json?address='.urlencode($address).'&sensor=false');

   // We convert the JSON to an array
   $geo = json_decode($geo, true);

   // If everything is cool
   if ($geo['status'] = 'OK') {
      $latitude = $geo['results'][0]['geometry']['location']['lat'];
      $longitude = $geo['results'][0]['geometry']['location']['lng'];
      $array = array('lat'=> $latitude ,'lng'=>$longitude);
   }

   return $array;
}