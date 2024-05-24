import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '../../../../widgets/Page/ui/Page';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { id } = useParams<{id: string}>();
    const isEdit = Boolean(id); // если id есть в строке запроса, то это редактирование, если нет, создание статьи

    return (
        <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
            {isEdit
                ? t('Editing an article with ID') + id
                : t('Create a new article')}
        </Page>
    );
});

export default ArticleEditPage;
