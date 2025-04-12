"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import WorkspaceCard from "@/components/card/workspacecard"
import Input from "@/components/input/index"
import StreakIcon from "@/assets/icon/StreakIcon.svg"
import Image from "next/image"
import { IoSearch } from "react-icons/io5"
import type { Workspace } from "@/services/workspace"

interface MainContentProps {
  workspaces: Workspace[]
}

function WorkspaceList({ workspaces }: { workspaces: Workspace[] }) {
  useEffect(() => {
    console.log("Workspaces in WorkspaceList:", workspaces)
  }, [workspaces])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {workspaces.map((workspace) => {
        const key = workspace.id ? `workspace-${workspace.id}` : `workspace-${Math.random().toString(36).substr(2, 9)}`

        return <WorkspaceCard key={key} workspace={workspace} />
      })}
    </div>
  )
}

const MainContent: React.FC<MainContentProps> = ({ workspaces }) => {
  const [searchTerm, setSearchTerm] = useState<string>("")


  const filteredWorkspaces = useMemo(() => {
    if (!searchTerm.trim()) return workspaces

    return workspaces.filter((workspace) => {
      const name = workspace.name || ""
      const title = workspace.title || ""
      return (
        name.toLowerCase().includes(searchTerm.toLowerCase()) || title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }, [workspaces, searchTerm])

  const recentWorkspaces = useMemo(() => {
    return [...workspaces].slice(-3).reverse()
  }, [workspaces])

  return (
    <div className="flex-1 p-4 sm:p-8 ">
      <div className="flex flex-col items-start gap-3 sm:gap-5 mb-3 sm:mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold">Workspace</h1>
        <div className="relative w-full sm:w-96">
          <IoSearch className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            value={searchTerm}
            label=""
            placeholder="Search..."
            classname="border rounded-md py-2 px-4 pl-10 w-full"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="absolute top-4 md:top-9 right-4 flex items-center gap-3">
        <span role="img" aria-label="fire" className="text-2xl">
          <Image src={StreakIcon || "/placeholder.svg"} alt="Streak Icon" width={24} height={24} />
        </span>
        <span className="text-lg font-bold mr-2">365 Days</span>
      </div>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg font-semibold mb-3 sm:mb-4">Recently Added</h2>
        {recentWorkspaces.length > 0 ? (
          <WorkspaceList workspaces={recentWorkspaces} />
        ) : (
          <p className="text-gray-500">No workspaces yet. Create your first workspace!</p>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:mb-4">All Workspace</h2>
        {filteredWorkspaces.length > 0 ? (
          <WorkspaceList workspaces={filteredWorkspaces} />
        ) : (
          <p className="text-gray-500">No workspaces found.</p>
        )}
      </section>
    </div>
  )
}

export default MainContent
