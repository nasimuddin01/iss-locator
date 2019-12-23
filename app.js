// declaring dom varible
let latitude = document.querySelector("#lat");
let longitude = document.querySelector("#lon");

// calling api request
fetch("http://api.open-notify.org/iss-now.json")
  .then(res => res.json())
  .then(data => data.iss_position)
  .then(data => {

    let x = parseFloat(data.latitude);
    let y = parseFloat(data.longitude);

    // changing dom latitude & longitude value
    latitude.innerHTML = `Latitude: ${x}`;
    longitude.innerHTML = `Longitude: ${y}`;

    // making map
    let baseMapLayer = new ol.layer.Tile({
      source: new ol.source.OSM()
    });
    let map = new ol.Map({
      target: 'map',
      layers: [baseMapLayer],
      view: new ol.View({
        center: ol.proj.fromLonLat([y, x]),
        zoom: 4 //Initial Zoom Level
      })
    });
    // making map marker
    let marker = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([y, x])
      ), // Cordinates of ISS
    });

    marker.setStyle(new ol.style.Style({
      image: new ol.style.Icon( ({
        color: 'rgba(255,255,255,0)',
        crossOrigin: '',
        src: 'https://raw.githubusercontent.com/nasimuddin01/iss-tracker/master/iss-new.png'
      }))
    }));

    let vectorSource = new ol.source.Vector({
      features: [marker]
    });
    let markerVectorLayer = new ol.layer.Vector({
      source: vectorSource,
    });
    map.addLayer(markerVectorLayer);

  });
