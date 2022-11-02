<template>
  <div>
    <div v-if="items && items.length !== 0" class="item-list">
      <ProductCard
        v-for="item of items"
        :key="item.id"
        class="product-card"
        :item="item"
      />
    </div>

    <div
      v-if="!isFetchingProducts && items && items.length === 0"
      class="item-list-placeholder"
    >
      <span>Нет подходящих товаров</span>
    </div>

    <Loader v-if="isFetchingProducts && canLoadMorePages" size="large" />

    <client-only>
      <BaseIntersector @intersection="loadMore" />
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductCard from './ProductCard.vue'
import Loader from './UI/Loader.vue'
import BaseIntersector from './BaseIntersector.vue'

export default {
  components: { ProductCard, Loader, BaseIntersector },
  async fetch() {
    await this.$store.dispatch('products/fetchProductsNextPage')
  },
  computed: {
    ...mapGetters({
      items: 'products/products',
      canLoadMorePages: 'products/canLoadMorePages',
      isFetchingProducts: 'products/isFetchingProducts'
    })
  },
  methods: {
    loadMore() {
      if (!this.isFetchingProducts) this.$fetch()
    }
  }
}
</script>

<style lang="sass" scoped>
.item-list
  display: flex
  flex-wrap: wrap

.product-card
  margin: 0px 4px 12px 4px
  padding: 8px 22px 12px 22px
  border: $light-border
  border-radius: $border-radius
  width: 187px
  height: 330px

.item-list-placeholder, .item-list-loader-placeholder
  width: 100%
  display: flex
  justify-content: center
  align-items: center

  span
    font-size: 2.5rem
    color: $color-active

.item-list-loader-placeholder > span
  animation: pulse 1s linear infinite

@keyframes pulse
  from
    opacity: 1
  to
    opacity: 1

  50%
    opacity: .25
</style>
