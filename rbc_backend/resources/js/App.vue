// App.vue
<template>
  <div id="app">
    <header>
      <nav class="navbar">
        <div class="logo">
          <router-link to="/">RBC Analyzer</router-link>
        </div>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/analysis" class="nav-link">Analysis</router-link>
          <router-link to="/about" class="nav-link">About</router-link>
        </div>
      </nav>
    </header>
    
    <main>
      <router-view></router-view>
    </main>
    
    <footer>
      <p>&copy; {{ new Date().getFullYear() }} RBC Analyzer - All Rights Reserved</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #2c3e50;
  padding: 1rem 2rem;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo a {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  transition: opacity 0.3s;
}

.nav-link:hover {
  opacity: 0.8;
}

.router-link-active {
  border-bottom: 2px solid white;
}

main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}

button {
  cursor: pointer;
  transition: opacity 0.3s;
}

button:hover {
  opacity: 0.9;
}
</style>