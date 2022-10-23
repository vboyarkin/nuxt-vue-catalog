export default () => ({
  products: [],
  filters: {
    category: [],
    discount: [],
    price: {
      min: null,
      max: null,
    },
  },
  filtersToApply: {
    category: [],
    discount: null,
    price: {
      min: null,
      max: null,
    },
    limit: 6,
  },
  appliedFilters: {
    category: [],
    discount: null,
    price: {
      min: null,
      max: null,
    },
    limit: 6,
  },
  pagesLoaded: 0,
  canLoadMorePages: true,
  isFetchingProducts: false,
  categoriesTextFilter: '',
})
