import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';
import {
	fontColors,
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Select } from '../select';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { ArticleStateType } from 'src/constants/articleProps';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';
import { useClose } from 'src/hooks/useClose';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (params: any) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const formRef = useRef<HTMLElement | null>(null);
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

	useClose({
		isOpen: isOpenForm,
		onClose: () => setIsOpenForm(false),
		rootRef: formRef,
	});

	useOutsideClickClose({
		isOpen: isOpenForm,
		rootRef,
		onClose: () => setIsOpenForm(false),
		onChange: setIsOpenForm,
	});

	const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
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

	const formResetHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setNewFontColor(defaultArticleState.fontColor);
		setNewFontSize(defaultArticleState.fontSizeOption);
		setNewFontFamily(defaultArticleState.fontFamilyOption);
		setNewBackgroundColor(defaultArticleState.backgroundColor);
		setNewContentWidth(defaultArticleState.contentWidth);
		setCurrentArticleState({
			...currentArticleState,
			fontColor: defaultArticleState.fontColor,
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
			fontSizeOption: defaultArticleState.fontSizeOption,
		});
	};

	return (
		<>
			<ArrowButton onClick={setIsOpenForm} isOpenForm={isOpenForm} />
			<div
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
			</div>
		</>
	);
};
