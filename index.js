const initialState = {
    title: 'Narcos',
    platform: 'Netflix',
    rating: '4.5',
    id: Date.now(),
};
// Where we insert errors/success messages
const notificationEl = document.getElementById('notifications');
const createForm = document.getElementById('create-form');
const deleteBtn = document.getElementById('create-button');
const listContainer = document.getElementById('list');
const { localStorage } = window;

/**
 * Instantiate the storage and return the instance
 */
function initDB() {
    if (localStorage.length === 0 || !localStorage.getItem('store')) {
        localStorage.setItem(
            'store',
            JSON.stringify({ values: [initialState] })
        );
    }
}

/**
 * Return the current values
 */
function useValues() {
    if (localStorage.getItem('store')) {
        return JSON.parse(localStorage.getItem('store'));
    }
    // We instantiate the DB if it's empty
    initDB();
    return JSON.parse(localStorage.getItem('store'));
}

/**
 * Insert item's html
 */
function render() {
    const { values } = useValues();
    // Render
    values.map(item => {
        listContainer.innerHTML += `
      <li class="list-item">
          <p>${item.title}</p>
          <p>${item.rating}</p>
          <p>${item.platform}</p>
          <p>${item.id}</p>
      </li>
      `;
    });
}

/**
 * Create a new item and flush it
 */
function createItem(infos) {
    const { values } = useValues();
    console.info('create item call');
    const newItem = {
        title: infos.title,
        platform: infos.platform,
        rating: infos.rating,
        id: Date.now(),
    };

    localStorage.setItem(
        'store',
        JSON.stringify({
            values: [...values, newItem],
        })
    );
    window.location.reload();
}

/**
 * Find an item by it's title
 */
function readItem(title) {
    const { values } = useValues();
    return values.find(item => item.title === title);
}

/**
 * Find an item by it's title
 */
function deleteItem(id) {
    const { values } = useValues();
    const filtered = values.filter(item => item.id !== id);

    console.log({ filtered });
    localStorage.setItem('store', JSON.stringify({ values: filtered }));
    window.location.reload();
}

(() => {
    console.info('window loading');
    initDB();
    render();

    createForm.addEventListener('submit', event => {
        event.preventDefault();
        const title = event.target[0].value;
        const platform = event.target[1].value;
        const rating = event.target[2].value;
        createItem({
            title,
            platform,
            rating,
        });
    });
})();
