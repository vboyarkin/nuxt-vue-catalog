<template>
  <div class="filter-panel">
    <Loader v-if="isFetching" size="medium" />
    <CheckboxListSelector
      v-if="!isFetching"
      property-name="category"
      :options="filtersToApply.category"
      :add-text-field="true"
      @selection-change="onCategorySelectionChange"
    >
      Категория
    </CheckboxListSelector>
    <RangeSelector
      v-if="!isFetching"
      :limits="filters.price"
      @range-change="onRangeSelectionChange"
    >
      Цена
    </RangeSelector>
    <RadioListSelector
      v-if="!isFetching"
      :options="filters.discount"
      @selection-change="onDiscountSelectionChange"
    >
      Размер скидки
    </RadioListSelector>

    <div class="filter-panel__buttons-container">
      <BaseButton @click="applyFilters">Применить</BaseButton>
      <BaseButton @click="resetFilters">Сбросить</BaseButton>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from './UI/Loader.vue'
import BaseButton from './UI/BaseButton.vue'
import CheckboxListSelector from '@/components/UI/CheckboxListSelector.vue'
import RadioListSelector from '@/components/UI/RadioListSelector.vue'
import RangeSelector from '@/components/UI/RangeSelector.vue'

export default {
  components: {
    CheckboxListSelector,
    RadioListSelector,
    RangeSelector,
    Loader,
    BaseButton
  },
  async fetch() {
    await this.$store.dispatch('products/fetchFilters')
  },
  computed: {
    ...mapGetters({
      filtersToApply: 'products/filtersToApply',
      filters: 'products/filters'
    }),
    isFetching() {
      return this.$fetchState.pending
    }
  },
  methods: {
    ...mapActions({
      updateFiltersToApply: 'products/updateFiltersToApply',
      resetFilters: 'products/resetFilters',
      applyFilters: 'products/applyFilters'
    }),
    onCategorySelectionChange(category) {
      this.updateFiltersToApply({
        ...this.filtersToApply,
        category
      })
    },
    onDiscountSelectionChange(discount) {
      this.updateFiltersToApply({
        ...this.filtersToApply,
        discount
      })
    },
    onRangeSelectionChange(min, max) {
      this.updateFiltersToApply({
        ...this.filtersToApply,
        price: { min, max }
      })
    }
  }
}
</script>

<style lang="sass">
.filter-panel h4
  text-align: left
  margin-left: 1rem

.list-wrap
  text-align: left
  margin-left: 1.1rem

.filter-panel__buttons-container
  margin-top: 1.5rem
  display: flex
  flex-direction: column
  align-items: center
  button
    width: 170px
    margin-bottom: 3px
</style>
