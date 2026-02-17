
export const MENU_VERSION = '1.2';

export const INITIAL_MENU = [
    { id: 1, name: 'Idly', price: 40, category: 'Breakfast', image: '/images/idly.png' },
    { id: 2, name: 'Vadai', price: 10, category: 'Breakfast', image: '/images/poori.png' }, // Swapped for testing mismatch
    { id: 3, name: 'Poori', price: 60, category: 'Breakfast', image: '/images/vadai.png' }, // Swapped for testing mismatch
    { id: 4, name: 'Pongal', price: 50, category: 'Breakfast', image: '/images/pongal.png' },
    { id: 5, name: 'Chicken Tandoori', price: 250, category: 'Starters', image: '/images/chicken tandoori.jpg' },
];

export const saveToStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error('Error saving to storage:', e);
        // If it's a quota error, we might want to alert the user
        if (e.name === 'QuotaExceededError') {
            alert('Storage full! The image might be too large. Try a smaller image or a URL.');
        }
    }
};

export const getFromStorage = (key, defaultData) => {
    try {
        const data = localStorage.getItem(key);
        if (data === null || data === 'undefined' || data === 'null') return defaultData;
        const parsed = JSON.parse(data);
        return Array.isArray(defaultData) && !Array.isArray(parsed) ? defaultData : parsed;
    } catch (e) {
        console.error('Error reading from storage:', e);
        return defaultData;
    }
};
