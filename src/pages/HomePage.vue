<script setup lang="ts">
import HeroSection from "../components/HeroSection.vue";
import GroupIntroSection from "../components/GroupIntroSection.vue";
import DomainSimulationSection from "../components/DomainSimulationSection.vue";
import ProjectBriefSection from "../components/ProjectBriefSection.vue";
import SprintOverviewSection from "../components/SprintOverviewSection.vue";
import MemberCard from "../components/MemberCard.vue";
import MemberDialog from "../components/MemberDialog.vue";
import {ref} from "vue";
import type {TeamMember} from "../data/members.ts";
import {teamMembers} from "../data/members.ts";

const selectedMember = ref<TeamMember | null>(null)
const dialogAnchor = ref<DOMRect | null>(null)
const dialogRef = ref<InstanceType<typeof MemberDialog> | null>(null)

</script>

<template>
  <!-- Hero Section -->
  <HeroSection/>

  <GroupIntroSection/>

  <DomainSimulationSection/>

  <!-- Project Brief -->
  <ProjectBriefSection/>

  <!-- Current Sprint -->
  <SprintOverviewSection id="sprint"/>

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
        <span class="section-number mono">03</span>
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
          :selected="selectedMember?.id === member.id"
          :dialog-side="selectedMember?.id === member.id ? dialogRef?.placedSide : undefined"
          @click="dialogAnchor = ($event.currentTarget as HTMLElement).getBoundingClientRect(); selectedMember = member"
        />
      </div>
      <MemberDialog
        ref="dialogRef"
        :member="selectedMember"
        :anchor="dialogAnchor"
        @close="selectedMember = null; dialogAnchor = null"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.wip-notice {
  padding: 1rem 0;
  background: #e87070;
  margin-top: 2rem;
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
  .section-header {
    margin-bottom: 2.5rem;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }

  .hide-mobile {
    display: none;
  }
}
</style>
