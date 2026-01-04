import { useEffect, useState } from "react";
import images from "./assets/images"
import { ref, onValue, set } from "firebase/database"
import { db } from "./firebase"

const App = () => {
  const [humidity, setHumidity] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [mode, setMode] = useState(false);
  const [lamp, setLamp] = useState(false);
  const [exaust, setExaust] = useState(false);
  const [kipas, setKipas] = useState(false);
  const [zikir, setZikir] = useState(0);

  useEffect(() => {
    const dataRefHumidity = ref(db, "hatchery/Data/Kelembaban")
    const dataRefTemperature = ref(db, "hatchery/Data/Suhu")
    const modeRef = ref(db, "hatchery/Control/Mode")
    const lampRef = ref(db, "hatchery/Control/Lampu")
    const exaustRef = ref(db, "hatchery/Control/Exhaust")
    const kipasRef = ref(db, "hatchery/Control/Sirkulasi")

    onValue(lampRef, snapshot => {
      setLamp(snapshot.val())
    })

    onValue(exaustRef, snapshot => {
      setExaust(snapshot.val())
    })

    onValue(kipasRef, snapshot => {
      setKipas(snapshot.val())
    })

    onValue(modeRef, snapshot => {
      setMode(snapshot.val())
    })

    onValue(dataRefHumidity, snapshot => {
      setHumidity(snapshot.val())
    })

    onValue(dataRefTemperature, snapshot => {
      setTemperature(snapshot.val())
    })
  }, [])

  const toggleMode = () => {
    set(ref(db, "hatchery/Control/Mode"), !mode)
  }

  const toggleLamp = () => {
    set(ref(db, "hatchery/Control/Lampu"), !lamp)
  }

  const toggleExaust = () => {
    set(ref(db, "hatchery/Control/Exhaust"), !exaust)
  }

  const toggleKipas = () => {
    set(ref(db, "hatchery/Control/Sirkulasi"), !kipas)
  }

  return (
    <div className="bg-white h-screen md:h-full lg:pb-80 w-screen">
      <div className="header h-20 px-9 bg-gray-0 flex items-center">
        <img src={images.logo}
          alt="Logo"
          className="h-15" />
      </div>
      <div className="mx-9 grid grid-cols-2 gap-3 h-50 text-gray-500">
        <div className="shadow-lg bg-gray-100 flex flex-col rounded-3xl items-center justify-center gap-2">
          <h1 className="text-blue-400 radial-progress shadow-lg"
            style={{ "--value": temperature }}
            aria-valuenow={0}
            role="progressbar">{temperature}°C</h1>
          <h1 className="text-1xl">Suhu</h1>
        </div>
        <div className="shadow-lg bg-gray-100 flex flex-col rounded-3xl items-center justify-center gap-2">
          <h1 className="text-blue-400 radial-progress shadow-lg"
            style={{ "--value": humidity }}
            aria-valuenow={0}
            role="progressbar">{humidity}%</h1>
          <h1 className="text-1xl">Kelembapan</h1>
        </div>
      </div>
      {/* <div className="shadow-lg mt-8 mx-9 flex flex-col gap-0 justify-center items-center h-20 bg-gray-100 rounded-3xl">
        <h1 className="text-2xl text-blue-400">10 menit lagi</h1>
        <h1 className="text-2xl text-gray-500">Rak Berotasi</h1>
      </div> */}
      <div className="shadow-lg mt-8 mx-9 flex flex-col gap-0 justify-center items-center h-20 bg-gray-100 rounded-3xl">
        <input type="checkbox"
          // defaultChecked
          checked={mode}
          onChange={() => toggleMode()}
          className="toggle toggle-primary bg-gray-800" />
        <h1 className="text-2xl text-gray-500">Mode Manual</h1>
      </div>

      {/* Button */}
      {mode &&
        (< div className="grid grid-cols-2 gap-3 items-center justify-center shadow-lg mt-4 px-6 py-4 mx-9 rounded-2xl bg-gray-100">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-3">
              <h1 className="text-gray-800">Lampu</h1>
              <input type="checkbox"
                checked={lamp}
                onChange={() => toggleLamp()}
                className="toggle toggle-primary bg-gray-800" />
            </div>
            <div className="flex justify-between gap-3">
              <h1 className="text-gray-800">Exaust</h1>
              <input type="checkbox"
                checked={exaust}
                onChange={() => toggleExaust()}
                className="toggle toggle-primary bg-gray-800" />
            </div>
            <div className="flex justify-between gap-3">
              <h1 className="text-gray-800">Kipas</h1>
              <input type="checkbox"
                checked={kipas}
                onChange={() => toggleKipas()}
                className="toggle toggle-primary bg-gray-800" />
            </div>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <h1 className="text-gray-800 font-bold">Tombol Zikir</h1>
            <h1 className="text-gray-800 text-sm">{zikir}</h1>
            <button
              onClick={() => setZikir(zikir + 1)}
              className="
              btn
              btn-primary 
              btn-circle 
              btn-lg
              bg-blue-300 
              shadow-[0_6px_0_#3730a3]
              transition-all duration-100
              active:translate-y-1
              active:shadow-[0_2px_0_#3730a3]
            "></button>
          </div>
        </div >
        )}
    </div >
  )
}

export default App