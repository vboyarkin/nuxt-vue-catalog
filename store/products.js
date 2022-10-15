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
})

export const getters = {
  products: (s) => s.products,
  appliedFilters: (s) => s.appliedFilters,
  filters: (s) => s.filters,
}

export const actions = {
  async fetchProducts({ getters, commit }, page = 1) {
    try {
      const { appliedFilters, filters } = getters

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

      // TODO: do i need this?
      // if (json.length === 0) dispatch(updateCanLoadMoreProducts(false))
      // else dispatch(updateCanLoadMoreProducts(true))

      await devTimeout()

      commit('addProductsPage', { products: json, pagesLoaded: query.page })
    } catch (err) {
      console.error('Failed to fetch products from API:')
      console.error(err)
    }
  },

  async fetchFilters({ commit }) {
    try {
      const res = await fetch(process.env.REST_API_URL + 'filters')
      const filters = await res.json()

      await devTimeout()

      commit('updateFilters', filters)
      commit('resetAppliedFilters')
    } catch (err) {
      console.error('Failed to fetch filters from API:')
      console.error(err)
    }
  },

  applyFilters({ commit }, newFilters) {
    commit('updateAppliedFilters', newFilters)
  },
}

export const mutations = {
  addProductsPage(state, { products, pagesLoaded }) {
    state.pagesLoaded = pagesLoaded
    state.products = state.products.concat(products)
  },

  updateFilters(state, newFilters) {
    state.filters = newFilters
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
}
