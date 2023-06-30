import { useState, useEffect } from 'react';

export default function SelectorButton() {
  const [selectedButtons, setSelectedButtons] = useState([false, false, false]);
  const [searchQuery, setSearchQuery] = useState({ query1: '', query2: '', query3: '' });

  const handleSelection = (index: number, query: string, queryKey: string) => {
    setSelectedButtons(prevSelectedButtons => {
      const updatedButtons = [...prevSelectedButtons];
      updatedButtons[index] = !updatedButtons[index];

      // Check if all buttons are true
      if (updatedButtons.every(button => button)) {
        // Set all buttons to false and clear the search queries
        setSearchQuery({ query1: '', query2: '', query3: '' });
        return [false, false, false];
      }

      setSearchQuery(prevQuery => ({
        ...prevQuery,
        [queryKey]: prevQuery[queryKey] === query ? '' : query,
      }));

      return updatedButtons;
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set('f', Object.values(searchQuery).filter(Boolean).join(','));

    // Use the searchParams as needed (e.g., update the URL)

    // Example: Update the URL
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, '', newUrl);

    // You can also perform other actions based on the updated search query

  }, [searchQuery]);

  return (
    <>
      <button
        onClick={() => handleSelection(0, 'by you', 'query1')}
        className={selectedButtons[0] ? 'btn join-item btn-primary' : 'btn join-item'}
      >
        by you
      </button>

      <button
        onClick={() => handleSelection(1, 'by others', 'query2')}
        className={selectedButtons[1] ? 'btn join-item btn-primary' : 'btn join-item'}
      >
        by others
      </button>

      <button
        onClick={() => handleSelection(2, 'by spotify', 'query3')}
        className={selectedButtons[2] ? 'btn join-item btn-primary' : 'btn join-item'}
      >
        by spotify
      </button>
    </>
  );
}
