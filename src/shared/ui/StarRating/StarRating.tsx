import { memo, useState } from 'react';
import { classNames } from '../../../shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import { Icon } from '../../../shared/ui/Icon/Icon';
import StarIcon from '../../assets/icons/star.svg';

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const {
        className, size = 30, selectedStars = 0, onSelect,
    } = props;
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars); // на какую из звезд пользователь направил мышь
    // на 5-ую, подсвечиваются 5 звезд, на 2-ую - две
    const [isHovered, setIsHovered] = useState(false); // подсвечивать над какой звездой
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars)); // если пользователь выбрал количество звезд

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount);
            // когда водим курсором мыши по звездам, происходит обновление текущего количества звезд
        }
    };
    // зачем использовать замыкание в функциях компонента StarRating onHover и onClick
    // OnClick по умолчанию для кнопок и всех элементов принимает event аргументом,
    //  а нам надо еще и номер звезды передать, поэтому мы этот номер замыкаем внутри

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0); // когда курсор мыши уходит за пределы звезд, текущее количество звезд обнуляется
        }
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrentStarsCount(starsCount);
            setIsSelected(true);
        }
    };

    return (
        <div className={classNames(cls.StarRating, {}, [className])}>
            {stars.map((starIndex) => (
                <Icon
                    className={classNames(
                        cls.starIcon,
                        { [cls.selected]: isSelected },
                        [currentStarsCount >= starIndex ? cls.hovered : cls.normal],
                    )}
                    Svg={StarIcon}
                    key={starIndex}
                    width={size}
                    height={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(starIndex)}
                    onClick={onClick(starIndex)}
                    data-testid={`StarRating.${starIndex}`}
                    data-selected={currentStarsCount >= starIndex}
                />

            ))}
        </div>
    );
});
