import { Calendar, Tag, X } from "lucide-react"
import { Button } from "../../components/button"

interface CreateActivityModalProps
{
    changeCreateActivityModal: () => void
    
}

export function CreateActivityModal({ changeCreateActivityModal }: CreateActivityModalProps)
{
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
                <button>
                    <X className="size-5 text-zinc-400" onClick={changeCreateActivityModal} />
                </button>
                </div>

                <p className="text-sm text-zinc-400">
                    Todos convidados podem visualizar as atividades.
                </p>
            </div>

            <div className="w-full h-px bg-zinc-800" />

            <form className="space-y-3">
                <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
                    <Tag className="text-zinc-400 size-5" />
                    <input 
                        name="name"
                        placeholder="Qual a atividade?"  
                        className=" bg-transparent placeholder-zinc-400 outline-none flex-1"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-14 flex-1 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
                        <Calendar className="text-zinc-400 size-5" />
                        <input 
                            type="datetime-local"
                            name="occurs_at"
                            placeholder="17/08/2023 08:00"  
                            className=" bg-transparent placeholder-zinc-400 outline-none flex-1"
                        />
                    </div>
                </div>

                <Button variant="primary" size="full">
                    Salvar atividade
                </Button>
            </form>
            </div>
        </div>
    )
}