import { useEffect, useState } from "react"
import { ref, onValue, set } from "firebase/database"
import { db } from "./firebase"

function TestFirebase() {
  const [kipas, setKipas] = useState(null)
  const [exhaust, setExhaust] = useState(false)

  useEffect(() => {
    const dataRef = ref(db, "hatchery/Data/Kipas")
    const exhaustRef = ref(db, "hatchery/control/exhaust")

    onValue(dataRef, snapshot => {
      setKipas(snapshot.val())
    })

    onValue(exhaustRef, snapshot => {
      setExhaust(snapshot.val())
    })
  }, [])

  const toggleExhaust = () => {
    set(ref(db, "hatchery/control/exhaust"), !exhaust)
  }

  return (
    <div>
      <h3>Monitoring Hatchery</h3>

      <p>Kipas: {kipas}</p>

      <p>Exhaust: {exhaust ? "ON" : "OFF"}</p>

      <button onClick={toggleExhaust}>
        Toggle Exhaust
      </button>
    </div>
  )
}

export default TestFirebase
