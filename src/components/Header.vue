<template>
  <div class="app-header">
    <span class="app-header-item app-brand">Lyrical</span>
    <span class="app-header-item app-brand-by">by</span>
    <span class="app-header-item app-brand-ss">Soomin Studio</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
});
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 15%;
  padding: 0 40px;
}

.app-header-item {
  margin-right: 10px;
  color: white;
}

.app-brand {
  font-size: 1.75rem;
  font-weight: 700;
}

.app-brand-ss {
  font-size: 1.25rem;
  font-weight: 700;
}
</style>
