import React from 'react';
import { Avatar, AvatarProps } from './avatar';
import { cx } from '@/utils/cx';

export interface AvatarLabelGroupProps extends Omit<AvatarProps, 'alt'> {
  title: string;
  subtitle?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  className?: string;
}

const statusClasses = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
};

export const AvatarLabelGroup: React.FC<AvatarLabelGroupProps> = ({
  title,
  subtitle,
  status,
  className,
  ...avatarProps
}) => {
  return (
    <div className={cx('flex items-center gap-3', className)}>
      <div className="relative">
        <Avatar alt={title} {...avatarProps} />
        {status && (
          <div
            className={cx(
              'absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white',
              statusClasses[status]
            )}
          />
        )}
      </div>
      <div className="flex flex-col min-w-0">
        <div className="text-sm font-medium text-gray-900 truncate">
          {title}
        </div>
        {subtitle && (
          <div className="text-sm text-gray-600 truncate">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};