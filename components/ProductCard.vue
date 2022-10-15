<template>
  <div class="item-card">
    <div class="image-container">
      <img class="image" :src="item.image" alt="" srcset="" />
    </div>
    <span class="price">${{ item.price }}</span>
    <div class="rating">
      <svg>
        <path
          :class="{ active: item.rating.count }"
          d="M7 10l4 3-1-5 4-3H9L7 0 5 5H0l4 3-1 5 4-3z"
        ></path>
      </svg>
      <span v-if="item.rating.count" class="rating-rate">{{
        item.rating.rate
      }}</span>
      <span class="rating-count">{{
        (item.rating.count ? item.rating.count : 'нет') + ' отзывов'
      }}</span>
    </div>
    <span class="title">{{ item.title }}</span>
    <button class="cart-btn">В корзину</button>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.item-card
  display: flex
  flex-direction: column

  > *
    flex: 1

  .image-container
    flex: 9999

.image-container
  display: flex
  align-items: center


.image
  max-height: 100px
  max-width: 100px
  margin: 10px auto

span, svg
  display: block

svg
  height: 15px
  width: 15px
  path
    fill: $color-inactive
  path.active
    fill: $color-active

.rating
  font-size: 0.9rem

  display: flex
  align-items: center
  > *
    margin-right: 5px
  .rating-rate
    color: $color-active
  .rating-count
    color: $color-inactive

.price
  font-size: 1.3rem
  margin: 5px 0px 10px 0px

.title
  margin: 3px 0px 18px 0px

button
  color: white
  background: $color-active
  border: none
  border-radius: 3px
  padding: 8px 0px
  margin: 0px
  font-family: inherit
  cursor: pointer
  @include animation-bg
</style>
