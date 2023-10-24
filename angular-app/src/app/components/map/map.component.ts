import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { marker, tileLayer, map, Icon, layerGroup } from 'leaflet';
import { Observable } from 'rxjs';
import { IQueryByYear } from 'src/app/interfaces/query.interface';
import { CommonService } from 'src/app/services/common.service';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'] 
})
export class MapComponent  implements OnInit, OnChanges {
  @Input() selectedYear!: number;
  errorMessage?: string;
  unplottableData?: IQueryByYear[];
  private map: any;
  private markerLayer: any;

  constructor(private readonly queryService: QueryService, private readonly commonService: CommonService) {}

  /**
   * initialize the MapComponent
   */
  
  ngOnInit() {
    Icon.Default.imagePath = 'assets/images/';
    this.initializeMap();
  }

  /**
   * listen to the change in selectedYear Input property of the parent component
   * @param changes: SimpleChanges
   */
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes['selectedYear'].currentValue && changes['selectedYear'].currentValue !== changes['selectedYear'].previousValue) {
      this.fetchAccidentData().subscribe((accidentData: any) => {
        this.addMarkers(accidentData)
      }, (error) => {
        this.commonService.setError(error.message);
      })
    }
  }

  /**
   * initializes the leaflet map
   */
  private initializeMap(): void {
    this.map = map('accident-map').setView([0, 0], 2);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
    this.markerLayer = layerGroup().addTo(this.map);
  }

  /**
   * fetch accident data from the API for the selected year
   * @returns Observable<IQueryByYear[]>
   */
  private fetchAccidentData(): Observable<IQueryByYear[]> {
    return this.queryService.getAccidentDataByYear(this.selectedYear);
  }

  /**
   * add markers on the map for the given coordinates
   * @param accidentData: IQueryByYear[]
   */
  private addMarkers(accidentData: IQueryByYear[]): void {
    this.unplottableData = [];
    this.markerLayer.clearLayers();
    accidentData.forEach((accident: IQueryByYear) => {
      if(accident.Latitude === null || accident.Longitude === null) {
        this.unplottableData?.push(JSON.parse(JSON.stringify(accident)));
      } else {
        const description = this.getMarkerDescriptionData(accident);
        const mapMarker = marker([accident.Latitude, accident.Longitude]).addTo(this.map);
        mapMarker.bindPopup(`<b>${accident.Country || accident.Location}</b><br><br>${description}`);
        this.markerLayer.addLayer(mapMarker);
      }
    });
  }

  /**
   * create the tooltip description
   * @param data: IQueryByYear
   * @returns string
   */
  private getMarkerDescriptionData(data: IQueryByYear): string {
    const descriptionDataset = this.getNonNullDescriptionData(
      ['Location', 'Total Fatal Injuries', 'Total Serious Injuries', 'Total Minor Injuries', 'Total Uninjured'],
      [data.Location, data['Total.Fatal.Injuries'], data['Total.Serious.Injuries'], data['Total.Minor.Injuries'], data['Total.Uninjured']]
    );
    return descriptionDataset.join('<br>');
  }

  /**
   * create the proper tooltip text item by eliminating null values
   * @param label: string[]
   * @param data: any[]
   * @returns any[]
   */
  private getNonNullDescriptionData(label: string[], data: any[]): any[] {
    return label.map((l, i) => {
      if(data[i]) {
        return `<b>${l}</b>: ${data[i]}`
      } else {
        return null;
      }
    }).filter(v => v) 
  }
}