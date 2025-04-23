export interface OpenStreetMapPlaceDetailedInterface {
    place_id: number;
    licence: string;
    osm_type: 'node' | 'way' | 'relation';
    osm_id: number;
    lat: string;
    lon: string;
    class: string;
    type: string;
    place_rank: number;
    importance: number;
    addresstype: string;
    name: string;
    display_name: string;
    address: {
      road: string;
      neighbourhood?: string;
      town?: string;
      municipality?: string;
      county?: string;
      "ISO3166-2-lvl6"?: string;
      state?: string;
      "ISO3166-2-lvl4"?: string;
      postcode?: string;
      country: string;
      country_code: string;
    };
    boundingbox: [string, string, string, string];
  }

export type OpenStreetMapPlaceInterface = Pick<OpenStreetMapPlaceDetailedInterface,'display_name'|'address'>

export interface OpenStreetMapServiceSearchParams {
    format?:string,
    limit?:number,
}