import { useState } from 'react'
import { useUserAuth } from '../hooks/use-user-auth'
import { useAuth0 } from '@auth0/auth0-react'
import { UserData } from '../../models/Users'
import { useAvatars } from '../hooks/use-avatars'
import { Avatar } from '../../models/Avatars'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogContent, styled } from '@mui/material'

interface Form {
  name: string
  avatarId: number
  image: File | undefined
}

const emptyForm = { name: '', avatarId: 1, image: undefined }

export default function SignUpForm() {
  const { user, getAccessTokenSilently } = useAuth0()
  const { add } = useUserAuth()
  const { data: avatars, addFile: addAvatar } = useAvatars()
  const [formState, setFormState] = useState<Form>(emptyForm)
  const [customAvatar, setCustomAvatar] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [customAvatarURL, setCustomAvatarURL] = useState('')
  const navigate = useNavigate()

  const registerUser = async (newUser: UserData) => {
    if (user) {
      const token = await getAccessTokenSilently()
      newUser.authId = user.sub as string

      add.mutateAsync({ newUser, token })
    }
  }

  const handleNavigateToMap = () => {
    navigate('/map')
    location.reload()
  }

  const toggleCustomAvatar = () => {
    setCustomAvatar(!customAvatar)
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormState((prev) => ({ ...prev, image: file }))
      setCustomAvatarURL(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formState.name == '') {
      return
    }

    if (!customAvatar) {
      const newUser = {
        name: formState.name,
        authId: '',
        avatarId: formState.avatarId,
      }

      await registerUser(newUser)
      setShowConfirmation(true)
    } else {
      if (formState.image) {
        const token = await getAccessTokenSilently()

        const formData = new FormData()

        formData.append('image', formState.image)

        const newAvatarId = await addAvatar.mutateAsync({
          newAvatar: formData,
          token,
        })

        const newUser = {
          name: formState.name,
          authId: '',
          avatarId: newAvatarId,
        }

        await registerUser(newUser)
        setShowConfirmation(true)
      }
    }
  }

  const ConfirmationDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(10),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(10),
    },
  }))

  return (
    <>
      {showConfirmation && (
        <ConfirmationDialog
          open={true}
          onClose={handleNavigateToMap}
          keepMounted
          aria-describedby="alert-dialog"
        >
          <DialogContent className="error" style={{ fontSize: '20pt' }}>
            {`Thank you for registering, ${formState.name}!`}
          </DialogContent>
        </ConfirmationDialog>
      )}
      <div className="sign-up-form">
        <div className="sign-up-user-details-container">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="sign-up-input sign-up-input-text">
              <label htmlFor="name">Name: </label>
              <input
                id="name"
                type="text"
                value={formState.name}
                onChange={handleChange}
                className="sign-up-input-text"
              />
            </div>
            <div className="sign-up-input sign-up-input-text">
              <label htmlFor="avatarId">Avatar: </label>
              {customAvatar ? (
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="sign-up-input-text"
                />
              ) : (
                <select
                  id="avatarId"
                  value={formState.avatarId}
                  onChange={handleChange}
                  className="sign-up-input-text"
                >
                  {avatars?.map((avatar: Avatar) => {
                    return (
                      <option value={avatar.id} key={avatar.id}>
                        {avatar.id}
                      </option>
                    )
                  })}
                </select>
              )}
            </div>
            <div className="sign-up-submit-button-container">
              <button className="sign-up-submit-button">Submit</button>
            </div>
          </form>
        </div>
        <div className="sign-up-avatar-selection-container">
          <button
            type="button"
            className="sign-up-custom-avatar-button"
            onClick={toggleCustomAvatar}
          >
            {customAvatar
              ? 'Choose a default avatar'
              : 'Upload a custom avatar!'}
          </button>
          <div className="sign-up-avatar-container">
            {customAvatar ? (
              customAvatarURL ? (
                <img
                  className="sign-up-avatar-image"
                  src={customAvatarURL}
                  alt={`Avatar ${formState.avatarId}`}
                />
              ) : (
                <div className="sign-up-upload-message ">
                  Upload an image on the left!
                </div>
              )
            ) : (
              <img
                className="sign-up-avatar-image"
                src={`/images/avatars/avatar${formState.avatarId}.png`}
                alt={`Avatar ${formState.avatarId}`}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
