import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = { width: "100%", height: "300px" };
const center = { lat: 9.9312, lng: 76.2673 }; // Default location

export default function PropertyForm({ formData, setFormData }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // replace with your key
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={{ lat: formData.lat || center.lat, lng: formData.lng || center.lng }}
      onClick={(e) =>
        setFormData({
          ...formData,
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        })
      }
    >
      {formData.lat && formData.lng && (
        <Marker position={{ lat: formData.lat, lng: formData.lng }} />
      )}
    </GoogleMap>
  );
}
