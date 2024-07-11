import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { InviteGuestsModal } from "./invite-guests-modal"
import { ConfirmTripModal } from "./confirm-trip-modal"
import { DestinationAndDateStep } from "./steps/destination-and-date-step"
import { InviteGuestsStep } from "./steps/invite-guests-step"
import { DateRange } from "react-day-picker"
import { api } from "../../lib/axios"

export function CreateTripPage() {

  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventIntervalDates, setEventIntervalDates] = useState<DateRange | undefined>()

  const [emailsToInvite, setEmailsToInvite] = useState([
    "jessica.white44@yahoo.com",
    "erik_leffler3@gmail.com",
    "rebekah.conn21@gmail.com",
    "emile.mayer25@yahoo.com",
    "justus_hessel81@hotmail.com",
    "hellen_graham@yahoo.com",
    "kole.schiller27@yahoo.com"
  ])

  function changeGuestsInput()
  {
    setIsGuestsInputOpen(!isGuestsInputOpen)
  }

  function changeGuestsModal()
  {
    setIsGuestsModalOpen(!isGuestsModalOpen)
  }

  function changeConfirmTripModal()
  {
    setIsConfirmTripModalOpen(!isConfirmTripModalOpen)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>)
  {
    event.preventDefault();

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if(!email) return
    if(emailsToInvite.includes(email)) return
    
    setEmailsToInvite([
      ...emailsToInvite, 
      email
    ])

    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string)
  {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)

    setEmailsToInvite(newEmailList)
  }

  async function createTrip(event: FormEvent<HTMLFormElement>)
  {
    event.preventDefault()

    if(!destination) {
      return
    }

    if(!eventIntervalDates?.from || !eventIntervalDates?.to) {
      return
    }

    if(emailsToInvite.length === 0) {
      return
    }

    if(!ownerName || !ownerEmail) {
      return
    }

    console.log(destination)
    console.log(eventIntervalDates)
    console.log(emailsToInvite)
    console.log(ownerName)
    console.log(ownerEmail)

    const response = await api.post('/trips', 
    {
      destination,
      starts_at: eventIntervalDates.from,
      ends_at: eventIntervalDates.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail
    })

    const { tripId } = response.data
    navigate(`/trips/${tripId}`)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            changeGuestsInput={changeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            setDestination={setDestination}
            eventIntervalDates={eventIntervalDates}
            setEventIntervalDates={setEventIntervalDates}
          />

          { isGuestsInputOpen && 
          (
            <InviteGuestsStep
              changeConfirmTripModal={changeConfirmTripModal}
              changeGuestsModal={changeGuestsModal}
              emailsToInvite={emailsToInvite}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
        Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
        com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
        </p>
      </div>

      { isGuestsModalOpen &&
        (
          <InviteGuestsModal 
            changeGuestsModal={changeGuestsModal}
            addEmailToInvite={addNewEmailToInvite}
            removeEmailFromInvites={removeEmailFromInvites}
            emailsToInvite={emailsToInvite}
          />
        )
      }
      { isConfirmTripModalOpen && (
        <ConfirmTripModal 
          destination={destination}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
          changeConfirmTripModal={changeConfirmTripModal}
          createTrip={createTrip}
        />
      )}
    </div>
  )
}
