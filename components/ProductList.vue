<template>
  <div>
    <Loader v-if="isFetching" size="large" />

    <div v-if="!isFetching && items && items.length !== 0" class="item-list">
      <ProductCard
        v-for="item of items"
        :key="item.id"
        class="product-card"
        :item="item"
      />
    </div>

    <div
      v-if="!isFetching && !(items && items.length !== 0)"
      class="item-list-placeholder"
    >
      <span>Нет подходящих товаров</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductCard from './ProductCard.vue'
import Loader from './UI/Loader.vue'
export default {
  components: { ProductCard, Loader },
  props: {
    isFetching: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      items: 'products/products'
    })
  }
}
</script>

<style lang="sass" scoped>
.item-list
  float: left
  display: flex
  flex-wrap: wrap

.product-card
  margin: 20px 44px
  width: 200px
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
