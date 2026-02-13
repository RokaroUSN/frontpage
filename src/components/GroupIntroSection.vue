<script setup lang="ts">

</script>

<template>
<div class="main-row">
  <div class="text-side">
    <div class="content">
      <h3>Hi, We are Rokaro!</h3>
      <p>We are a team of motivated engineering students from the mechanical and software disciplines. We have a shared enthusiasm for solving problems and effectivizing processes.</p>
      <p>Our goal is to design and simulate an industrial grade mixing cell, on behalf of Tronrud Engineering as case-provider.</p>
    </div>
  </div>
  <div class="image-side">
    <picture>
      <source media="(max-width: 600px)" srcset="/public/gruppebilde-te-cropped-xs-mobile.webp" />
      <img src="/public/gruppebilde-te-widecrop-website-short.webp" alt="Group photo showing members of Rokaro" />
    </picture>
  </div>
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
  position: relative;
  // Ensure a reasonable minimum even if text is very short
  min-height: 300px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: red;
    clip-path: polygon(30% 0, 100% 0, 100% 100%, 0 100%);
  }

  img {
    display: block;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 60% 50%;
    clip-path: polygon(30% 0, 100% 0, 100% 100%, 0 100%);
    margin-left: 20px;
  }
}

@media screen and (max-width: 768px) {
  .text-side {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
}

@media screen and (max-width: 800px) {
  .main-row {
    flex-direction: column;
  }

  .content {
    padding: 2rem 0 0 0;
    h3 {
      font-size: 2.4rem;
    }
  }

  .image-side {
    min-height: 350px;

    &::before {
      clip-path: polygon(0 5rem, 100% 0, 100% 100%, 0 100%);
    }

    img {
      margin-left: 0;
      margin-top: 1rem;
      clip-path: polygon(0 5rem, 100% 0, 100% 100%, 0 100%);
      object-position: 50% 100%;
    }
  }
}
</style>