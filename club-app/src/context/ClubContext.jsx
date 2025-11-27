// src/context/ClubContext.jsx
import React, { createContext, useState, useContext } from 'react';

const ClubContext = createContext();

export const useClub = () => {
  const context = useContext(ClubContext);
  if (!context) {
    throw new Error('useClub must be used within a ClubProvider');
  }
  return context;
};

export const ClubProvider = ({ children }) => {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);

  // Mock data for clubs
  const mockClubs = [
    {
      id: 1,
      name: 'Neon Lounge',
      image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=500',
      rating: 4.5,
      category: 'Lounge',
      distance: '1.2 km',
      description: 'Upscale lounge with premium cocktails and VIP service',
      address: '123 Downtown Street',
      phone: '+1 234 567 8900',
      menu: {
        drinks: [
          { id: 1, name: 'Signature Mojito', price: 12, category: 'Cocktail', image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=300' },
          { id: 2, name: 'Whiskey Sour', price: 14, category: 'Cocktail', image: 'https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?w=300' },
          { id: 3, name: 'Craft Beer', price: 8, category: 'Beer', image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300' }
        ],
        food: [
          { id: 4, name: 'Chicken Wings', price: 16, category: 'Appetizer', image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=300' },
          { id: 5, name: 'Truffle Fries', price: 12, category: 'Appetizer', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300' }
        ]
      },
      reviews: [
        { user: 'Sarah M.', rating: 5, comment: 'Amazing atmosphere and great drinks!' },
        { user: 'Mike T.', rating: 4, comment: 'Good service, will come back again.' }
      ]
    },
    {
      id: 2,
      name: 'Sky Bar',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
      rating: 4.8,
      category: 'Rooftop',
      distance: '2.1 km',
      description: 'Rooftop bar with stunning city views and exotic cocktails',
      address: '456 Sky Avenue',
      phone: '+1 234 567 8901',
      menu: {
        drinks: [
          { id: 6, name: 'Skyline Martini', price: 16, category: 'Cocktail', image: 'https://images.unsplash.com/photo-1590701833281-e6283af0948d?w=300' },
          { id: 7, name: 'Tropical Punch', price: 13, category: 'Cocktail', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300' }
        ],
        food: [
          { id: 8, name: 'Beef Sliders', price: 18, category: 'Appetizer', image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300' }
        ]
      },
      reviews: [
        { user: 'Emma L.', rating: 5, comment: 'Best view in the city!' }
      ]
    }
  ];

  const fetchClubs = () => {
    setClubs(mockClubs);
    return mockClubs;
  };

  const fetchClubById = (id) => {
    const club = mockClubs.find(club => club.id === parseInt(id));
    setSelectedClub(club);
    return club;
  };

  const searchClubs = (query) => {
    return mockClubs.filter(club => 
      club.name.toLowerCase().includes(query.toLowerCase()) ||
      club.category.toLowerCase().includes(query.toLowerCase())
    );
  };

  const value = {
    clubs,
    selectedClub,
    fetchClubs,
    fetchClubById,
    searchClubs
  };

  return (
    <ClubContext.Provider value={value}>
      {children}
    </ClubContext.Provider>
  );
};