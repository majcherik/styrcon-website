'use client';

import { useState } from 'react';
import { ScrollArea, Table } from '@mantine/core';
import cx from 'clsx';
import classes from './table-scroll-area.module.css';

interface TableColumn<T = any> {
  key: keyof T;
  label: string;
  className?: string;
}

interface TableScrollAreaProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  height?: number | string;
  minWidth?: number | string;
  className?: string;
}

export function TableScrollArea<T = any>({
  data,
  columns,
  height = 300,
  minWidth = 700,
  className,
}: TableScrollAreaProps<T>) {
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((item, index) => (
    <Table.Tr key={index} className="transition-colors duration-150">
      {columns.map((column) => {
        const value = item[column.key];
        
        // Custom rendering based on column key
        let cellContent = value;
        if (column.key === 'parameter') {
          cellContent = <span className="font-medium text-slate-900">{value}</span>;
        }
        
        return (
          <Table.Td 
            key={String(column.key)}
            className={cx(
              'px-6 py-4 text-sm',
              column.className,
              {
                [classes.valueCell]: column.key === 'value',
                [classes.unitCell]: column.key === 'unit',
                [classes.standardCell]: column.key === 'standard',
              }
            )}
          >
            {cellContent}
          </Table.Td>
        );
      })}
    </Table.Tr>
  ));

  return (
    <ScrollArea 
      h={height} 
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      className={className}
    >
      <Table miw={minWidth} className={classes.mantineTable}>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
            {columns.map((column) => (
              <Table.Th key={String(column.key)} className="px-6 py-4">
                {column.label}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}

// Export types for external use
export type { TableColumn, TableScrollAreaProps };