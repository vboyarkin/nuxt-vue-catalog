<template>
  <div class="container">
    <FilterPanel class="filter-panel" />
    <ProductList class="item-list" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
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
