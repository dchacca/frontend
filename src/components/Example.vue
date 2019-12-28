<template>
  <div>
    <h1>Hello Vue from Webpack</h1>
    <p class="hola text-red-700">And Tailwind</p>
  </div>
</template>

<script>
export default {
  name: "Example"
};
</script>
<style scoped>
.hola {
  @apply bg-green-400 italic;
}
</style>

