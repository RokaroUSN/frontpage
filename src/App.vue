<script setup lang="ts">
import {ref, onMounted} from 'vue'
import Footer from "./components/Footer.vue";

const isLoaded = ref(false)

const navLinks = [
  { label: 'Project', to: { name: 'home', hash: '#about' } },
  { label: 'Team', to: { name: 'home', hash: '#team' } },
  { label: 'Sprints', to: { name: 'sprints' } },
]

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})
</script>

<template>
  <div class="landing-page" :class="{ loaded: isLoaded }">
    <!-- Header -->
    <header class="header">
      <div class="container header-content">
        <div class="logo-wrapper">
          <router-link :to="{ name: 'home' }">
            <img src="/logo.svg" alt="Rokaro" class="logo" />
          </router-link>
        </div>
        <nav class="nav">
          <router-link
            v-for="(link, i) in navLinks"
            :key="link.label"
            :to="link.to"
            class="nav-link"
          >
            <span class="nav-index mono">0{{ i + 1 }}</span>
            <span>{{ link.label }}</span>
          </router-link>
        </nav>
      </div>
    </header>

    <router-view />

    <!-- Footer -->
    <Footer/>
  </div>
</template>

<style scoped lang="scss">
// ===== LANDING PAGE =====
.landing-page {
  width: 100%;
  opacity: 0;
  transition: opacity 0.6s ease;

  &.loaded {
    opacity: 1;
  }
}

// ===== HEADER =====
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  z-index: 100;
  height: var(--header-height);

  &-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
  }
}

.logo {
  height: 36px;
  width: auto;

  &-wrapper {
    padding: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.nav {
  display: flex;
  gap: 2.5rem;

  &-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-text);
    font-weight: 500;
    font-size: 0.9rem;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-primary);

      .nav-index {
        color: var(--color-primary);
      }
    }
  }

  &-index {
    font-size: 0.7rem;
    color: var(--color-text-light);
    transition: color 0.2s ease;
  }
}

// ===== RESPONSIVE =====
@media (max-width: 768px) {
  .header-content {
    height: 100%;
    padding: 0.75rem 1.25rem;
  }

  .logo {
    height: 28px;
  }

  .nav {
    gap: 1.5rem;

    &-link {
      font-size: 0.85rem;
    }

    &-index {
      display: none;
    }
  }
}
</style>
