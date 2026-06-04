<script setup lang="ts">

</script>

<template>
<div class="main-row">
  <div class="text-side">
    <div class="content">
      <h3>Hi, we are Rokaro!</h3>
      <p>We are a team of motivated engineering students from the mechanical and software disciplines. We have a shared enthusiasm for solving problems and effectivizing processes.</p>
      <p>Our goal is to design and simulate an industrial grade mixing cell, on behalf of Tronrud Engineering as case-provider.</p>
    </div>
  </div>
  <div class="image-side">
    <div class="image-clip">
      <picture>
        <source media="(max-width: 800px)" srcset="/gruppebilde-te-cropped-xs-mobile.webp" />
        <img src="/gruppebilde-te-widecrop-website-short.webp" alt="Group photo showing members of Rokaro" />
      </picture>
    </div>
  </div>

  <!-- SVG clip-paths are always anti-aliased, unlike CSS clip-path: polygon() -->
  <svg width="0" height="0" aria-hidden="true" style="position: absolute;">
    <defs>
      <clipPath id="diagonal-desktop" clipPathUnits="objectBoundingBox">
        <polygon points="0.3,0 1,0 1,1 0,1" />
      </clipPath>
      <clipPath id="diagonal-mobile" clipPathUnits="objectBoundingBox">
        <!-- 5rem approximated as fraction; adjusted via CSS if needed -->
        <polygon points="0,0.25 1,0 1,1 0,1" />
      </clipPath>
    </defs>
  </svg>
</div>
</template>

<style scoped lang="scss">
.main-row {
  display: flex;
}

.text-side {
  flex: 2;
  // Replicate .container's left margin + padding so text aligns with other sections
  padding-left: max(2rem, calc((100vw - 1200px) / 2 + 2rem));
  padding-right: 2rem;
  display: flex;
  align-items: center;
}

.content {
  padding: 3rem 0;

  h3 {
    font-family: var(--font-display);
    font-size: 3rem;
    line-height: 1.2;
  }
  p {
    font-size: 1.2rem;
  }
}

.image-side {
  flex: 3;
  clip-path: polygon(30% 0, 100% 0, 100% 100%, 0 100%);
  background-color: var(--color-primary);
  overflow: hidden;
  position: relative;

  .image-clip {
    position: absolute;
    top: 0;
    left: 20px;
    right: 0;
    bottom: 0;
    clip-path: polygon(30% 0, 100% 0, 100% 100%, 0 100%);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  picture {
    display: block;
    height: 100%;
  }

  img {
    display: block;
    height: 100%;
    width: auto;
    flex-shrink: 0;
  }
}

@media screen and (max-width: 1200px) {
  .image-side {
    img {
      object-position: 48% 100%;
    }
  }
}

@media screen and (max-width: 1000px) {
  .main-row {
    flex-direction: column;
  }
  .text-side {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
  .content {
    padding: 2rem 0 0 0;
    h3 {
      font-size: 2.4rem;
    }
  }

  .image-side {
    clip-path: polygon(0 25%, 100% 0, 100% 100%, 0 100%);

    .image-clip {
      margin-left: 0;
      margin-top: 1rem;
      clip-path: polygon(0 25%, 100% 0, 100% 100%, 0 100%);
      max-height: 25rem;
      align-items: flex-end;
      justify-content: center;
    }

    img {
      width: 100%;
      height: auto;
      margin-right: 0;
    }
  }
}
</style>