// src/pages/Clubs.jsx
import React, { useState, useEffect } from 'react';
import { useClub } from '../context/ClubContext';
import ClubCard from '../components/ClubCard';
import Input from '../components/Input';
import './Clubs.css';

const Clubs = () => {
  const { clubs, fetchClubs, searchClubs } = useClub();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const categories = ['all', 'Lounge', 'Nightclub', 'Rooftop', 'Sports Bar', 'Pub', 'Karaoke', 'Dance Club'];

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  useEffect(() => {
    let results = clubs;

    // Search filter
    if (searchQuery) {
      results = searchClubs(searchQuery);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      results = results.filter(club => club.category === selectedCategory);
    }

    // Sort
    results = [...results].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredClubs(results);
  }, [clubs, searchQuery, selectedCategory, sortBy, searchClubs]);

  return (
    <div className="clubs-page">
      <div className="container">
        {/* Header */}
        <div className="clubs-header">
          <h1>Explore Clubs</h1>
          <p>Discover the best nightlife experiences in your city</p>
        </div>

        {/* Search and Filters */}
        <div className="clubs-filters">
          <div className="row">
            <div className="col-lg-6">
              <Input
                type="text"
                placeholder="Search clubs by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon="fas fa-search"
              />
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="filter-group">
                <label className="filter-label">Category</label>
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="filter-group">
                <label className="filter-label">Sort By</label>
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="rating">Highest Rating</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-info">
          <p>
            Showing {filteredClubs.length} of {clubs.length} clubs
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Clubs Grid */}
        {filteredClubs.length > 0 ? (
          <div className="row">
            {filteredClubs.map(club => (
              <div key={club.id} className="col-lg-4 col-md-6 mb-4">
                <ClubCard club={club} />
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">
              <i className="fas fa-search"></i>
            </div>
            <h3>No clubs found</h3>
            <p>Try adjusting your search or filters</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Quick Categories */}
        <div className="quick-categories">
          <h4>Browse by Category</h4>
          <div className="category-tags">
            {categories.filter(cat => cat !== 'all').map(category => (
              <button
                key={category}
                className={`category-tag ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clubs;