import { memo } from 'react';
import { AppLink } from '../../../../shared/ui/appLink/AppLink';
import { Avatar } from '../../../../shared/ui/Avatar/Avatar';
import { Text } from '../../../../shared/ui/Text/Text';
import { Skeleton } from '../../../../shared/ui/Skeleton/Skeleton';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import clss from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';
import { VStack } from '../../../../shared/ui/Stack';
import { getRouteProfile } from '../../../../shared/const/router';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    if (isLoading) {
        return (
            <VStack gap="8" max className={classNames(clss.CommentCard, {}, [className, clss.loading])}>
                <div className={clss.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton height={16} width={100} className={clss.username} />
                </div>
                <Skeleton className={clss.text} width="100%" height={50} />
            </VStack>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <VStack gap="8" max className={classNames(clss.CommentCard, {}, [className])}>
            <AppLink to={getRouteProfile(comment.user.id)} className={clss.header}>
                {comment.user.avatar
                    ? <Avatar size={30} src={comment.user.avatar} />
                    : null }
                <Text className={clss.username} title={comment.user.username} />
            </AppLink>
            <Text className={clss.text} text={comment.text} />
        </VStack>
    );
});
