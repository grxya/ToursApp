import React, { useState, useMemo } from 'react';
import { BookingType } from '@/types';
import { BookingModalProps } from '@/interfaces';
import RedirectToRegister from '../navigation/RedirectToRegister';

const BookingModal: React.FC<BookingModalProps> = ({
    isOpen,
    onClose,
    availableTours,
    availableExcursions,
  }) => {
    const [bookingType, setBookingType] = useState<BookingType>('tour');
    const [selectedTourId, setSelectedTourId] = useState('');
    const [selectedExcursionId, setSelectedExcursionId] = useState('');
    const [date, setDate] = useState('');
    const [people, setPeople] = useState(1);
  
    const selectedTour = availableTours.find((t) => t.id === selectedTourId);
    const selectedExcursion = availableExcursions.find((e) => e.id === selectedExcursionId);
  
    const totalPrice = useMemo(() => {
      let base = 0;
      if (bookingType === 'tour' && selectedTour) base = selectedTour.price;
      if (bookingType === 'excursion' && selectedExcursion) base = selectedExcursion.price;
      if (bookingType === 'both' && selectedTour && selectedExcursion)
        base = selectedTour.price + selectedExcursion.price;
  
      return base + people * 5;
    }, [bookingType, selectedTour, selectedExcursion, people]);
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-lg w-full relative text-black">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-800 hover:text-gray-900 text-lg">
            ✕
          </button>
  
          <h2 className="text-xl font-bold mb-4">Create Booking</h2>
  
          <div className="mb-4 space-x-2">
            <label className="text-black">
              <input
                type="radio"
                value="tour"
                checked={bookingType === 'tour'}
                onChange={() => setBookingType('tour')}
                className="mr-1"
              />
              Only Tour
            </label>
            <label className="text-black">
              <input
                type="radio"
                value="excursion"
                checked={bookingType === 'excursion'}
                onChange={() => setBookingType('excursion')}
                className="mr-1"
              />
              Only Excursion
            </label>
            <label className="text-black">
              <input
                type="radio"
                value="both"
                checked={bookingType === 'both'}
                onChange={() => setBookingType('both')}
                className="mr-1"
              />
              Tour + Excursion
            </label>
          </div>
  
          {(bookingType === 'tour' || bookingType === 'both') && (
            <div className="mb-4">
              <label className="block mb-1 font-medium text-black">Select Tour:</label>
              <select
                value={selectedTourId}
                onChange={(e) => setSelectedTourId(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded text-black"
              >
                <option value="">-- Choose a tour --</option>
                {availableTours.map((tour) => (
                  <option key={tour.id} value={tour.id} className="text-black">
                    {tour.title} (${tour.price})
                  </option>
                ))}
              </select>
            </div>
          )}
  
          {(bookingType === 'excursion' || bookingType === 'both') && (
            <div className="mb-4">
              <label className="block mb-1 font-medium text-black">Select Excursion:</label>
              <select
                value={selectedExcursionId}
                onChange={(e) => setSelectedExcursionId(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded text-black"
              >
                <option value="">-- Choose an excursion --</option>
                {availableExcursions.map((exc) => (
                  <option key={exc.id} value={exc.id} className="text-black">
                    {exc.title} (${exc.price})
                  </option>
                ))}
              </select>
            </div>
          )}
  
          <div className="mb-4">
            <label className="block mb-1 font-medium text-black">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-black"
            />
          </div>
  
          <div className="mb-4">
            <label className="block mb-1 font-medium text-black">Number of people:</label>
            <input
              type="number"
              min={1}
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
              className="w-full border border-gray-300 p-2 rounded text-black"
            />
          </div>
  
          <div className="mb-4 text-right text-lg font-semibold text-black">
            Total: {totalPrice} ₼
          </div>
  
          <RedirectToRegister>
          <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-500">
            Confirm Buying
          </button>
          </RedirectToRegister>
          
        </div>
      </div>
    );
  };
  
  export default BookingModal;