import { UserPreview } from '@/components/Shared/UserPreview'
import { createRoom, useAppSelector } from '@/features/Message/messagesSlice'
import { EmptyPage } from '@/pages'
import { AccountModel, MessageModel } from '@/shared/models'
import { SimplifiedAccountType } from '@/shared/types'
import { cn } from '@/utils'
import { Modal } from 'flowbite-react'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'

type CreateMessageModalProps = {
  openModal: boolean
  myMessages: MessageModel['']
  handleCloseModal: () => void
}

export const CreateMessageModal = ({
  openModal,
  handleCloseModal,
  myMessages
}: CreateMessageModalProps) => {
  const [searched, setSearched] = useState('')

  const users = useAppSelector((state) => state.users).filter(
    (user) => user.username !== 'Amir_Aryan'
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSearchUsers = useCallback(() => {
    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(searched.toLowerCase()) ||
        user.name.toLocaleLowerCase().includes(searched)
    )
  }, [users, searched])

  const searchedUsers = useMemo(() => handleSearchUsers(), [handleSearchUsers])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearched(e.target.value)
  }

  const handleCreateMessage = (user: AccountModel) => {
    handleCloseModal()
    if (checkIfExistsRoom(user)) {
      const roomId = findExistingRoomId(user)
      navigate(roomId!)
    } else {
      const userInfo: SimplifiedAccountType = {
        name: user.name,
        username: user.username,
        imageUrl: user.imageUrl
      }
      const roomId = v4()
      dispatch(createRoom({ myUsername: 'Amir_Aryan', userInfo, roomId }))
      navigate(roomId)
    }
  }
  const checkIfExistsRoom = (user: AccountModel) => {
    return Object.keys(myMessages).some((messageId) => {
      if (myMessages[messageId].userInfo.username === user.username) {
        return true
      }
      return false
    })
  }

  const findExistingRoomId = (user: AccountModel) => {
    return Object.keys(myMessages).find((messageId) => {
      if (myMessages[messageId].userInfo.username === user.username) {
        return messageId
      }
    })
  }

  return (
    <Modal size="md" show={openModal} onClose={handleCloseModal}>
      <Modal.Header className="border-none pr-1 py-2" />
      <Modal.Body
        className="flex overflow-y-auto
        flex-col gap-2 py-2 mb-4 px-4 custom-modal min-h-[400px]"
      >
        <div
          className="flex items-center relative
          justify-center"
        >
          <input
            value={searched}
            onChange={handleInputChange}
            className="custom-input w-full pl-4 inline-block"
            placeholder="Search"
          />
        </div>
        <div className="flex flex-col mt-4">
          {searchedUsers.length > 0 ? (
            searchedUsers.map((user, index) => (
              <UserPreview
                className={cn('border-b pt-2 border-b-gray-600/20 pb-4 dark:border-b-white/20', {
                  'border-none pb-0': index === searchedUsers.length - 1
                })}
                {...user}
                isForMessageRoom
                handleCreateMessage={() => handleCreateMessage(user)}
                key={user.username}
              />
            ))
          ) : (
            <EmptyPage className="h-[80%] w-full flex items-center justify-center">
              <p className="font-normal">No results found</p>
            </EmptyPage>
          )}
        </div>
      </Modal.Body>
    </Modal>
  )
}
