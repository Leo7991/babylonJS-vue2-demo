/*
 * @Author: Leo
 * @Date: 2023-03-10 16:32:16
 * @LastEditors: Leo
 * @LastEditTime: 2023-03-10 16:49:52
 * @FilePath: \babylonJS-vue2-demo-test\src\router\index.js
 * @Description: 
 * 
 */
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import demo from '@/components/demo'
import demo2 from '@/components/demo2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    },
    {
      path: '/demo2',
      name: 'demo2',
      component: demo2
    }
  ]
})
