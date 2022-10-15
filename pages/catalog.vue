<template>
  <div class="container">
    <FilterPanel :is-fetching="isLoadingFilters" class="filter-panel" />
    <ProductList :is-fetching="isLoadingProducts" class="item-list" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      isLoadingFilters: true
    }
  },
  async fetch() {
    await this.$store.dispatch('products/fetchFilters')
    this.isLoadingFilters = false
    await this.$store.dispatch('products/fetchProducts')
  },
  computed: {
    isLoadingProducts() {
      return this.$fetchState.pending
    }
  },
  methods: {
    ...mapActions(['products/fetchProducts'])
  }
}
</script>

<style lang="sass" scoped>
.container
  display: grid
  grid-template-columns: 300px

.filter-panel
  grid-column: 1
  margin-left: 1rem

.item-list
  grid-column: 2
</style>
