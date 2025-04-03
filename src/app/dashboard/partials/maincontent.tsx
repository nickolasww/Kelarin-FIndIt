import React from 'react'
import WorkspaceCard from '@/components/card/workspacecard';
import Input from '@/components/input/index'

interface WorkspaceListProps {
    workspaces: {
      id: number;
      name: string;
    }[];
  }
  
  function WorkspaceList({ workspaces }: WorkspaceListProps) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {workspaces.map((workspace) => (
          <WorkspaceCard key={workspace.id} workspace={workspace} />
        ))}
      </div>
    );
  }

const maincontent = () => {
  return (
    <div className="flex-1 p-8">
    <div className="flex flex-col items-start gap-5 mb-4">
      <h1 className="text-2xl font-semibold">Workspace</h1>
      <Input
      type="text"
      value=''
      label=''
      placeholder="Search..."
      classname="border rounded-md py-2 px-4 w-96"
      /> 

    </div>

    <section>
      <h2 className="text-lg font-semibold mb-4">Recently Added</h2>
      <WorkspaceList workspaces={[
        { id: 1, name: 'BCC Nekad' },
        { id: 2, name: 'BCC Nekad 2' },
        { id: 3, name: 'BCC Nekad 3' },
      ]} />
    </section>

  </div>
  )
}

export default maincontent
