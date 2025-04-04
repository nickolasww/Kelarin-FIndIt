import type React from "react"

interface TaskCardProps {
  title: string
  tag: string
  tagColor: string
  commentCount: number
  attachmentCount: number
  status: "todo" | "done" | "progress" | "review"
}

const TaskCard: React.FC<TaskCardProps> = ({ title, tag, tagColor, commentCount, attachmentCount, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "todo":
        return "bg-gray-300"
      case "done":
        return "bg-green-400"
      case "progress":
        return "bg-yellow-400"
      case "review":
        return "bg-blue-400"
      default:
        return "bg-gray-300"
    }
  }

  // Define tag background color
  const getTagBackground = () => {
    switch (tagColor) {
      case "purple":
        return "bg-purple-500 text-white"
      case "green":
        return "bg-green-500 text-white"
      case "blue":
        return "bg-blue-500 text-white"
      case "yellow":
        return "bg-yellow-500 text-black"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="bg-white rounded-lg p-3 mb-3 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-sm">{title}</h3>
        <div className={`w-4 h-4 rounded-full ${getStatusColor()}`}></div>
      </div>

      <div className="flex justify-between items-center mt-3">
        <span className={`text-xs px-2 py-1 rounded-full ${getTagBackground()}`}>{tag}</span>

        <div className="flex items-center space-x-2 text-gray-500 text-xs">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            {commentCount}
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
            {attachmentCount}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard

