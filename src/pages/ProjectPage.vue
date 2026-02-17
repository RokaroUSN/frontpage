<script setup lang="ts">
import ProjectInfoSection from "../components/ProjectInfoSection.vue";
</script>

<template>
  <div class="page-wrapper">
    <div class="container">
      <nav class="breadcrumb">
        <router-link :to="{ name: 'home' }">Home</router-link>
        <span class="separator mono">/</span>
        <span class="current">Project</span>
      </nav>
    </div>

    <ProjectInfoSection/>
  </div>
</template>

<style scoped lang="scss">
.page-wrapper {
  padding-top: var(--header-height);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 0 0;
  font-size: 0.85rem;

  a {
    color: var(--color-text-light);

    &:hover {
      color: var(--color-primary);
    }
  }

  .separator {
    color: var(--color-border);
    font-size: 0.75rem;
  }

  .current {
    color: var(--color-text);
    font-weight: 500;
  }
}
</style>
