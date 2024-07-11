import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";

import "react-day-picker/dist/style.css";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean
    changeGuestsInput: () => void
    setDestination: (destination: string) => void
    eventIntervalDates: DateRange | undefined
    setEventIntervalDates: (dates: DateRange | undefined) => void
}

export function DestinationAndDateStep({isGuestsInputOpen, changeGuestsInput, setDestination, eventIntervalDates, setEventIntervalDates}: DestinationAndDateStepProps)
{
  const [isDatePickeOpen, setIsDatePickeOpen] = useState(false)

  function changeDatePicker()
  {
    setIsDatePickeOpen(!isDatePickeOpen)
  }

  const displayedDate = eventIntervalDates && eventIntervalDates.from && eventIntervalDates.to ? format(eventIntervalDates.from, "d' de 'LLL'").concat(' até ').concat(format(eventIntervalDates.to, "d' de 'LLL")) : null

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">

        <div className="flex items-center gap-2 flex-1">
          <MapPin className="size-5 text-zinc-400" />
          <input 
            disabled={isGuestsInputOpen} 
            onChange={event => setDestination(event.target.value)}
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
            type="text" 
            placeholder="Para onde você vai?" 
          />
        </div>

        <button disabled={isGuestsInputOpen} onClick={changeDatePicker} className="flex items-center gap-2 outline-none text-left w-[240px]">
          <Calendar className="size-5 text-zinc-400" />
          <span className="bg-transparent text-lg text-zinc-400 w-40 flex-1">
            { displayedDate || 'Quando?'}
          </span>
        </button>

        { isDatePickeOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Selecione a data</h2>
                  <button>
                    <X className="size-5 text-zinc-400" onClick={changeDatePicker} />
                  </button>
                </div>
              </div>

              <div className="w-full h-px bg-zinc-800" />

              <DayPicker 
                mode="range" 
                locale={ptBR}
                disabled={{ before: new Date()}}
                selected={eventIntervalDates} 
                onSelect={setEventIntervalDates}  
              />
            </div>
          </div>
        )}

        <div className="w-px h-6 bg-zinc-800" />

        { isGuestsInputOpen ?
        (
          <Button 
            variant="secondary"
            onClick={changeGuestsInput}
          >
            Alterar local/data
            <Settings2 className="size-5" />
          </Button>
        ) : 
        (
          <Button 
            onClick={changeGuestsInput}
          >
            <ArrowRight className="size-5" />
            Continuar
          </Button>
        )}
    </div>
  )
}