import React, { useState } from 'react';
import Modal from '@/components/modal/BasicModal';
import { TourProps } from '@/types';
import RedirectToRegister from '../navigation/RedirectToRegister';
import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';

const TourCard: React.FC<TourProps> = ({ tour }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const hasExcursions = tour.excursions && tour.excursions.length > 0;
  const hasIncluded = tour.included && tour.included.length > 0;

  const handleBuyClick = () => {
    if (isAuthenticated) {
      console.log('Buying tour:', tour.title);
    }
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-2xl overflow-hidden w-full sm:w-[300px] flex flex-col h-full">
      <div className="w-full h-48 relative">
  <Image
    src={tour.image}
    alt={tour.title}
    fill
    className="object-cover rounded-t-2xl"
    sizes="100vw"
  />
</div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="mb-2 min-h-[3rem]">
            <h3 className="text-lg font-semibold line-clamp-2 break-words text-gray-900">
              {tour.title || 'Tour title'}
            </h3>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-red-600 font-bold text-lg">${tour.price}</p>
            {hasExcursions && (
              <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                Includes Excursions
              </span>
            )}
            <div className="text-sm text-gray-500">People: {tour.peopleCount}</div>
          </div>

          <div className="flex justify-between gap-2 mt-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-700 text-sm flex-1"
            >
              Show more
            </button>

            {isAuthenticated ? (
              <button
                onClick={handleBuyClick}
                className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-500 text-sm flex-1"
              >
                Buy
              </button>
            ) : (
              <RedirectToRegister>
                <button className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-500 text-sm flex-1">
                  Buy
                </button>
              </RedirectToRegister>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={tour.title}
      >
        <div className="text-gray-900 space-y-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="font-semibold">Price:</p>
              <p className="text-red-600 font-bold text-xl">${tour.price}</p>
            </div>
            <div>
              <p className="font-semibold">Duration:</p>
              <p>{tour.days} days</p>
            </div>
            <div>
              <p className="font-semibold">Start Date:</p>
              <p>{tour.startDate ? new Date(tour.startDate).toLocaleDateString() : 'Not specified'}</p>
            </div>
          </div>

          <div>
            <p className="font-semibold">People:</p>
            <p>{tour.peopleCount}</p>
          </div>

          {tour.description && (
            <div>
              <p className="font-semibold mb-2">Description:</p>
              <p className="mb-4">{tour.description}</p>
            </div>
          )}

          {hasIncluded && (
            <div>
              <p className="font-semibold mb-2">What&rsquo;s included:</p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                {tour.included?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {hasExcursions && (
            <div>
              <p className="font-semibold mb-2">Excursions included:</p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                {tour.excursions?.map((exc) => (
                  <li key={exc.id}>
                    <span className="font-medium">{exc.title}</span>
                    {exc.description && ` - ${exc.description}`}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isAuthenticated ? (
            <button
              onClick={handleBuyClick}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 w-full mt-4"
            >
              Buy now for ${tour.price}
            </button>
          ) : (
            <RedirectToRegister>
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 w-full mt-4">
                Buy now for ${tour.price}
              </button>
            </RedirectToRegister>
          )}
        </div>
      </Modal>
    </>
  );
};

export default TourCard;
