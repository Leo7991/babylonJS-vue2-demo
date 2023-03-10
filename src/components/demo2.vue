<!--
 * @Author: Leo
 * @Date: 2023-03-10 15:32:58
 * @LastEditors: Leo
 * @LastEditTime: 2023-03-10 17:04:33
 * @FilePath: \babylonJS-vue2-demo-test\src\components\demo2.vue
 * @Description: 
 * 
-->
<template>
    <div>
        <!-- 123 -->
        <canvas id="renderCanvas" ref="canvas"></canvas>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';


import * as BABYLON from "babylonjs"

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
    },
    data() {
        //这里存放数据
        return {

        }
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        console.log(`the component is now mounted.`);
        this.initCanvas();
    },
    //生命周期 - 创建之前
    beforeCreate() {

    },
    //生命周期 - 挂载之前
    beforeMount() {

    },
    //生命周期 - 更新之前
    beforeUpdate() {

    },
    //生命周期 - 更新之后
    updated() {

    },
    //生命周期 - 销毁之前
    beforeDestroy() {

    },
    //生命周期 - 销毁完成
    destroyed() {

    },
    //如果页面有keep-alive缓存功能，这个函数会触发
    activated() {

    },
    //方法集合
    methods: {
        initCanvas() {
            const canvas = document.getElementById("renderCanvas");
            if (canvas) {
                const engine = new BABYLON.Engine(canvas, true);
                engine.enableOfflineSupport = false;
                // 创建场景
                const createScene = () => {
                    // 实例化场景
                    const scene = new BABYLON.Scene(engine);
                    // 创建相机并添加到canvas
                    const camera = new BABYLON.ArcRotateCamera(
                        'Camera',
                        Math.PI / 2,
                        Math.PI / 2,
                        2,
                        new BABYLON.Vector3(0, 0, 5),
                        scene
                    );
                    camera.attachControl(canvas, true);
                    // 添加光源
                    // 环境光
                    const light1 = new BABYLON.HemisphericLight(
                        "light1",
                        new BABYLON.Vector3(1, 2, 1),
                        scene
                    );

                    // 聚光灯
                    // const light2 = new SpotLight(
                    //     "light2",
                    //     new Vector3(0,3,1),
                    //     new Vector3(0,-1,0),
                    //     Math.PI / 5, 
                    //     2,
                    //     scene
                    // )

                    // 点光源
                    // const light3 = new PointLight(
                    //     "light3",
                    //     new Vector3(0,2,1),
                    //     scene
                    // );

                    const skybox = BABYLON.MeshBuilder.CreateBox(
                        'skybox',
                        {
                            height: 0.25,
                            width: 2,
                            depth: 2,
                        },
                        scene
                    );

                    const skybox2 = BABYLON.MeshBuilder.CreateBox(
                        'skybox2',
                        {
                            height: 0.25,
                            width: 2,
                            depth: 2,
                        },
                        scene
                    );

                    const skybox3 = BABYLON.MeshBuilder.CreateBox(
                        'skybox3',
                        {
                            height: 0.25,
                            width: 2,
                            depth: 2,
                        },
                        scene
                    );

                    // 返回已存在的字符串对应名的变量
                    function strToVar(str) {
                        let name = str;
                        return eval(name);
                    };

                    // 平面一
                    skybox.position = new BABYLON.Vector3(0, 1, 1);
                    skybox.actionManager = new BABYLON.ActionManager(scene);
                    var highlightMaterial = new BABYLON.StandardMaterial("highlightMaterial", scene);
                    highlightMaterial.emissiveColor = BABYLON.Color3.Green();
                    skybox.material = highlightMaterial;
                    // 平面二
                    skybox2.position = new BABYLON.Vector3(0, 0, 1);
                    skybox2.actionManager = new BABYLON.ActionManager(scene);
                    var highlightMaterial2 = new BABYLON.StandardMaterial("highlightMaterial", scene);
                    highlightMaterial2.emissiveColor = BABYLON.Color3.Red();
                    skybox2.material = highlightMaterial2;
                    // 平面三
                    skybox3.position = new BABYLON.Vector3(0, -1, 1);
                    skybox3.actionManager = new BABYLON.ActionManager(scene);
                    var highlightMaterial3 = new BABYLON.StandardMaterial("highlightMaterial", scene);
                    highlightMaterial3.emissiveColor = BABYLON.Color3.Yellow();
                    skybox3.material = highlightMaterial3;

                    let highlightPass = new BABYLON.HighlightLayer("highlightPass", scene);
                    // 鼠标移入事件
                    scene.onPointerObservable.add(function (e) {
                        if (e.pickInfo.pickedMesh) {
                            console.log('e=', e)
                            let boxName = e.pickInfo.pickedMesh.name;
                            let name = strToVar(boxName);
                            // let box = (boxName === 'skybox' ? skybox : boxName === 'skybox2' ? skybox2 : skybox3);
                            // 创建轮廓光
                            highlightPass.addMesh(name, BABYLON.Color3.White());
                        } else {
                            // highlightPass.removeMesh(skybox);
                            highlightPass.removeAllMeshes();
                        };
                    }, BABYLON.PointerEventTypes.POINTERMOVE)

                    // 物体点击事件
                    scene.onPointerObservable.add(function (e) {
                        if (e.pickInfo.hit === true) {
                            let name = e.pickInfo.pickedMesh.name;
                            console.log('点击了', name);
                            window.alert(`点击了${name}`)
                        }
                    }, BABYLON.PointerEventTypes.POINTERTAP);


                    engine.runRenderLoop(function () {
                        scene.render();
                    });
                    return scene;
                };
                // 结束创建场景
                const scene = createScene();
                // loop
                engine.runRenderLoop(function () {
                    scene.render();
                });
                // resize
                window.addEventListener("resize", function () {
                    engine.resize();
                });
            }
        }
    }
}
</script>
<style scoped>
#renderCanvas {
    width: 600px;
    height: 600px;
}
</style>