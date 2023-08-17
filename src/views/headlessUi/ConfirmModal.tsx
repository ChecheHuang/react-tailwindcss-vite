import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { FiAlertTriangle } from 'react-icons/fi'
import Modal from './Modal'
import Button from './Button'
import MultiSelect from './inputs/MultiSelect'

interface ConfirmModalProps {
  isOpen?: boolean
  onClose: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false)
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Allen' },
  ]
  const [members, setMembers] = useState<any[]>([])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div
          className="
            mx-auto 
            flex 
            h-12 
            w-12 
            flex-shrink-0 
            items-center 
            justify-center 
            rounded-full 
            bg-red-100 
            sm:mx-0 
            sm:h-10 
            sm:w-10
          "
        >
          <FiAlertTriangle
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div
          className="
            mt-3 
            text-center 
            sm:ml-4 
            sm:mt-0 
            sm:text-left
          "
        >
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this conversation? This action
              cannot be undone.
            </p>
            <MultiSelect
              disabled={isLoading}
              label="多選"
              options={users.map((user) => ({
                value: user.id,
                label: user.name,
              }))}
              onChange={(value) => setMembers(value as any)}
              value={members}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button disabled={isLoading} danger onClick={onClose}>
          Delete
        </Button>
        <Button disabled={isLoading} secondary onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmModal
