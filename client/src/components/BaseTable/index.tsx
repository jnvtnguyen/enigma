import React from 'react';

import styles from './styles.module.scss';

type Props = {
  children: (row: any, index: number) => JSX.Element;
  error: boolean;
  loading: boolean;
  renderHeaders?: (() => JSX.Element) | null;
  renderEmptyState: () => JSX.Element;
  rows: any[];
};

const BaseTable: React.FC<Props> = ({
  children,
  error,
  loading,
  renderHeaders,
  renderEmptyState,
  rows
}) => {
  const renderTableRows = () => {
    return <React.Fragment>{rows.map(children)}</React.Fragment>;
  };

  const renderTable = () => {
    return (
      <table className={styles.table}>
        {renderHeaders && <thead className={styles.thead}>{renderHeaders()}</thead>}
        <tbody className={styles.tbody}>
          {!loading && !rows.length ? renderEmptyState() : renderTableRows()}
        </tbody>
      </table>
    );
  };

  return <div className={styles.container}>{renderTable()}</div>;
};

export default BaseTable;
