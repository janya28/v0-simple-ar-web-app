"use client"

import { useState } from "react"
import { ModelViewer } from "@/components/model-viewer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const models = [
  {
    id: "duck",
    name: "Duck",
    description: "A yellow rubber duck 3D model",
    path: "/assets/3d/duck.glb",
  },
  {
    id: "earth",
    name: "Earth",
    description: "A textured globe of planet Earth",
    path: "/assets/3d/duck.glb", // Using duck as fallback since we have limited assets
    textureUrl: "/assets/3d/texture_earth.jpg",
  },
  {
    id: "cube",
    name: "Geometric Cube",
    description: "A simple geometric cube with colorful faces",
    path: "cube", // Special identifier for procedural geometry
  },
]

export default function Home() {
  const [activeModel, setActiveModel] = useState(models[0])

  // Function to display AR/VR content
  const displayModel = (model) => {
    setActiveModel(model)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <header className="w-full max-w-5xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Immersive Content Showcase</h1>
        <p className="text-center text-muted-foreground">Explore 3D models in an interactive virtual environment</p>
      </header>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="h-[400px] md:h-[500px]">
                <ModelViewer model={activeModel} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col space-y-4">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{activeModel.name}</h2>
              <p className="text-muted-foreground mb-4">{activeModel.description}</p>
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm font-medium">Instructions:</h3>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Click and drag to rotate the model</li>
                  <li>Scroll to zoom in and out</li>
                  <li>Right-click and drag to pan</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-3">Available Models</h2>
              <div className="flex flex-col space-y-2">
                {models.map((model) => (
                  <Button
                    key={model.id}
                    variant={activeModel.id === model.id ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => displayModel(model)}
                  >
                    {model.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
