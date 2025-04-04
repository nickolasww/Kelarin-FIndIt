"use client"

import type React from "react"
import WorkspaceCard from "@/components/card/workspacecard"
import Input from "@/components/input/index"

interface Workspace {
  id: number
  name: string
}

interface MainContentProps {
  workspaces: Workspace[]
}

function WorkspaceList({ workspaces }: { workspaces: Workspace[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {workspaces.map((workspace) => (
        <WorkspaceCard key={workspace.id} workspace={workspace} />
      ))}
    </div>
  )
}

const MainContent: React.FC<MainContentProps> = ({ workspaces }) => {
  return (
    <div className="flex-1 p-4 sm:p-8 shadow-md">
      <div className="flex flex-col items-start gap-3 sm:gap-5 mb-3 sm:mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold">Workspace</h1>
        <Input
          type="text"
          value=""
          label=""
          placeholder="Search..."
          classname="border rounded-md py-2 px-4 w-full sm:w-96"
          onChange={() => {}}
        />
      </div>

      <div className="absolute top-4 md:top-9 right-4 flex items-center">
        <span role="img" aria-label="fire" className="text-2xl">
          🔥
        </span>
        <span className="text-lg font-bold mr-2">365 Days</span>
      </div>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg font-semibold mb-3 sm:mb-4">Recently Added</h2>
        <WorkspaceList workspaces={workspaces.slice(-3).reverse()} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:mb-4">All Workspace</h2>
        <WorkspaceList workspaces={workspaces} />
      </section>
    </div>
  )
}

export default MainContent

