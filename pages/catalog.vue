<template>
  <div class="container">
    <div class="filter-panel-container" :class="{ hidden: hideFilterPanel }">
      <FilterPanel class="filter-panel" />
      <LongTriggerButton
        v-model="hideFilterPanel"
        class="hide-filters"
        :rotate-content="true"
        :rotated-by-default="true"
      >
        →
      </LongTriggerButton>
    </div>
    <ProductList />
  </div>
</template>

<script>
import LongTriggerButton from '~/components/LongTriggerButton.vue'
export default {
  name: 'App',
  components: { LongTriggerButton },
  data: () => ({
    hideFilterPanel: true
  })
}
</script>

<style lang="sass" scoped>
.container
  display: flex


.filter-panel-container
  border: $light-border
  background-color: $bg-color
  display: flex
  position: fixed
  top:0
  bottom: 0

  > *
    flex-grow: 0
    flex-shrink: 0

  transition: left .15s ease-in-out
  left: 0px
  &.hidden
    left: -270px


  box-shadow: $shadow

  @include size-desktop-up
    box-shadow: none
    position: static

.filter-panel
  margin: 5px
  width: 260px
  overflow-y: auto

.hide-filters
  @include size-desktop-up
    display: none
</style>
