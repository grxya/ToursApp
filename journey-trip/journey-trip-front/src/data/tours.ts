import { Tour } from '@/types'
import { excursions } from './excursions'
import { japanExcursions } from './excursions'

export const tours: Tour[] = [
  {
    id: "tour1",
    title: "Discover Azerbaijan: Baku and Surroundings",
    image: "/azerbaijan/baku2.webp",
    description: "3-day journey through Baku with included excursions and accommodation.",
    price: 320,
    startDate: "2025-06-15",
    days: 3,
    included: ["3* Hotel Accommodation", "Breakfasts", "Airport Transfer", "Tour Guide"],
    excursions: [excursions[0], excursions[1]],
    peopleCount: 20
  },
  {
    id: "tour2",
    title: "Caspian Breeze and Ancient Legends",
    image: "/azerbaijan/caspian.jpg",
    description: "Enjoy the Caspian Sea coast and explore historical sites.",
    price: 270,
    startDate: "2025-06-20",
    days: 2,
    included: ["Hotel Stay", "Meals", "Transport", "Tour Guide"],
    excursions: [excursions[2]],
    peopleCount:25
  },
  {
    id: "tour3",
    title: "Relaxing Mountain Retreat",
    image: "/azerbaijan/mountain.jpeg",
    description: "A peaceful 4-day mountain retreat to relax and unwind without any excursions.",
    price: 400,
    startDate: "2025-07-10",
    days: 4,
    included: ["4* Mountain Lodge", "All Meals", "Transport"],
    peopleCount: 15
  }
]

export const japanTours: Tour[] = [
  {
    id: "tourJP1",
    title: "Cultural Wonders of Kyoto and Nara",
    image: "/japan/nara.webp",
    description: "A 4-day exploration of Japan's ancient capitals with guided tours.",
    price: 850,
    startDate: "2025-09-10",
    days: 4,
    included: ["4* Hotel", "Daily Breakfast", "Transport", "English-speaking Guide"],
    excursions: [japanExcursions[0]],
    peopleCount: 20
  },
  {
    id: "tourJP2",
    title: "Modern Tokyo and Mt. Fuji Adventure",
    image: "/japan/fuji.webp",
    description: "Discover the best of Tokyo and enjoy a day trip to Mt. Fuji.",
    price: 920,
    startDate: "2025-09-11",
    days: 5,
    included: ["4* Hotel", "Breakfast", "Excursions", "Airport Transfer"],
    excursions: [japanExcursions[1], japanExcursions[2]],
    peopleCount: 18
  },
  {
    id: "tourJP3",
    title: "Tranquil Ryokan Retreat in Hakone",
    image: "/japan/ryokan.jpg",
    description: "A peaceful 3-day stay in a traditional Japanese ryokan with hot springs. No excursions included.",
    price: 780,
    startDate: "2025-09-15",
    days: 3,
    included: ["Traditional Ryokan Stay", "Kaiseki Dinner", "Onsen Access", "Private Transfer"],
    excursions: [],
    peopleCount: 12
  }
]