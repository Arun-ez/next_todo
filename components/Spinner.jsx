import styles from '@/styles/Spinner.module.css';

const Spinner = () => {
    return (
        <div className={styles.spinner}>
            <div className={styles.spinner_inner} />
        </div>
    );
};

export { Spinner };