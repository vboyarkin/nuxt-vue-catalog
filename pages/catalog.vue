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
  > *
    flex-grow: 0
    flex-shrink: 0

.filter-panel
  grid-column: 1
  margin-right: 1rem
  width: 260px
</style>
