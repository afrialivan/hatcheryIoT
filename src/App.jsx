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
  const [suhuMaks, setSuhuMaks] = useState(40);
  const [suhuMin, setSuhuMin] = useState(35);
  const [inputSuhuMaks, setInputSuhuMaks] = useState("40");
  const [inputSuhuMin, setInputSuhuMin] = useState("35");

  useEffect(() => {
    const dataRefHumidity = ref(db, "hatchery/Data/Kelembaban")
    const dataRefTemperature = ref(db, "hatchery/Data/Suhu")
    const modeRef = ref(db, "hatchery/Control/Mode")
    const lampRef = ref(db, "hatchery/Control/Lampu")
    const exaustRef = ref(db, "hatchery/Control/Exhaust")
    const kipasRef = ref(db, "hatchery/Control/Sirkulasi")
    const suhuMaksRef = ref(db, "hatchery/Control/suhu_maks")
    const suhuMinRef = ref(db, "hatchery/Control/suhu_min")

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

    onValue(suhuMaksRef, snapshot => {
      const val = snapshot.val()
      if (val !== null) {
        setSuhuMaks(val)
        setInputSuhuMaks(String(val))
      }
    })

    onValue(suhuMinRef, snapshot => {
      const val = snapshot.val()
      if (val !== null) {
        setSuhuMin(val)
        setInputSuhuMin(String(val))
      }
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

  const handleSaveSuhu = () => {
    const maks = parseFloat(inputSuhuMaks)
    const min = parseFloat(inputSuhuMin)

    if (isNaN(maks) || isNaN(min)) {
      alert("Masukkan angka yang valid untuk batas suhu.")
      return
    }

    if (min >= maks) {
      alert("Suhu minimum harus lebih kecil dari suhu maksimum.")
      return
    }

    set(ref(db, "hatchery/Control/suhu_maks"), maks)
    set(ref(db, "hatchery/Control/suhu_min"), min)
  }

  return (
    <div className="bg-white h-screen md:h-full lg:pb-80 w-screen">
      <div className="header h-20 px-9 bg-gray-0 flex items-center">
        <img src={images.logo}
          alt="Logo"
          className="h-15" />
      </div>

      {/* Sensor Cards */}
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

      {/* Mode Manual Toggle */}
      <div className="shadow-lg mt-8 mx-9 flex flex-col gap-0 justify-center items-center h-20 bg-gray-100 rounded-3xl">
        <input type="checkbox"
          checked={mode}
          onChange={() => toggleMode()}
          className="toggle toggle-primary bg-gray-800" />
        <h1 className="text-2xl text-gray-500">Mode Manual</h1>
      </div>

      {/* Kontrol Manual */}
      {mode &&
        (<div className="grid grid-cols-2 gap-3 items-center justify-center shadow-lg mt-4 px-6 py-4 mx-9 rounded-2xl bg-gray-100">
          <div className="flex flex-col gap-2">
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
          <div className="flex justify-between gap-3">
            <h1 className="text-gray-800">Lampu</h1>
            <input type="checkbox"
              checked={lamp}
              onChange={() => toggleLamp()}
              className="toggle toggle-primary bg-gray-800" />
          </div>
        </div>
        )}


        {/* Batas Suhu */}
      <div className="shadow-lg mt-8 mx-9 bg-gray-100 rounded-3xl px-6 py-5">
        <h1 className="text-lg text-gray-600 font-semibold mb-4">Batas Suhu</h1>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">Suhu Minimum</label>
            <input
              type="number"
              value={inputSuhuMin}
              onChange={(e) => setInputSuhuMin(e.target.value)}
              className="input input-bordered w-full text-center text-gray-800 bg-white"
              placeholder="Min"
            />
            <span className="text-xs text-gray-400 text-center">Tersimpan: {suhuMin}°C</span>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">Suhu Maksimum</label>
            <input
              type="number"
              value={inputSuhuMaks}
              onChange={(e) => setInputSuhuMaks(e.target.value)}
              className="input input-bordered w-full text-center text-gray-800 bg-white"
              placeholder="Maks"
            />
            <span className="text-xs text-gray-400 text-center">Tersimpan: {suhuMaks}°C</span>
          </div>
        </div>
        <button
          onClick={handleSaveSuhu}
          className="btn btn-primary w-full bg-blue-400 border-none text-white hover:bg-blue-500"
        >
          Simpan Batas Suhu
        </button>
      </div>


    </div>
    
  )
}

export default App