<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import DomainSimulationSection from "./components/DomainSimulationSection.vue";
import Footer from "./components/Footer.vue";
import MemberCard from "./components/MemberCard.vue";
import HeroSection from "./components/HeroSection.vue";
import GroupIntroSection from "./components/GroupIntroSection.vue";
import ProjectInfoSection from "./components/ProjectInfoSection.vue";

export interface TeamMember {
  name: string
  discipline: string
  role: string
  id: string
}

const teamMembers: TeamMember[] = [
  { id: '01', name: 'Erling Østmo', discipline: 'Mechanical', role: 'Project Lead' },
  { id: '02', name: 'Emory Eugene Høiensahl', discipline: 'Computer', role: 'Member' },
  { id: '03', name: 'Egil Kanstad', discipline: 'Mechanical', role: 'Member' },
  { id: '04', name: 'Fredrik Skjelstad Ramskjell', discipline: 'Mechanical', role: 'Member' },
  { id: '05', name: 'Lisa Fouad Petrus', discipline: 'Computer', role: 'Member' },
  { id: '06', name: 'Syver Sandum Stensholt', discipline: 'Computer', role: 'Member' },
]

const scenarios = [
  { icon: '01', text: 'What if a bag falls off the line?' },
  { icon: '02', text: 'What if the upstream machine stops?' },
  { icon: '03', text: 'What if the downstream machine stops?' },
  { icon: '04', text: 'What if only input A or B stops?' },
  { icon: '05', text: 'What if we experience internal failure?' }, // half visible
]

const isLoaded = ref(false)

type NavEntry = {
  name: string;
  hidden: string;
}
const navList: Map<string, NavEntry> = new Map([
  ["about", {
    name: "Project",
    hidden: true,
  }],
  ["team", {
    name: "Team",
    hidden: false,
  }]
])

const navListShown = computed<Map<string, NavEntry>>(()=>{
  // Source - https://stackoverflow.com/a/46605880
  // Posted by Estus Flask, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-01-30, License - CC BY-SA 4.0

  return new Map(
      [...navList.entries()]
          .filter(([key, item]) => !item.hidden)
  )

})


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
          <img src="/logo.svg" alt="Rokaro" class="logo" />
        </div>
        <nav class="nav">
          <a v-for="([navId, nav], i) in navListShown" :href="'#' + navId" class="nav-link">
            <span class="nav-index">0{{i + 1}}</span>
            <span>{{nav.name}}</span>
          </a>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <HeroSection/>

    <GroupIntroSection/>

    <DomainSimulationSection/>

    <div class="wip-notice">
      <div class="container">
        <h2>Work in progress. Tune in later for more information.</h2>
      </div>
    </div>

    <!-- About Section -->
    <ProjectInfoSection/>

    <!-- Divider -->
    <div class="section-divider">
      <div class="divider-line"></div>
      <div class="divider-cross">
        <span></span>
        <span></span>
      </div>
      <div class="divider-line"></div>
    </div>

    <!-- Team Section -->
    <section id="team" class="team">
      <div class="container">
        <div class="section-header">
          <span class="section-number mono">{{[...navListShown.keys()].indexOf("team") + 1}}</span>
          <h2>The Team</h2>
        </div>
        <p class="team-intro">
          Six engineering students from the University of South-Eastern Norway
          collaborating on this bachelor's project.
        </p>
        <div class="team-grid">
          <MemberCard
            v-for="member in teamMembers"
            :key="member.id"
            :member="member"
          />
        </div>
      </div>
    </section>

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

// ===== SECTION COMMON =====
.section {
  &-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 4rem;
  }

  &-number {
    font-size: 0.85rem;
    color: var(--color-primary);
    letter-spacing: 0.05em;
  }

  &-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 2rem 0;
  }
}

.wip-notice {
  padding: 1rem 0;
  background: #e87070;
  margin-top:2rem;
}

// ===== DIVIDER =====
.divider {
  &-line {
    flex: 1;
    max-width: 200px;
    height: 1px;
    background: var(--color-border);
  }

  &-cross {
    position: relative;
    width: 40px;
    height: 40px;

    span {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 4px;
      background: var(--color-primary);

      &:first-child {
        transform: translateY(-50%) rotate(45deg);
      }

      &:last-child {
        transform: translateY(-50%) rotate(-45deg);
        background: var(--color-text);
      }
    }
  }
}

// ===== TEAM SECTION =====
.team {
  background: var(--color-bg-light);

  &-intro {
    max-width: 600px;
    font-size: 1.1rem;
    color: var(--color-text-light);
    margin-bottom: 3rem;
  }

  &-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

// ===== RESPONSIVE =====
@media (max-width: 1024px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

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

  .hero {
    &-content {
      padding-top: 100px;
      padding-left: 1rem;
      padding-right: 1rem;
    }

    &-decoration {
      display: none;
    }

    &-scroll {
      bottom: 2rem;
    }
  }

  .hide-mobile {
    display: none;
  }

  .section-header {
    margin-bottom: 2.5rem;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }

  .footer {
    &-content {
      flex-direction: column;
      gap: 2rem;
    }

    &-left {
      flex-direction: column;
      text-align: center;
    }

    &-info {
      align-items: center;
    }
  }
}
</style>
