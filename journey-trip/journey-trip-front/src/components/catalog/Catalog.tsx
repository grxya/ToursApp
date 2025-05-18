import React from 'react';
import TourCard from '@/components/cards/TourCard';
import ExcursionCard from '@/components/cards/ExcursionCard';
import { CatalogProps } from '@/types';

const Catalog: React.FC<CatalogProps> = ({ tours, excursions }) => {
  console.log('Tours data:', tours); 
  
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {tours.map((tour) => (
        <div key={tour.id} className="min-h-[400px]">
          <TourCard tour={tour} />
        </div>
      ))}
      
      {excursions.map((excursion) => (
        <div key={excursion.id} className="min-h-[300px]">
          <ExcursionCard excursion={excursion} />
        </div>
      ))}
    </div>
  );
};

export default Catalog;