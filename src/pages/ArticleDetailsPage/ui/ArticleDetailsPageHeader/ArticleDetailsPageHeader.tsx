import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '../../../../entities/User';
import { getRouteArticleEdit, getRouteArticles } from '../../../../shared/const/router';
import { Button, ButtonTheme } from '../../../../shared/ui/Button/Button';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { getArticleDetailsData } from '../../../../entities/Article/model/selectors/articleDetails';
import { getCanEditArticle } from '../../../../pages/ArticleDetailsPage/model/selectors/article';
import { HStack } from '../../../../shared/ui/Stack';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const authData = useSelector(getUserAuthData);
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    const onBackToList = useCallback(() => {
        navigate(getRouteArticles());
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        if (article) {
            navigate(getRouteArticleEdit(article.id));
        }
    }, [article, navigate]);

    return (
        <HStack max justify="between" className={classNames('', {}, [className])}>
            <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                {t('Back to list')}
            </Button>
            {canEdit && (
                <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={onEditArticle}
                >
                    {t('Edit')}
                </Button>
            )}
        </HStack>
    );
});
