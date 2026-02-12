<script setup lang="ts">

</script>

<template>
<div class="main-row">
  <div class="content">
    <h3>Hi, We are Rokaro!</h3>
    <p>We are a team of motivated engineering students from the mechanical and software disciplines. We have a shared enthusiasm for solving problems and effectivizing processes.</p>
    <p>Our goal is to design and simulate an industrial grade mixing cell, on behalf of Tronrud Engineering as case-provider.</p>
  </div>
  <div class="border-container">
    <img src="/public/gruppebilde-te-cropped-xs.webp" alt="Group photo showing members of Rokaro"/>
  </div>
</div>
</template>

<style scoped lang="scss">
.content {
  padding: 2rem;

  h3 {
    font-family: var(--font-display);
    font-size: 3rem;
  }
  p {
    font-size: 1.2rem;
  }
}

.main-row {
  display: flex;
  flex-direction: row;

  div {
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
      object-position: 60% 50%;
      clip-path: polygon(30% 0, 100% 0, 100% 100%, 0 100%);
    }
  }
}
</style>