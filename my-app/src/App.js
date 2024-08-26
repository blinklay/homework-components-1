import { useState } from "react";
import styles from "./app.module.css"

const formatDate = (date) => {
	return new Intl.DateTimeFormat('ru-RU').format(date) + " " + date.toISOString().substring(11, 19)
}

function App() {
	const [value, setValue] = useState("")
	const [list, setList] = useState([])
	const [error, setError] = useState("")

	const isValueVaild = value.length >= 3 ? false : true

	const onInputButtonClick = () => {
		const promptValue = prompt()

		if (!promptValue || promptValue.length < 3) {
			setError("Введенное значение должно содержать минимум 3 символа")
			return
		} else {
			setValue(promptValue)
		}

	}

	const onAddButtonClick = () => {
		if (value.length >= 3) {
			setList(prev => [...prev, { id: Date.now(), value: value, date: formatDate(new Date()) }])
			setValue("")
			setError("")
		}
	}

	return (
		<div className={styles["app"]}>
			<h1 className={styles["page-heading"]}>Ввод значения</h1>
			<p className={styles["no-margin-text"]}>
				Текущее значение <code>value</code>: "<output className={styles["current-value"]}>{value}</output>"
			</p>
			{
				error !== "" && <div className={styles["error"]}>{error}</div>
			}
			<div className={styles["buttons-container"]}>
				<button onClick={onInputButtonClick} className={styles["button"]}>Ввести новое</button>
				<button onClick={onAddButtonClick} className={styles["button"]} disabled={isValueVaild}>Добавить в список</button>
			</div>
			<div className={styles["list-container"]}>
				<h2 className={styles["list-heading"]}>Список:</h2>
				{
					list.length === 0 ? (
						<p className={styles["no-margin-text"]}>Нет добавленных элементов</p>

					) : (
						<ul className={styles["list"]}>
							{
								list.map(({ id, value, date }) => (
									<li className={styles["list-item"]} key={id}>{value} ({date})</li>
								))
							}
						</ul>
					)
				}
			</div>
		</div>
	);
}

export default App;
