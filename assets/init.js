const productsPerPage = 15, imgPath = 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEyL3JtNjA3LTNkYmQtc2NlbmUwNC1hLW1vY2t1cF8zLmpwZw.jpg';
let currentPage = 1;
let isLoading = false;
let sort = 'name', order = 'asc', query = '', selectedCategory = '';