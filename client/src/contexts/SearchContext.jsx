//src>contexts>SearchContext.jsx

import  { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const useSearchContext = () => {
    return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [submittedSearchQuery, setSubmittedSearchQuery] = useState('');

    const value = {
        searchQuery,
        setSearchQuery,
        submittedSearchQuery,
        setSubmittedSearchQuery
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

