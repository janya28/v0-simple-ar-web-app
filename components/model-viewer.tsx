"use client"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Center, Box, useTexture, Sphere } from "@react-three/drei"

// Component to display a model from a GLB file
function Model({ path }) {
  const { scene } = useGLTF(path)

  return <primitive object={scene} scale={2} />
}

// Component to display a textured sphere (Earth)
function Earth({ textureUrl }) {
  const texture = useTexture(textureUrl)

  return (
    <Sphere args={[1.5, 64, 64]}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  )
}

// Component to display a colorful cube
function ColorfulCube() {
  return (
    <Box args={[2, 2, 2]}>
      <meshStandardMaterial attach="material-0" color="hotpink" />
      <meshStandardMaterial attach="material-1" color="cyan" />
      <meshStandardMaterial attach="material-2" color="yellow" />
      <meshStandardMaterial attach="material-3" color="lime" />
      <meshStandardMaterial attach="material-4" color="orange" />
      <meshStandardMaterial attach="material-5" color="purple" />
    </Box>
  )
}

export function ModelViewer({ model }) {
  // Render the appropriate 3D content based on the model type
  const renderContent = () => {
    if (model.id === "earth") {
      return <Earth textureUrl={model.textureUrl} />
    } else if (model.id === "cube") {
      return <ColorfulCube />
    } else {
      return <Model path={model.path} />
    }
  }

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <Center>{renderContent()}</Center>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={2} maxDistance={10} />
      <Environment preset="studio" />
    </Canvas>
  )
}
