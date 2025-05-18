import React from 'react';
import { Tour, Excursion } from '@/types';

export interface User {
    nickname: string;
    email: string;
  }

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    authenticate: (user: User, token: string) => void;
    logout: () => void;
    loadUserFromStorage: () => void;
  }

export interface Review {
    id: number;
    name: string;
    origin: string;
    tour: string;
    country: "Azerbaijan" | "Japan";
    comment: string;
    rating: number;
    date: string;
  }

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }

export interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    availableTours: Tour[];
    availableExcursions: Excursion[];
  }