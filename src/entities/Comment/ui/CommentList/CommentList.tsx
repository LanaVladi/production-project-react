import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Text } from '../../../../shared/ui/Text/Text';
import clss from './CommentList.module.scss';
import { CommentCard } from '../CommentCard/CommentCard';
import { Comment } from '../../model/types/comment';

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
    const { className, isLoading, comments } = props;
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div className={classNames(clss.CommentList, {}, [className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </div>
        );
    }

    return (
        <div className={classNames(clss.CommentList, {}, [className])}>
            {comments?.length
                ? comments.map((comment) => (
                    <CommentCard key={comment.id} className={clss.comment} comment={comment} isLoading={isLoading} />))
                : <Text text={t('No comments')} />}
        </div>
    );
});
