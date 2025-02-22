import styles from "./HealthAndFitnessCard.module.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";

export default function HealthAndFitnessCard({
  details,
  handleDelete,
  handleEdit,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.cardInfo}>
          <h5>{details.description}</h5>
          <p>
            {`Calories Intake = ${details.calorieIntake}`}
            &nbsp; {`Calories Burned = ${details.calorieBurned}`}
          </p>
        </div>
      </div>

      <div className={styles.cardInner}>
        <p className={styles.cardPrice}>{details.date}</p>
        <div className={styles.cardButtonWrapper}>
          <button className={styles.cardDelete} onClick={handleDelete}>
            <IoMdCloseCircleOutline />
          </button>
          <button className={styles.cardEdit} onClick={handleEdit}>
            <MdOutlineModeEdit />
          </button>
        </div>
      </div>
    </div>
  );
}
