
export const MENU_VERSION = '1.2';

export const INITIAL_MENU = [
    { id: 1, name: 'Idly', price: 40, category: 'Breakfast', image: '/images/idly.png' },
    { id: 2, name: 'Vadai', price: 10, category: 'Breakfast', image: '/images/vadai.png' },
    { id: 3, name: 'Poori', price: 60, category: 'Breakfast', image: '/images/poori.png' },
    { id: 4, name: 'Pongal', price: 50, category: 'Breakfast', image: '/images/pongal.png' },
    { id: 5, name: 'Chicken Tandoori', price: 250, category: 'Starters', image: '/images/chicken tandoori.jpg' },
    { id: 6, name: 'Masala Dosa', price: 70, category: 'Breakfast', image: '/images/Masala Dosa .jpg' },
    { id: 7, name: 'Chicken Briyani', price: 180, category: 'Main course', image: '/images/chicken Briyani.jpg' },
    { id: 8, name: 'Mojito', price: 90, category: 'Beverages', image: '/images/Mojito.jpg' },
    { id: 9, name: 'Tea', price: 20, category: 'Beverages', image: '/images/tea.png' },
    { id: 10, name: 'Coffee', price: 25, category: 'Beverages', image: '/images/coffee.jpg' },
    { id: 11, name: 'Grill Chicken', price: 350, category: 'Main course', image: '/images/grill.jpg' },
    { id: 12, name: 'Shawarma', price: 120, category: 'Starters', image: '/images/shawarma.jpg' },
    { id: 13, name: 'Plain Dosa', price: 50, category: 'Breakfast', image: '/images/dosai.png' },
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
