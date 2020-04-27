import React, {useEffect, useState} from "react";
import './home.less'
import Statistics from "../../components/home/statistics";
import Detailed from "../../components/home/detailedChart";
import SalesChart from "../../components/home/salesChart";


const Home = () => {


  useEffect(() => {

  }, []);


  return (
      <>
        <Statistics/>
        <Detailed/>
        <SalesChart/>
        <div>

        </div>
      </>
  )
}

export default Home