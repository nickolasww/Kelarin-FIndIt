import React, { useState } from "react";
import { useEffect } from "react";

interface InviteFriendModalProps {
  isOpen: boolean;
  onInvite: (email: string) => void;
  onClose: () => void;
}

const InviteModal: React.FC<InviteFriendModalProps> = ({
  isOpen,
  onInvite,
  onClose,
}) => {
  const [email, setEmail] = useState("");
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [inviteMessage, setInviteMessage] = useState<string | null>(null)
   const [error, setError] = useState<string | null>(null)
    const [isInviting, setIsInviting] = useState(false)


     useEffect(() => {
       setIsModalOpen(isOpen)
     }, [isOpen])

     const validateEmail = (email: string): boolean => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return regex.test(email)
    }

     const handleInvite = async () => {
      if (!email.trim()) {
        setError("Email is required to invite")
        return
      }
  
      if (!validateEmail(email.trim())) {
        setError("Invalid email format")
        return
      }
  
      setError(null)
      setInviteMessage(null)
      setIsInviting(true)
  
      try {
        setInviteMessage("Email added. Invitation will be sent when workspace is created.")
      } catch (err) {
        console.error("Error adding email for invitation:", err)
        setError("Failed to add email. Please try again.")
      } finally {
        setIsInviting(false)
      }
    }

  return isModalOpen ? (
    <div className="fixed z-50 inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center ">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center ">
          <h2 className="text-3xl font-normal text-gray-800">Invite Friend</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center">
          <input
            type="email"
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm border-black placeholder-gray-400"
            placeholder="type your friend email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleInvite}
            disabled={isInviting}
            className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 
            px-6 rounded focus:outline-none focus:shadow-outline ml-5 text-sm flex items-center"${isInviting ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mt-1 mr-1 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            {isInviting ? "Adding..." : "Invite"}
          </button>
        </div>
        {inviteMessage && <p className="mt-2 text-sm text-green-600">{inviteMessage}</p>}
        {error && <div className=" mt-2 text-red-500 text-sm">{error}</div>}
      </div>
    </div>
  ) : null;
};

export default InviteModal;
