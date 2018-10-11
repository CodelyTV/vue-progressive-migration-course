<template>
  <div 
    class="p-3"
    :class="classObject"
  >
      <h4 class="font-italic">{{ title }}</h4>
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Widget',
  computed: {
    classObject: function() {
      return {
        'mb-3': this.isFeatured,
        'bg-light': this.isFeatured,
        'rounded': this.isFeatured,
      }
    }
  },
  props: {
    title: String,
    isFeatured: Boolean
  }
}
</script>