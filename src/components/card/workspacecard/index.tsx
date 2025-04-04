import Image from 'next/image';

interface WorkspaceCardProps {
    workspace: {
        name: string;
    }
}

export default function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  return (
    <div className="relative rounded-lg shadow-md overflow-hidden">
      <div className="h-12 bg-gradient-to-b from-gray-700 to-gray-900"></div>
    <div className="bg-gray-200 rounded-md p-4 relative pb-10">
                <div className="absolute -top-6 bg-teal-300 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <span className="text-xl font-semibold text-white uppercase">{workspace.name.charAt(0)}</span>
                </div>
                <p className="text-lg font-bold">{workspace.name}</p>
        </div>
    </div>
  );
}