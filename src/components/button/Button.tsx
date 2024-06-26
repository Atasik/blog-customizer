import { Text } from 'components/text';
import clsx from 'clsx';
import styles from './Button.module.scss';

export const Button = ({
	title,
	onClick,
	type,
}: {
	title: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}) => {
	return (
		<button
			className={clsx(
				styles.button,
				{ [styles.button_submit]: type === 'submit' },
				{ [styles.button_reset]: type === 'reset' }
			)}
			type={type}
			onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
