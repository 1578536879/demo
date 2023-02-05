<template>
    <h1>{{ msg }}</h1>
    <p>{{ count }}</p>
  </template>
  
  <script >
    import { defineComponent, computed } from 'vue'
  
    export default defineComponent({
      name: 'HelloWorld',
      props: {
        msg: {
          type: String,
          default: ''
        }
      },
      setup() {
  
        const count = 1
  
        return {
          count,
        }
      }
    })
  </script>