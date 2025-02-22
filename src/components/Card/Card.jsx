import styles from './Card.module.css';

export default function Card({ title, buttonText, setIsOpenhealthAndFitness }) {
    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>
                {title}
            </h3>
            <button className={styles.cardButton} onClick={() => setIsOpenhealthAndFitness(true)}>{buttonText}</button>
        </div>
    );
}