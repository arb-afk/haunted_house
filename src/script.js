// ==============================
// Haunted House - ITE-18 Activity (Enhanced Version with Jumpscare)
// ==============================

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from 'lil-gui'

// Debug GUI
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Fog
const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Door textures
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// Bricks textures
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

// Grass textures
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

// Repeat grass
grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)
grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping
grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

/**
 * House
 */
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
walls.position.y = 1.25
house.add(walls)

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
)
roof.rotation.y = Math.PI * 0.25
roof.position.y = 3
house.add(roof)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
door.position.y = 1
door.position.z = 2.01
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)
house.add(bush1, bush2, bush3, bush4)

/**
 * Graves
 */
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 6
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, 0.3, z)
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.castShadow = true
    graves.add(grave)
}

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = -Math.PI * 0.5
floor.position.y = 0
floor.receiveShadow = true
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
scene.add(ambientLight)

const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, -2)
moonLight.castShadow = true
scene.add(moonLight)

const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 2.2, 2.7)
doorLight.castShadow = true
house.add(doorLight)

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
const ghost2 = new THREE.PointLight('#00ffff', 2, 3)
const ghost3 = new THREE.PointLight('#ffff00', 2, 3)
ghost1.castShadow = ghost2.castShadow = ghost3.castShadow = true
scene.add(ghost1, ghost2, ghost3)

/**
 * Shadows
 */
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

moonLight.shadow.mapSize.width = 256
moonLight.shadow.mapSize.height = 256
moonLight.shadow.camera.far = 15
doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7
ghost1.shadow.mapSize.width = ghost2.shadow.mapSize.width = ghost3.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = ghost2.shadow.mapSize.height = ghost3.shadow.mapSize.height = 256

walls.castShadow = true
bush1.castShadow = bush2.castShadow = bush3.castShadow = bush4.castShadow = true

/**
 * Sizes
 */
const sizes = { width: window.innerWidth, height: window.innerHeight }

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 2, 5)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Audio Setup
 */
const listener = new THREE.AudioListener()
camera.add(listener)
const audioLoader = new THREE.AudioLoader()

// Background ambient sound (optional)
const backgroundSound = new THREE.Audio(listener)
audioLoader.load('/scream.mp3', (buffer) => {
    backgroundSound.setBuffer(buffer)
    backgroundSound.setLoop(true)
    backgroundSound.setVolume(0.1)
    backgroundSound.play()
}, undefined, (error) => {
    console.log('Background sound not loaded:', error)
})

/**
 * JUMPSCARE SETUP
 */
// Load the ghost 3D model
const gltfLoader = new GLTFLoader()
let ghostModel = null
let isJumpscareActive = false

gltfLoader.load(
    '/ghost.glb', 
    (gltf) => {
        ghostModel = gltf.scene
        ghostModel.scale.set(2, 2, 2)
        ghostModel.position.set(0, 1, 0)
        ghostModel.visible = false
        scene.add(ghostModel)
        
        // Add red point light to ghost
        const ghostLight = new THREE.PointLight('#ff0000', 5, 10)
        ghostModel.add(ghostLight)
        
        console.log('Ghost model loaded successfully!')
    },
    undefined,
    (error) => {
        console.error('Error loading ghost model:', error)
    }
)

// Load jumpscare scream sound
const screamSound = new THREE.Audio(listener)
audioLoader.load('/scream.mp3', (buffer) => {
    screamSound.setBuffer(buffer)
    screamSound.setLoop(false)
    screamSound.setVolume(0.8)
    console.log('Scream sound loaded!')
}, undefined, (error) => {
    console.log('Scream sound not loaded:', error)
})

// Create screen flash overlay
const flashOverlay = document.createElement('div')
flashOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: red;
    opacity: 0;
    pointer-events: none;
    z-index: 9999;
    transition: opacity 0.1s;
`
document.body.appendChild(flashOverlay)

// Jumpscare trigger function
let lastJumpscareTime = 0
function triggerJumpscare() {
    if (!ghostModel || isJumpscareActive) return
    
    isJumpscareActive = true
    console.log('Jumpscare triggered!')
    
    // Position ghost right in front of camera
    const cameraDirection = new THREE.Vector3()
    camera.getWorldDirection(cameraDirection)
    ghostModel.position.copy(camera.position).add(cameraDirection.multiplyScalar(3))
    ghostModel.lookAt(camera.position)
    
    // Show ghost
    ghostModel.visible = true
    
    // Flash effect
    flashOverlay.style.opacity = '0.7'
    setTimeout(() => {
        flashOverlay.style.opacity = '0'
    }, 100)
    
    // Play scream sound
    if (screamSound.buffer) {
        screamSound.play()
    }
    
    // Animate ghost (pulse/shake)
    let pulseTime = 0
    const pulseInterval = setInterval(() => {
        if (ghostModel.visible) {
            pulseTime += 0.1
            ghostModel.scale.set(
                2 + Math.sin(pulseTime * 10) * 0.3,
                2 + Math.sin(pulseTime * 10) * 0.3,
                2 + Math.sin(pulseTime * 10) * 0.3
            )
        }
    }, 16)
    
    // Hide ghost after 1 second
    setTimeout(() => {
        ghostModel.visible = false
        ghostModel.scale.set(2, 2, 2)
        clearInterval(pulseInterval)
        if (screamSound.isPlaying) screamSound.stop()
        isJumpscareActive = false
    }, 1000)
}

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Flickering light
    doorLight.intensity = 1 + Math.sin(elapsedTime * 10) * 0.1 + (Math.random() - 0.5) * 0.1

    // Moving moonlight
    moonLight.position.x = Math.sin(elapsedTime * 0.1) * 5
    moonLight.position.z = Math.cos(elapsedTime * 0.1) * 5

    // Ghosts animation
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)

    const ghost2Angle = -elapsedTime * 0.32
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const ghost3Angle = -elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    // Random jumpscare trigger (every 15-30 seconds)
    if (elapsedTime - lastJumpscareTime > 15 + Math.random() * 15) {
        triggerJumpscare()
        lastJumpscareTime = elapsedTime
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()