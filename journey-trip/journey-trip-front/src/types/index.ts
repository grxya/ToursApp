import { ReactNode } from 'react';

export type Star = {
    id: number;
    top: string;
    left: string;
    size: number;
  };

  export type Excursion = {
    id: string
    title: string
    image: string
    description: string
    price: number
    date: string
    peopleCount: number
  }
  
  export type Tour = {
    id: string
    title: string
    image: string
    description: string
    price: number
    startDate: string
    days: number
    excursions?: Excursion[]
    included: string[] 
    peopleCount: number
  }  
  
  export type TourProps = {
    tour: Tour;
  };

  export type ExcProps = {
    excursion: Excursion;
  };

  export type CatalogProps = {
    tours: Tour[];
    excursions: Excursion[];
  };

  export type BookingType = 'tour' | 'excursion' | 'both';

  export type RedirectProps = {
    children: ReactNode;
  };