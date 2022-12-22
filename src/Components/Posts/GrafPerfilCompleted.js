import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";



export function GrafPerfilCompleted({UserLogged}) {
   var [dataCount, setdataCount] = useState(5)
   const data = [
    ["Task", "Hours per Day"],
    ["Completo", dataCount ],
    ["Incompleto",5 - dataCount],
    
  ];
  
   const options = {
    title: dataCount === 5 ? "Perfil completo" : "Complete seu perfil",
    is3D: true,
  };
 
  useEffect(()=>{
    const c = 0
    if (UserLogged.proficao === null) {
      setdataCount(dataCount-=1)
    }
    if (UserLogged.idade === null) {
      setdataCount(dataCount-=1)
    }
    if (UserLogged.fotoDePerfil === null) {
      setdataCount(dataCount-=1)
    }
    if (UserLogged.nome === null) {
      setdataCount(dataCount-=1)
    }
    if (UserLogged.email === null) {
      setdataCount(dataCount-=1)
    }

  },[])
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
      className='Chart'
      
    />
  );
}