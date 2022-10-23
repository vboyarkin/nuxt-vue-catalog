async function devTimeout() {
  if (process.env.NODE_ENV === 'development')
    await new Promise((resolve) => {
      setTimeout(resolve, 700)
    })
}

export const state = () => ({
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

export const getters = {
  products: (s) => s.products,
  filters: (s) => s.filters,
  filtersToApply: (s) => s.filtersToApply,
  appliedFilters: (s) => s.appliedFilters,
  pagesLoaded: (s) => s.pagesLoaded,
  canLoadMorePages: (s) => s.canLoadMorePages,
  categoriesTextFilter: (s) => s.categoriesTextFilter,
  isFetchingProducts: (s) => s.isFetchingProducts,
}

export const actions = {
  async fetchProductsNextPage({ getters, commit }, page) {
    try {
      const {
        appliedFilters,
        filters,
        pagesLoaded,
        canLoadMorePages,
        isFetchingProducts,
      } = getters
      if (!canLoadMorePages || isFetchingProducts) return

      commit('updateIsFetchingProducts', true)

      page = page || pagesLoaded + 1

      let categories = appliedFilters.category
        .filter((x) => x.checked)
        .map((x) => x.option)

      if (categories.length === 0)
        categories = filters.category.map((x) => x.option)

      const query = {
        category: categories,
        discount: appliedFilters.discount || '',
        minPrice: appliedFilters.price.min || '',
        maxPrice: appliedFilters.price.max || '',
        page: page < 1 ? 1 : page,
        limit: appliedFilters.limit < 5 ? 5 : appliedFilters.limit,
      }

      const params = [
        ...query.category.map((x) => ['category', x]),
        ['minPrice', query.minPrice],
        ['maxPrice', query.maxPrice],
        ['discount', query.discount],
        ['page', query.page],
        ['limit', query.limit],
      ]
        .filter((x) => x[1])
        .map((x) => `${x[0]}=${x[1]}`)
        .join('&')

      const url = process.env.REST_API_URL + 'products?' + params
      const res = await fetch(url)
      const json = await res.json()

      await devTimeout()

      if (json.length === 0) commit('updateCanLoadMorePages', false)

      commit('addProductsPage', { products: json, pagesLoaded: query.page })
    } catch (err) {
      console.error('Failed to fetch products from API:')
      console.error(err)
    } finally {
      commit('updateIsFetchingProducts', false)
    }
  },

  async fetchFilters({ commit }) {
    try {
      const res = await fetch(process.env.REST_API_URL + 'filters')
      const filters = await res.json()

      await devTimeout()

      commit('updateFilters', filters)
      commit('resetAppliedFilters')
      commit('resetFiltersToApply')
    } catch (err) {
      console.error('Failed to fetch filters from API:')
      console.error(err)
    }
  },

  updateFiltersToApply({ commit }, newFilters) {
    commit('updateFiltersToApply', newFilters)
  },

  applyFilters({ commit, dispatch, getters }) {
    if (getters.isFetchingProducts) return

    commit('updateAppliedFilters', getters.filtersToApply)
    dispatch('clearAndReloadProducts')
  },

  resetFilters({ commit, dispatch, getters }) {
    if (getters.isFetchingProducts) return

    commit('resetAppliedFilters')
    commit('resetFiltersToApply')
    commit('updateCategoriesTextFilter', '')
    dispatch('clearAndReloadProducts')
  },

  clearAndReloadProducts({ commit, dispatch }) {
    commit('clearProducts')
    dispatch('fetchProductsNextPage')
  },
}

export const mutations = {
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
