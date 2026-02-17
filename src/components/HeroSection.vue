<script setup lang="ts">

</script>

<template>
  <section class="hero">
    <div class="hero-grid"></div>
    <div class="hero-overlay"></div>
    <div class="container hero-content">
      <div class="hero-label">
        <span class="label-line"></span>
        <span class="label-text mono">Bachelor's Project 2026</span>
      </div>
      <h1 class="hero-title">
        Industrial<br />
        <span class="title-accent">Mixing Cell</span>
      </h1>
      <p class="hero-subtitle">
        A project on behalf of Tronrud Engineering.
      </p>
<!--      <div class="hero-tags">
        <span class="tag mono">Automation</span>
        <span class="tag mono">Robotics</span>
        <span class="tag mono">Production</span>
      </div>-->
    </div>
    <div class="hero-scroll">
      <span class="mono">Scroll</span>
      <div class="scroll-line"></div>
    </div>
<!--    <div class="hero-decoration">
      <svg viewBox="0 0 100 100" class="deco-cross">
        <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
        <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
      </svg>
    </div>-->
  </section>
</template>

<style scoped lang="scss">

// ===== HERO =====
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-image: url('/public/generic-factory-conveyor-belts-cropped.webp');
  background-size: cover;
  background-position: center;
  overflow: hidden;

  &-grid {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    z-index: 2;
  }

  &-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(30, 30, 30, 0.85) 0%, rgba(50, 50, 50, 0.75) 100%);
    z-index: 1;
  }

  &-content {
    position: relative;
    z-index: 3;
    padding-top: 80px;
  }

  &-label {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    animation: slideIn 0.8s ease 0.2s both;

    .label-line {
      width: 40px;
      height: 2px;
      background: var(--color-primary);
    }

    .label-text {
      color: var(--color-primary);
      font-size: 0.85rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
  }

  &-title {
    color: var(--color-white);
    margin-bottom: 1.5rem;
    animation: slideIn 0.8s ease 0.4s both;

    .title-accent {
      color: var(--color-primary);
    }
  }

  &-subtitle {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 2rem;
    animation: slideIn 0.8s ease 0.6s both;
  }

  &-tags {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    animation: slideIn 0.8s ease 0.8s both;

    .tag {
      padding: 0.5rem 1rem;
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.75rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
  }

  &-scroll {
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    z-index: 3;
    animation: fadeIn 1s ease 1.2s both;

    .scroll-line {
      width: 1px;
      height: 40px;
      background: linear-gradient(to bottom, rgba(255,255,255,0.6), transparent);
      animation: scrollPulse 2s ease infinite;
    }
  }

  &-decoration {
    position: absolute;
    bottom: 10%;
    right: 5%;
    z-index: 2;
    opacity: 0.1;
    animation: fadeIn 1s ease 1s both;

    .deco-cross {
      width: 150px;
      height: 150px;
      color: var(--color-white);
    }
  }
}

.hide-mobile {
  display: inline;
}
</style>