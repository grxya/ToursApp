import React, { useState } from 'react';
import Modal from '@/components/modal/BasicModal';
import { ExcProps } from '@/types';
import RedirectToRegister from '../navigation/RedirectToRegister';
import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';

const ExcursionCard: React.FC<ExcProps> = ({ excursion }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleBuyClick = () => {
    if (isAuthenticated) {
      console.log('User is authenticated, buy button clicked.');
    }
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-2xl overflow-hidden w-full sm:w-[300px] flex flex-col h-full">
      <div className="w-full h-48 relative">
  <Image
    src={excursion.image}
    alt={excursion.title}
    fill
    className="object-cover rounded-t-2xl"
    sizes="100vw"
  />
</div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="mb-2 min-h-[3rem]">
            <h3 className="text-lg font-semibold line-clamp-2 break-words text-gray-900">
              {excursion.title || 'Excursion title'}
            </h3>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-red-600 font-bold text-lg">${excursion.price}</p>
            <p className="text-gray-600 text-sm">
              {excursion.date || 'Date not specified'}
            </p>
            <p className="text-sm text-gray-500">People: {excursion.peopleCount}</p>
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
        title={excursion.title}
      >
        <div className="text-gray-900 space-y-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="font-semibold">Price:</p>
              <p className="text-red-600 font-bold text-xl">${excursion.price}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">
                {excursion.date || 'Date not specified'}
              </p>
            </div>
          </div>

          <div>
            <p className="text-gray-500">People: {excursion.peopleCount}</p>
          </div>

          {excursion.description && (
            <div>
              <p className="font-semibold mb-2">Description:</p>
              <p className="mb-4">{excursion.description}</p>
            </div>
          )}

          {isAuthenticated ? (
            <button
              onClick={handleBuyClick}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 w-full mt-4"
            >
              Buy now for ${excursion.price}
            </button>
          ) : (
            <RedirectToRegister>
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 w-full mt-4">
                Buy now for ${excursion.price}
              </button>
            </RedirectToRegister>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ExcursionCard;
