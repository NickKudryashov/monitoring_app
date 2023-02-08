import { DefaultAuth } from 'features/DefaultAuth/ui/DefaultAuth'
// import { FirstFet } from 'features/FirstFet/FirstFet'
import React, { useState } from 'react'
import { AppCheckbox } from 'shared/ui/AppCheckbox/AppCheckbox'
import { AppInput } from 'shared/ui/AppInput/AppInput'
import { AppTab } from 'shared/ui/AppTab/AppTab'

const MainPage = () => {
  const [value,setValue] = useState('')
  const [value1,setValue1] = useState(false)
  const [available,setAv] = useState<boolean>(false)
  const checkboxChanging = (arg:boolean)=> {
    available === true && setValue1(arg)
  }
  return (
    <div>
      ГЛАВНАЯ
      {/* <AppTab
      tabs={[
        {name:'Чекбокс',Content:AppCheckbox,contentProps:{checked:value1,onChange:checkboxChanging,label:'Это чекбокс с текстом'}},
        {name:'Инпут',Content:AppInput,contentProps:{onChange:setValue,value}}]}
      /> */}
      {/* <AppInput 
        onChange={setValue}
        value={value}
      /> */}
      {/* <button onClick={()=>setAv(!available)}>Сделать доступным чекбокс</button> */}
    </div>
  )
}

export default MainPage
