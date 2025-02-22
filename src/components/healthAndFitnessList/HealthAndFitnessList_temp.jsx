import styles from './healthAndFitnessList.module.css'
import Modal from '../Modal/Modal'
import { useEffect, useState } from 'react'
import Pagination from '../Pagination/Pagination'
import HealthAndFitnessCard from '../healthAndFitnessCard/HealthAndFitnessCard_temp'
import EditHealthAndFitnessForm from '../Forms/edithealthAndFitnessForm/EditHealthAndFitnessForm'

export default function HealthAndFitnessList({ healthList, setHealthList, title }) {

    const [editId, setEditId] = useState(0)
    const [isDisplayEditor, setIsDisplayEditor] = useState(false)
    const [currenthealthAndFitness, setCurrenthealthAndFitness] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const maxRecords = 3;
    const [totalPages, setTotalPages] = useState(0)

    const handleDelete = (id) => {
        const updatedHealthList = healthList.filter(item => item.id !== id);
        setHealthList(updatedHealthList);
        localStorage.setItem("healthAndFitness", JSON.stringify(updatedHealthList));
    };

    const handleEdit = (id) => {
        setEditId(id)
        setIsDisplayEditor(true)
    }

    useEffect(() => {

        const startIndex = (currentPage - 1) * maxRecords
        const endIndex = Math.min(currentPage * maxRecords, healthList.length)

        setCurrenthealthAndFitness([...healthList].slice(startIndex, endIndex))
        setTotalPages(Math.ceil(healthList.length / maxRecords))

    }, [currentPage, healthList])

    // update page if all items on current page have been deleted
    useEffect(() => {

        if(totalPages < currentPage && currentPage > 1){
            setCurrentPage(prev => prev - 1)
        }

    }, [totalPages])

    return (
        <div className={styles.habitListWrapper}>

            {title && <h2>{title}</h2>}

            {healthList.length > 0 ?
                <div className={styles.list}>
                    <div>
                        {currenthealthAndFitness.map(health => (
                            <HealthAndFitnessCard
                                details={health}
                                key={health.id}
                                handleDelete={() => handleDelete(health.id)}
                                handleEdit={() => handleEdit(health.id)}
                            />
                        ))}
                    </div>
                    {totalPages > 1 && (<Pagination updatePage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />)}
                </div>
                : (
                    <div className={styles.emptyHabitListWrapper}>
                        <p>No Progress to show!</p>
                    </div>
                )
            }


            <Modal isOpen={isDisplayEditor} setIsOpen={setIsDisplayEditor}>
                <EditHealthAndFitnessForm
                    healthList={healthList}
                    setHealthList={setHealthList}
                    editId={editId}
                    setIsOpen={setIsDisplayEditor}
                />
            </Modal>
        </div>
    )
}