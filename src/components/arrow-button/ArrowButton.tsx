import arrow from 'src/images/arrow.svg';
import { clsx } from 'clsx';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = (state: boolean) => void;

export const ArrowButton = ({
	onClick,
	isOpenForm,
}: {
	onClick: OnClick;
	isOpenForm?: boolean;
}) => {
	const arrowClickHandler = () => {
		onClick?.(!isOpenForm);
	};

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, {
				[styles.container_open]: isOpenForm,
			})}
			onClick={arrowClickHandler}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isOpenForm })}
			/>
		</div>
	);
};
