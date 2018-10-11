<template>
  <div
    :class="classObject"
    class="p-3"
  >
    <h4 class="font-italic">{{ title }}</h4>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Widget',
  props: {
    title: {
      type: String,
      default: ''
    },
    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classObject: function() {
      return {
        'mb-3': this.isFeatured,
        'bg-light': this.isFeatured,
        rounded: this.isFeatured
      }
    }
  }
}
</script>
