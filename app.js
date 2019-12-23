fetch("http://api.open-notify.org/iss-now.json")
  .then(res => res.json())
  .then(data => data.iss_position)
  .then(data => {

    let x = parseFloat(data.latitude);
    let y = parseFloat(data.longitude);
    console.log(x, y);


    var baseMapLayer = new ol.layer.Tile({
      source: new ol.source.OSM()
    });
    var map = new ol.Map({
      target: 'map',
      layers: [baseMapLayer],
      view: new ol.View({
        center: ol.proj.fromLonLat([y, x]),
        zoom: 4 //Initial Zoom Level
      })
    });

    var marker = new ol.Feature({
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

    var vectorSource = new ol.source.Vector({
      features: [marker]
    });
    var markerVectorLayer = new ol.layer.Vector({
      source: vectorSource,
    });
    map.addLayer(markerVectorLayer);

  });
