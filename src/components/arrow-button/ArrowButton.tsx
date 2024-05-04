import arrow from 'src/images/arrow.svg';
import { SyntheticEvent, useEffect, useState } from 'react';
import { clsx } from 'clsx';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = (state: boolean) => void;

export const ArrowButton = ({onClick, isOpenForm} :{onClick: OnClick; isOpenForm?: boolean}) =>{
	const arrowClickHandler = () => {
		onClick?.(!isOpenForm)
	}

	useEffect(() => {
		console.log("RENDER")
	}, []);

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, {[styles.container_open]: isOpenForm})}
			onClick = {(e: SyntheticEvent) => {
				e.stopPropagation()
				arrowClickHandler()
			}}>
			<img src={arrow} alt='иконка стрелочки' className={clsx(styles.arrow, {[styles.arrow_open]: isOpenForm})} />
		</div>
	);
};
