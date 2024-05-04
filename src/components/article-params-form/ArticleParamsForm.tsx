import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';
import {
	fontColors,
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from '../select';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useRef, useState } from 'react';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { ArticleStateType } from 'src/constants/articleProps';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (params: any) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
	const [newFontColor, setNewFontColor] = useState(
		currentArticleState.fontColor
	);
	const [newFontFamily, setNewFontFamily] = useState(
		currentArticleState.fontFamilyOption
	);
	const [newBackgroundColor, setNewBackgroundColor] = useState(
		currentArticleState.backgroundColor
	);
	const [newContentWidth, setNewContentWidth] = useState(
		currentArticleState.contentWidth
	);
	const [newFontSize, setNewFontSize] = useState(
		currentArticleState.fontSizeOption
	);

	useOutsideClickClose({
		isOpen: isOpenForm,
		rootRef,
		onClose: () => setIsOpenForm(false),
		onChange: setIsOpenForm,
	});

	const formSubmitHandler = (e: SyntheticEvent) => {
		e.preventDefault();

		setCurrentArticleState({
			...currentArticleState,
			fontColor: newFontColor,
			fontFamilyOption: newFontFamily,
			backgroundColor: newBackgroundColor,
			contentWidth: newContentWidth,
			fontSizeOption: newFontSize,
		});
	};

	const formResetHandler = (e: SyntheticEvent) => {
		e.preventDefault();
		setNewFontColor(fontColors[0]);
		setNewFontSize(fontSizeOptions[0]);
		setNewFontFamily(fontFamilyOptions[0]);
		setNewBackgroundColor(backgroundColors[0]);
		setNewContentWidth(contentWidthArr[0]);
		setCurrentArticleState({
			...currentArticleState,
			fontColor: fontColors[0],
			fontFamilyOption: fontFamilyOptions[0],
			backgroundColor: backgroundColors[0],
			contentWidth: contentWidthArr[0],
			fontSizeOption: fontSizeOptions[0],
		});
	};

	return (
		<>
			<ArrowButton onClick={setIsOpenForm} isOpenForm={isOpenForm} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, isOpenForm && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={formSubmitHandler}
					onReset={formResetHandler}
					style={{ flexDirection: 'column', gap: 50 }}>
					<Text as='h2' size={31} weight={800} uppercase family='open-sans'>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={newFontFamily}
						title='шрифт'
						onChange={setNewFontFamily}
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={newFontSize}
						title='размер шрифта'
						name='размер шрифта'
						onChange={setNewFontSize}
					/>
					<Select
						options={fontColors}
						selected={newFontColor}
						title='цвет шрифта'
						onChange={setNewFontColor}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={newBackgroundColor}
						title='цвет фона'
						onChange={setNewBackgroundColor}
					/>
					<Select
						options={contentWidthArr}
						selected={newContentWidth}
						title='ширина контента'
						onChange={setNewContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
