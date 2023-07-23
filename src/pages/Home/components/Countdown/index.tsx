import { useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";

export function Countdown() {
  
  const [amountSecondsPassed, setAmountSecondsPassed] = useFormState(0)

  
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  
  // estou usando para reduzir o Countdown
  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        // calculando a diferenca em segundos do tempo atual e do tempo passado
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )
        // se esse primeiro if for verdadeiro, significa que acabou o ciclo
        if (secondsDifference >= totalSeconds) {
          // e aqui estou atualizando o valor do finishedDate para a data que o ciclo acabou
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return {
                  ...cycle,
                  finishedDate: new Date(),
                }
              }
              return cycle
            }),
          )

          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId])


  return(
  <CountdownContainer>
    <span>{minutes[0]}</span>
    <span>{minutes[1]}</span>
    <Separator>:</Separator>
    <span>{seconds[0]}</span>
    <span>{seconds[1]}</span>
  </CountdownContainer>
}
)