const productsPerPage = 10;
let currentPage = 1;
let isLoading = false; // Флаг, чтобы предотвратить множественные загрузки
let sort = 'name', order = 'asc', isSort = false, query = '', scrollEventAttached = false;