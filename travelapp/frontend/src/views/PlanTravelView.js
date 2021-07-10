import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import AuthLayout from '../components/AuthLayout';

function PlanTravelView() {
  return (
    <AuthLayout>
      <MapContainer
        style={{ height: '85vh' }}
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </AuthLayout>
  );
}

export default PlanTravelView;
