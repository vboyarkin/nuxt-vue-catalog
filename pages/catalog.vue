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
    ...mapActions(['products/fetchProductsNextPage'])
  }
}
</script>

<style lang="sass" scoped>
.container
  display: flex
  > *
    flex-grow: 0
    flex-shrink: 0

.filter-panel
  grid-column: 1
  margin-right: 1rem
  width: 260px
</style>
