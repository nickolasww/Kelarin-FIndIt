import Image from 'next/image';

interface WorkspaceCardProps {
    workspace: {
        name: string;
    }
}

export default function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  return (
    <div className="bg-gray-200 rounded-md p-4">
      <div className="flex justify-center items-center h-24">
        <Image
          src="/bcc-nekad-icon.png" // Ganti dengan path ikon BCC Nekad
          alt={workspace.name}
          width={48}
          height={48}
        />
      </div>
      <p className="text-center mt-2 font-semibold">{workspace.name}</p>
    </div>
  );
}