import React from "react";
import WorkspaceCard from "@/components/card/workspacecard";
import Input from "@/components/input/index";

interface WorkspaceListProps {
  workspaces: {
    id: number;
    name: string;
  }[];
}

function WorkspaceList({ workspaces }: WorkspaceListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {workspaces.map((workspace) => (
        <WorkspaceCard key={workspace.id} workspace={workspace} />
      ))}
    </div>
  );
}

const MainContent = () => {
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
        />
      </div>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg font-semibold mb-3 sm:mb-4">Recently Added</h2>
        <WorkspaceList
          workspaces={[
            { id: 1, name: "BCC Nekad" },
            { id: 2, name: "BCC Nekad 2" },
            { id: 3, name: "BCC Nekad 3" },
          ]}
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:mb-4">All Workspace</h2>
        <WorkspaceList
          workspaces={[
            { id: 1, name: "BCC Nekad" },
            { id: 2, name: "BCC Nekad 2" },
            { id: 3, name: "BCC Nekad 3" },
            { id: 4, name: "BCC Nekad 4" },
            { id: 5, name: "BCC Nekad 5" },
            { id: 6, name: "BCC Nekad 6" },
          ]}
        />
      </section>
    </div>
  );
};

export default MainContent;