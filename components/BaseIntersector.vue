<template>
  <div ref="intersectionElement"></div>
</template>

<script>
export default {
  mounted() {
    const options = {}

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) this.$emit('intersection')
    }, options)

    observer.observe(this.$refs.intersectionElement)
  }
}
</script>

<style></style>
