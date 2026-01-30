<script setup lang="ts">

import XDivider from "./XDivider.vue";
</script>

<template>
  <footer class="footer">
    <div class="container footer-content">
      <div class="footer-left">
        <div style="gap: 2rem; display: flex;">
          <img src="/te-logo-white-text.svg" alt="Tronrud Engineering" class="footer-logo"/>
          <img src="/USN-logo_black-EN.svg" alt="USN" class="footer-logo white"/>
        </div>
      </div>
      <div class="footer-center">
        <div class="footer-info" style="width: 100%; display: flex; flex-direction: column; align-items: center;">
          <img src="/rokaro-logo-white-text.svg" alt="Rokaro" class="footer-logo" style="height: 55px" />
          <span class="mono highlight">Bachelor's Project 2026</span>
        </div>
      </div>
      <div class="footer-right">
        <div>
          <div class="mono highlight follow-us-label">
            Følg oss:
          </div>
          <div class="links">
            <a href="https://www.instagram.com/rokaro_usn/">
              <svg aria-label="Instagram" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Instagram</title><path d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: var(--color-text);
  color: var(--color-white);
  padding: 3rem 0;

  &-content {
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
      &:first-child {
        flex: 1;
        & > div {
          margin-right: auto;
        }
      }
      &:last-child {
        flex: 1;
        & > div {
          margin-left: auto;
        }
      }
    }
  }

  &-left {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  &-right > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;

    .follow-us-label {
      font-size: 0.8rem;
      margin-right: 0.2rem;
      transform: translateY(-0.2rem);
      color: white;
    }

    .links {
      text-align: right;
      //border-left: solid 2px var(--color-primary);
      //padding-left: 0.2rem;

      & > * {
        opacity: 1;
        transition: opacity 0.2s;
        &:hover {
          opacity: 0.7;
        }
      }

      svg {
        color: white;
        height: 36px;
        width: 36px;
      }
    }

  }

  &-logo {
    height: 38px;
    max-width: 210px;
    margin-right: 1rem;
    &.white {
      filter: brightness(0) invert(1);
    }
  }

  &-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.85rem;
    text-align: center;

    span.highlight {
      color: var(--color-primary);
      font-size: 0.75rem;
      letter-spacing: 0.05em;
    }
  }



  .x-divider {
    margin: 0 0.8rem;
  }

}

@media (max-width: 768px) {
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