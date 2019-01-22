<template>
  <div>
      <Leaderboard />
      <Tabs />
  </div>
</template>

<script>
import Leaderboard from '../components/Leaderboard.vue';
import Tabs from '../components/Tabs.vue';

export default {
  components: {
    Leaderboard,
    Tabs,
  },
};
</script>
