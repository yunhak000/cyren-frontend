const { kakao } = window;

export default function KakaoMapScript(lat, lng) {
  const container = document.getElementById("myMap");
  const options = {
    center: new kakao.maps.LatLng(lat, lng),
    level: 3,
  };
  const map = new kakao.maps.Map(container, options);

  map.setLevel(1);

  var markerPosition = new kakao.maps.LatLng(lat, lng);

  var marker = new kakao.maps.Marker({
    position: markerPosition,
  });

  marker.setMap(map);
}
