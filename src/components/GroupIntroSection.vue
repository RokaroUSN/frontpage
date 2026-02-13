<script setup lang="ts">

</script>

<template>
<div class="main-row">
  <!-- Having it overlay to have left part respect margins, a bit clunky tho -->
  <div class="content-overlay container">
    <div class="content">
      <h3>Hi, We are Rokaro!</h3>
      <p>We are a team of motivated engineering students from the mechanical and software disciplines. We have a shared enthusiasm for solving problems and effectivizing processes.</p>
      <p>Our goal is to design and simulate an industrial grade mixing cell, on behalf of Tronrud Engineering as case-provider.</p>
    </div>
    <div class="mock-picture"></div>
  </div>
  <div class="mock-content">

  </div>
  <div class="border-container">
    <picture>
      <source media="(max-width: 600px)" srcset="/public/gruppebilde-te-cropped-xs-mobile.webp" />
      <img src="/public/gruppebilde-te-widecrop-website-short.webp" alt="Group photo showing members of Rokaro" />
    </picture>
  </div>
</div>
</template>

<style scoped lang="scss">
.content {
  padding-top: 2rem;

  h3 {
    font-family: var(--font-display);
    font-size: 3rem;
    line-height: 1.2;
  }
  p {
    font-size: 1.2rem;
  }
}

.main-row {
  display: flex;
  flex-direction: row;
  position: relative;

  .content-overlay {
    display: flex;
    flex-direction: row;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;

    .content {
      flex: 2;
    }

    .mock-picture {
      flex: 3;
    }
  }

  .container {
    position: absolute;
  }

  .mock-content {
    flex: 2;
  }
  .border-container {
    background-color: red;
    clip-path: polygon(30% 0, 100% 0, 100% 100%, 0 100%);
    flex: 3;
    img {
      display: block;
      width: 100%;
      height: 100%;
      margin-left: 20px;
      object-fit: cover;
      object-position: 75% 50%;
      clip-path: polygon(30% 0, 100% 0, 100% 100%, 0 100%);
    }
  }
}

@media screen and (max-width: 600px) {

  .content {

    h3 {
      font-size: 2.4rem;
    }
  }
  .main-row {
    display: flex;
    flex-direction: column;

    div {
    }
    .border-container {
      background-color: red;
      clip-path: polygon(0 4rem, 100% 0, 100% 100%, 0 100%);
      img {
        display: block;
        width: 100%;
        margin-top: 1rem;
        margin-left: 0;
        object-fit: cover;
        object-position: 75% 50%;
        clip-path: polygon(0 4rem, 100% 0, 100% 100%, 0 100%);
      }
    }
  }
}
</style>