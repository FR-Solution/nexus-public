/*
 * Sonatype Nexus (TM) Open Source Version
 * Copyright (c) 2008-present Sonatype, Inc.
 * All rights reserved. Includes the third-party code listed at http://links.sonatype.com/products/nexus/oss/attributions.
 *
 * This program and the accompanying materials are made available under the terms of the Eclipse Public License Version 1.0,
 * which accompanies this distribution and is available at http://www.eclipse.org/legal/epl-v10.html.
 *
 * Sonatype Nexus (TM) Professional Version is available from Sonatype, Inc. "Sonatype" and "Sonatype Nexus" are trademarks
 * of Sonatype, Inc. Apache Maven is a trademark of the Apache Software Foundation. M2eclipse is a trademark of the
 * Eclipse Foundation. All other trademarks are the property of their respective owners.
 */
import React from 'react';

import {
  NxModal,
  NxH2,
  NxButton,
  NxCheckbox,
  NxPagination,
  NxTable,
  NxTableHead,
  NxTableRow,
  NxTableCell,
  NxTableBody,
  NxFilterInput,
  NxCounter,
  NxFooter
} from '@sonatype/react-shared-components';

import RoleSelectionMachine from './RoleSelectionMachine';
import { useMachine } from '@xstate/react';
import { createPortal } from 'react-dom';

export default function RolesSelectionModal({
  title,
  allRoles,
  onModalClose,
  selectedRoles,
  saveModal }) {
  const [state, send] = useMachine(RoleSelectionMachine, {
    context: {
      offsetPage: 0,
      data: allRoles.map(item => ({
        ...item,
        isSelected: selectedRoles.includes(item.id)
      })),
      selectedRoles: selectedRoles,
      tempSelectedRoles: selectedRoles,
      filteredData: allRoles,
      numberOfRoles: allRoles.length,
    },
    devTools: true
  });

  const { offsetPage, tempSelectedRoles, numberOfRoles, filteredData, filter: filterText } = state.context;

  const onRoleSelected = (role) => send({ type: 'SELECT_ROLE', role: role });
  const isRoleSelected = (role) => { return tempSelectedRoles.includes(role) };
  const confirmModal = () => {
    onModalClose();
    send({ type: 'ON_CONFIRM' });
    saveModal(tempSelectedRoles);
  }

  const filter = (value) => send({ type: 'FILTER', filter: value });

  const rowsPerPage = 10;
  const pages = Math.ceil(numberOfRoles / rowsPerPage);
  const changePage = (event) => send({ type: 'CHANGE_PAGE', offsetPage: event });
  const lowerBound = offsetPage * rowsPerPage;
  const upperBound = lowerBound + rowsPerPage;

  const counterClass = tempSelectedRoles.length > 0 ? "nx-counter--active nx-pull-right" : "nx-counter nx-pull-right"

  return (<>
    {createPortal(
      <NxModal variant="wide" onCancel={onModalClose}>
        <header className="nx-modal-header">
          <NxH2 className="nx-h2" id="modal-header-text">{title} Selection</NxH2>
        </header>
        <div>
          <NxFilterInput className="nx-modal__filter"
            placeholder="Filter"
            value={filterText}
            onChange={filter} />
        </div>
        <div className="nx-modal-content">
          <NxTable className='modal-table'>
            <NxTableHead>
              <NxTableRow>
                <NxTableCell>Select</NxTableCell>
                <NxTableCell>Name</NxTableCell>
                <NxTableCell>Description</NxTableCell>
              </NxTableRow>
              <NxTableRow className='counter-row'>
                <NxTableCell></NxTableCell>
                <NxTableCell></NxTableCell>
                <NxTableCell className='counter-cell'>
                  <NxCounter className={counterClass}>{tempSelectedRoles.length} Selected</NxCounter>
                </NxTableCell>
              </NxTableRow>
            </NxTableHead>

            <NxTableBody emptyMessage="No roles available">
              {filteredData.sort((a, b) => Number(b.isSelected) - Number(a.isSelected)
                || a.name.localeCompare(b.name)).slice(lowerBound, upperBound).map((role) => (
                  <NxTableRow key={role.id}>
                    <NxTableCell>
                      <NxCheckbox
                        onChange={() => onRoleSelected(role)}
                        isChecked={isRoleSelected(role.id)}>
                      </NxCheckbox>
                    </NxTableCell>
                    <NxTableCell>{role.name}</NxTableCell>
                    <NxTableCell>{role.description}</NxTableCell>
                  </NxTableRow>))}
            </NxTableBody>
          </NxTable>

          <div className='modal-pagination'>
            <NxPagination
              onChange={changePage}
              pageCount={pages > 0 ? pages : 1}
              currentPage={offsetPage}
            />
          </div>
        </div>

        <NxFooter className="nx-footer-modal">
          <div className="nx-btn-bar">
            <NxButton onClick={onModalClose}>Cancel</NxButton>
            <NxButton variant="primary" onClick={confirmModal}>Confirm</NxButton>
          </div>
        </NxFooter>
      </NxModal>,
      document.body
    )}</>);
}
