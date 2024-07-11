import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestsStepProps {
    changeGuestsModal: () => void
    emailsToInvite: string[]
    changeConfirmTripModal: () => void
}

export function InviteGuestsStep({changeGuestsModal, emailsToInvite, changeConfirmTripModal}: InviteGuestsStepProps)
{
    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">

            <button type="button" onClick={changeGuestsModal} className="flex items-center gap-2 flex-1">
            <UserRoundPlus className="size-5 text-zinc-400" />
            { emailsToInvite.length > 0 ? (
                <span className="text-zinc-100 text-lg flex-1 text-left">
                    {emailsToInvite.length} pessoas convidadas
                </span>
                ) : (
                <span className="text-zinc-400 text-lg flex-1 text-left">
                    Quem estará na viagem?
                </span>
                )
            }
            </button>

            <div className="w-px h-6 bg-zinc-800" />

            <Button 
                onClick={changeConfirmTripModal}
            >
                <ArrowRight className="size-5" />
                Confirmar viagem
            </Button>
        </div>
    )
}