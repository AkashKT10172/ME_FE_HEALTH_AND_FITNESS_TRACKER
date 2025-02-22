import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import styles from "./Home.module.css";
import HealthAndFitnessList from "../../components/healthAndFitnessList/HealthAndFitnessList_temp.jsx";
import HealthAndFitnessForm from "../../components/Forms/healthAndFitnessForm/HealthAndFitnessForm";
import Modal from "../../components/Modal/Modal";
import PieChart from "../../components/PieChart/PieChart";
import BarChart_temp from "../../components/BarChart/BarChart_temp.jsx";

export default function Home() {
  const [healthList, setHealthList] = useState([]);
  const [isOpenhealthAndFitness, setIsOpenhealthAndFitness] = useState(false);
  const [totalIntake, setTotalIntake] = useState(0);
  const [totalBurned, setTotalBurned] = useState(0);
  const [barChatData, setBarChartData] = useState([]);

  useEffect(() => {
    const storedHnF = localStorage.getItem("healthAndFitness");
    if (storedHnF) {
      try {
        const parsedHnF = JSON.parse(storedHnF);
        setHealthList(parsedHnF);
      } catch (error) {
        localStorage.removeItem("healthAndFitness");
        setHealthList([]);
      }
    }
  }, []);

  useEffect(() => {
    if (healthList.length > 0) {
      localStorage.setItem("healthAndFitness", JSON.stringify(healthList));
  
      const intakeCount = healthList.reduce((a, b) => a + parseInt(b.calorieIntake || 0), 0);
      const burnedCount = healthList.reduce((a, b) => a + parseInt(b.calorieBurned || 0), 0);
  
      setTotalBurned(burnedCount);
      setTotalIntake(intakeCount);
      const sevenDaysData = healthList
      .filter((item) => {
        const itemDate = new Date(item.date); // Assuming `date` is in YYYY-MM-DD format
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return itemDate >= sevenDaysAgo;
      })
      .map(({ date, calorieIntake, calorieBurned }) => ({
        date,
        calorieIntake,
        calorieBurned,
      }));
    setBarChartData(sevenDaysData);
    }
  }, [healthList]);
  
  const pieChartData = [
    { name: "Intake", value: totalIntake },
    { name: "Burned", value: totalBurned },
  ];

  return (
    <div className={styles.container}>
      <h1>Health And Fitness Tracker</h1>

      <div className={styles.cardsWrapper}>
        <Card
          title="Update Today's Data"
          buttonText="+ Add data"
          isOpenhealthAndFitness = {isOpenhealthAndFitness}
          setIsOpenhealthAndFitness={setIsOpenhealthAndFitness}
        />

        <BarChart_temp data={barChatData} />
      </div>

      <div className={styles.transactionsWrapper}>
        <HealthAndFitnessList
          healthList={healthList}
          setHealthList={setHealthList}
          title="Recent Health Statistics."
        />
        <PieChart data={pieChartData} />
      </div>

      <Modal isOpen={isOpenhealthAndFitness} setIsOpen={setIsOpenhealthAndFitness}>
        <HealthAndFitnessForm
          setIsOpen={setIsOpenhealthAndFitness}
          healthList={healthList}
          setHealthList={setHealthList}
        />
      </Modal>
    </div>
  );
}
