<template>
  <div class="loader-container">
    <TextFiller :size="size"><slot>Загрузка...</slot></TextFiller>
  </div>
</template>

<script>
import TextFiller from '@/components/UI/TextFiller.vue'
export default {
  components: { TextFiller },
  props: {
    size: {
      type: String,
      validator(value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: 'medium'
    }
  }
}
</script>

<style lang="sass" scoped>
.loader-container
  width: 100%
  @include animation-pulse
</style>
