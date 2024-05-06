import { memo } from 'react';
import { AppLink } from '../../../../shared/ui/appLink/AppLink';
import { RoutePath } from '../../../../shared/config/routerConfig/routerConfig';
import { Avatar } from '../../../../shared/ui/Avatar/Avatar';
import { Text, TextSize } from '../../../../shared/ui/Text/Text';
import { Skeleton } from '../../../../shared/ui/Skeleton/Skeleton';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import clss from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    if (isLoading) {
        return (
            <div className={classNames(clss.CommentCard, {}, [className, clss.loading])}>
                <div className={clss.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton height={16} width={100} className={clss.username} />
                </div>
                <Skeleton className={clss.text} width="100%" height={50} />
            </div>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <div className={classNames(clss.CommentCard, {}, [className])}>
            <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={clss.header}>
                {comment.user.avatar
                    ? <Avatar size={30} src={comment.user.avatar} />
                    : null }
                <Text className={clss.username} title={comment.user.username} />
            </AppLink>
            <Text className={clss.text} text={comment.text} />
        </div>
    );
});