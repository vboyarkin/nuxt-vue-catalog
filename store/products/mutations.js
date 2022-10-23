export default {
  clearProducts(state) {
    state.products = []
    state.pagesLoaded = 0
  },

  addProductsPage(state, { products, pagesLoaded }) {
    state.pagesLoaded = pagesLoaded
    state.products = state.products.concat(products)
  },

  updateFilters(state, newFilters) {
    state.filters = newFilters
  },

  updateFiltersToApply(state, newFilters) {
    state.filtersToApply = newFilters
  },

  updateAppliedFilters(state, newFilters) {
    state.appliedFilters = newFilters
  },

  resetAppliedFilters(state) {
    state.appliedFilters = {
      category: state.filters.category.map((x) => ({ ...x, checked: false })),
      discount: null,
      price: {
        min: null,
        max: null,
      },
      limit: 6,
    }
  },

  resetFiltersToApply(state) {
    state.filtersToApply = {
      category: state.filters.category.map((x) => ({ ...x, checked: false })),
      discount: null,
      price: {
        min: state.filters.price.min,
        max: state.filters.price.max,
      },
      limit: 6,
    }
  },

  updateCanLoadMorePages(state, value) {
    state.canLoadMorePages = value
  },

  updateCategoriesTextFilter(state, value) {
    state.categoriesTextFilter = value
  },

  updateIsFetchingProducts(state, value) {
    state.isFetchingProducts = value
  },
}
