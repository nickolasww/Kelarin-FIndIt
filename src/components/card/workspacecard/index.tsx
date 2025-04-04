import Image from 'next/image';
import { useRouter } from "next/navigation"

interface WorkspaceCardProps {
    workspace: {
      id: number
      name: string
    }
}

export default function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/dashboard/${workspace.id}`)
  }
  return (
    <div
      className="relative rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <div className="h-12 bg-gradient-to-b from-gray-700 to-gray-900"></div>
      <div className="bg-gray-200 rounded-md p-4 relative pb-10">
        <div className="absolute -top-6 bg-teal-300 rounded-full w-10 h-10 flex items-center justify-center mr-4">
          <span className="text-xl font-semibold text-white uppercase">{workspace.name.charAt(0)}</span>
        </div>
        <p className="text-lg font-bold">{workspace.name}</p>
      </div>
    </div>
  )
}