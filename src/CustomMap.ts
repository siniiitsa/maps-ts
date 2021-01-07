export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  getMarkerContent(): string;
  color?: string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      },
    });
  }

  addMarker(mappableItem: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappableItem.location.lat,
        lng: mappableItem.location.lng,
      },
    });

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappableItem.getMarkerContent(),
      });

      infoWindow.open(this.googleMap, marker);
    });
  }
}
