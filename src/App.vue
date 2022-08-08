<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    this.$router.push(
      {name: 'main'}
    )
  }
}
</script>

<style>
  body{
    margin: 0px;
  }
</style>
