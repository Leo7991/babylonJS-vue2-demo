<!--
 * @Author: Leo
 * @Date: 2023-03-10 16:35:37
 * @LastEditors: Leo
 * @LastEditTime: 2023-03-10 17:30:15
 * @FilePath: \babylonJS-vue2-demo\src\components\demo.vue
 * @Description: 
 * 
-->
<template>
    <canvas id="renderCanvas"></canvas>
</template>
  
<script>
import * as BABYLON from "babylonjs"

export default {

    methods: {
        //创建引擎启动监听器
        addListener() {
            window.addEventListener('DOMContentLoaded',this.createBabyLon);
        },
        createBabyLon() {
            var canvas = document.getElementById("renderCanvas"); // 获取到renderCanvas这个要素
            var engine = new BABYLON.Engine(canvas, true); // 在这里创建巴比伦引擎，这就是回答了上一小节的问题之一

            /******* 下面就是类似于Playgroud里面createScene函数，但是有一些改动 ******/
            var createScene = function () {
                var scene = new BABYLON.Scene(engine);
                // 这里使用了另一种相机
                var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, 5), scene);
                camera.attachControl(canvas, true);
                // 更改成了两束光构成的混合光
                new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
                new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
                // 添加球体
                BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);

                return scene;
            };
            /******* End of the create scene function ******/

            /* 下面解释createScene()函数怎么用，也就是上一节的第二个问题 */
            var scene = createScene(); // 首先调用它并赋值给一个变量
            // 注册一个渲染循环来重复渲染场景
            engine.runRenderLoop(function () {
                scene.render();
            });

            // 观察浏览器/画布的“resize”事件，也就是大小出现调整的事件
            window.addEventListener("resize", function () {
                engine.resize();
            });

        }
    },

    created() {
        // this.addListener;
        // this.createBabyLon();
    },

    mounted() {
        this.createBabyLon();
    },

    beforeDestroy() {
        // window.removeEventListener('DOMContentLoaded', this.createBabyLon)
    },
}

</script>
  
<style>
#renderCanvas {
    width: 600px;
    height: 600px;
    touch-action: none;
}
</style>
  