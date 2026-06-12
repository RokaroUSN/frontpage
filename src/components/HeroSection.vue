<script setup lang="ts">
import {ref} from 'vue'
import BaseDialog from './BaseDialog.vue'

const awardOpen = ref(false)
const awardAnchor = ref<DOMRect | null>(null)

function openAward(e: MouseEvent) {
  awardAnchor.value = (e.currentTarget as HTMLElement).getBoundingClientRect()
  awardOpen.value = true
}
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
    <div class="hero-awards">
      <div class="deco fade-in">
        <div v-for="i in 4" style="" :style="{opacity: (100-20*i)+'%'}"></div>
      </div>
      <div @click="openAward">
        <div class="award-intro">kåret til</div>
        <div class="award-text">Beste tekniske <br/> løsning</div>
        <div class="award-outro">2026</div>
      </div>
      <div class="deco fade-out">
        <div v-for="i in 4" style="" :style="{opacity: (100-20*i)+'%'}"></div>
      </div>
    </div>
    <BaseDialog
      :open="awardOpen"
      :anchor="awardAnchor"
      @close="awardOpen = false; awardAnchor = null"
    >
      <template #default="{ close }">
        <div class="award-dialog-header">
          <span class="award-dialog-label mono">Beste tekniske løsning · 2026</span>
          <button class="award-dialog-close" @click="close" aria-label="Close">&times;</button>
        </div>
        <div class="award-dialog-body">
          <h2 class="award-dialog-title">Begrunnelse</h2>
          <div class="award-dialog-underline"></div>
          <blockquote class="award-dialog-quote">
            <span class="award-dialog-quote-mark" aria-hidden="true">&ldquo;</span>
            Denne gruppa satte seg godt inn i kundens behov for å komme med et konsept som forbedret dagens løsning på mange måter. Oppdragsgiveren ble mektig imponert da studentene demonstrerte konseptet, et brukergrensesnitt som knyttet en fysisk prototype til en digital simulering. Ved å anvende teori og matematikk, sammen med simulering, har de gitt bedriften ny innsikt som kan gi umiddelbar økt produktivitet. Dette vil bedriften si er et godt eksempel på fremragende ingeniørskap.
          </blockquote>
        </div>
      </template>
    </BaseDialog>
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
  background-image: url('/generic-factory-conveyor-belts-cropped.webp');
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
    //padding-top: 80px;
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

  &-awards {
    text-align: center;
    display: flex;
    flex-direction: row;
    position: absolute;
    bottom: 9rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 4;



    .deco {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      gap: 1rem;
      margin-left: 1rem;
      &>* {
        border-left: solid 1px var(--color-primary);
        transition: border-left ease-in-out 50ms;
      }
      &.fade-in {
        flex-direction: row-reverse;
        margin-right: 1rem;
      }
    }

    &:hover .deco {
      &>* {
        border-left: solid 3px var(--color-primary);
      }
    }

    & > *:not(.deco) {
      background: rgb(246 49 49 / 0.38);
      //border: 1px solid rgb(255 0 0 / 0.65);
      color: white;
      width: auto;
      padding: 0.6rem 1rem;
      cursor: pointer;
      user-select: none;

      .award-intro {
        font-family: var(--font-mono);
        opacity: 0.8;
        font-size: 0.9rem;
      }

      .award-text {
        font-size: 1.3rem;
        line-height: 1;
        font-weight: 600;
        text-wrap-mode: nowrap;
      }

      .award-outro {
        font-family: var(--font-mono);
        opacity: 0.8;
        font-size: 0.9rem;
      }
    }
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

// ===== RESPONSIVE =====
@media (max-width: 768px) {
  .hero {
    align-items: flex-start;

    &-content {
      padding-top: 120px;
    }

    &-scroll {
      display: none;
    }

    &-awards {
      bottom: 3rem;
    }
  }
}

// ===== AWARD DIALOG =====
.award-dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-light);
}

.award-dialog-label {
  font-size: 0.65rem;
  color: var(--color-primary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.award-dialog-close {
  background: none;
  border: none;
  font-size: 1.4rem;
  color: var(--color-text-light);
  cursor: pointer;
  padding: 0 0.25rem;
  line-height: 1;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-primary);
  }
}

.award-dialog-body {
  padding: 2rem 1.5rem;
}

.award-dialog-title {
  font-size: 1.4rem;
  font-family: var(--font-display);
  margin-bottom: 0.25rem;
}

.award-dialog-underline {
  width: 40px;
  height: 2px;
  background: var(--color-primary);
  margin-bottom: 1.5rem;
}

.award-dialog-quote {
  position: relative;
  margin: 0;
  padding-left: 2.75rem;
  font-size: 0.95rem;
  line-height: 1.7;
  font-style: italic;
  color: var(--color-text);
}

.award-dialog-quote-mark {
  position: absolute;
  top: -0.35em;
  left: -0.1rem;
  font-family: Georgia, serif;
  font-size: 3.5rem;
  font-weight: 600;
  line-height: 1;
  color: var(--color-primary);
  opacity: 0.85;
  pointer-events: none;
}
</style>