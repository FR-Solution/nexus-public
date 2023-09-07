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
import {useMachine} from '@xstate/react';
import classnames from 'classnames';
import {
  CheckboxControlledWrapper,
  ContentBody,
  ExtJS,
  FormUtils,
  Page,
  PageHeader,
  PageTitle,
} from '@sonatype/nexus-ui-plugin';

import {
  NxInfoAlert,
  NxH3,
  NxButton,
  NxFontAwesomeIcon,
  NxFormSelect,
  NxStatefulForm,
  NxH2,
  NxDivider,
  NxP,
  NxFormGroup,
  NxTile,
  NxTextInput,
} from '@sonatype/react-shared-components';
import {isReleaseType} from './CleanupPoliciesHelper';

import CleanupPoliciesFormMachine from './CleanupPoliciesFormMachine';
import CleanupPoliciesPreview from './CleanupPoliciesPreview';
import CleanupPoliciesDryRun from './CleanupPoliciesDryRun';
import CleanupPoliciesNxFormGroup from './CleanupPoliciesNxFormGroup';

import UIStrings from '../../../../constants/UIStrings';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

import './CleanupPolicies.scss';
import {isEmpty} from 'ramda';

const {CLEANUP_POLICIES: LABELS} = UIStrings;

export default function CleanupPoliciesForm({itemId, onDone}) {
  const [state, send] = useMachine(CleanupPoliciesFormMachine, {
    context: {
      pristineData: {
        name: itemId,
      },
    },

    actions: {
      onSaveSuccess: onDone,
      onDeleteSuccess: onDone,
    },

    devTools: true,
  });

  const {
    pristineData,
    data,
    loadError,
    criteriaByFormat,
    criteriaLastDownloadedEnabled,
    criteriaLastBlobUpdatedEnabled,
    criteriaAssetRegexEnabled,
    exclusionCriteriaEnabled,
  } = state.context;
  const isEdit = Boolean(itemId);
  const isLoading = state.matches('loading');
  const hasData = !isEmpty(data);
  const isPostgresEnabled = ExtJS.state().getValue('datastore.isPostgresql');
  const isPreviewEnabled =
    ExtJS.state().getValue('nexus.datastore.enabled') &&
    ExtJS.state().getValue('nexus.cleanup.preview.enabled');
  const isMavenRetainNEnabled = ExtJS.state().getValue(
    'nexus.cleanup.mavenRetain'
  );
  const isMaven = data.format === 'maven2';
  const showRetainN = isMavenRetainNEnabled && isPostgresEnabled && isMaven;
  const sortByOptions = Object.values(LABELS.EXCLUSION_CRITERIA.SORT_BY);
  const sortByCurrentOption = sortByOptions.find(
    (item) => item.format === data.format
  );
  const suffixRetainN = `${LABELS.EXCLUSION_CRITERIA.SUFFIX} ${sortByCurrentOption?.label}`;

  function setCriteriaLastBlobUpdatedEnabled(checked) {
    send({type: 'SET_CRITERIA_LAST_BLOB_UPDATED_ENABLED', checked});
  }

  function setCriteriaLastDownloadedEnabled(checked) {
    send({type: 'SET_CRITERIA_LAST_DOWNLOADED_ENABLED', checked});
  }

  function setCriteriaAssetRegexEnabled(checked) {
    send({type: 'SET_CRITERIA_ASSET_REGEX_ENABLED', checked});
  }

  function setExclusionCriteriaEnabled(checked) {
    send({type: 'SET_EXCLUSION_CRITERIA_ENABLED', checked});
  }

  function confirmDelete() {
    send({type: 'CONFIRM_DELETE'});
  }

  function isAnyFieldApplicable() {
    return (
      isFieldApplicable('lastBlobUpdated') ||
      isFieldApplicable('lastDownloaded') ||
      isFieldApplicable('isPrerelease') ||
      isFieldApplicable('regex')
    );
  }

  function isFieldApplicable(fieldId) {
    return criteriaByFormat?.some(
      ({id, availableCriteria}) =>
        id === data.format && availableCriteria.includes(fieldId)
    );
  }

  function setReleaseType(event) {
    send({type: 'UPDATE_RELEASE_TYPE', value: event.target.value});
  }

  return (
    <Page className="nxrm-cleanup-policies">
      <PageHeader>
        <PageTitle text={isEdit ? LABELS.EDIT_TITLE : LABELS.CREATE_TITLE} />
      </PageHeader>
      <ContentBody>
        <NxTile className="nxrm-cleanup-policies-form">
          <NxH2>{LABELS.SUB_TITLE}</NxH2>
          <NxP>{LABELS.DESCRIPTION}</NxP>
          <NxStatefulForm
            {...FormUtils.formProps(state, send)}
            onCancel={onDone}
            additionalFooterBtns={
              itemId && (
                <NxButton
                  type="button"
                  variant="tertiary"
                  onClick={confirmDelete}
                >
                  <NxFontAwesomeIcon icon={faTrash} />
                  <span>{UIStrings.SETTINGS.DELETE_BUTTON_LABEL}</span>
                </NxButton>
              )
            }
          >
            {hasData && (
              <>
                <NxFormGroup
                  label={LABELS.NAME_LABEL}
                  sublabel={LABELS.NAME_DESCRIPTION}
                  isRequired
                >
                  <NxTextInput
                    {...FormUtils.fieldProps('name', state)}
                    disabled={pristineData.name}
                    onChange={FormUtils.handleUpdate('name', send)}
                    className="nx-text-input--long"
                  />
                </NxFormGroup>
                <NxFormGroup
                  label={LABELS.FORMAT_LABEL}
                  sublabel={LABELS.FORMAT_DESCRIPTION}
                  isRequired
                >
                  <NxFormSelect
                    {...FormUtils.fieldProps('format', state)}
                    onChange={FormUtils.handleUpdate('format', send)}
                  >
                    <option value="">{LABELS.FORMAT_SELECT}</option>
                    {criteriaByFormat?.map((formatCriteria) => (
                      <option key={formatCriteria.id} value={formatCriteria.id}>
                        {formatCriteria.name}
                      </option>
                    ))}
                  </NxFormSelect>
                </NxFormGroup>
                <NxFormGroup label={LABELS.DESCRIPTION_LABEL}>
                  <NxTextInput
                    {...FormUtils.fieldProps('notes', state)}
                    onChange={FormUtils.handleUpdate('notes', send)}
                    className="nx-text-input--long"
                    type="textarea"
                  />
                </NxFormGroup>
                {isAnyFieldApplicable() && (
                  <>
                    <NxH2>{LABELS.CRITERIA_LABEL}</NxH2>
                    <NxP>{LABELS.CRITERIA_DESCRIPTION}</NxP>
                    <NxDivider />
                    {isFieldApplicable('isPrerelease') && (
                      <NxFormGroup
                        label={LABELS.RELEASE_TYPE_LABEL}
                        sublabel={LABELS.RELEASE_TYPE_SELECT}
                        isRequired
                      >
                        <NxFormSelect
                          {...FormUtils.fieldProps(
                            'criteriaReleaseType',
                            state
                          )}
                          onChange={setReleaseType}
                          validatable
                          className="nx-form-select--long"
                        >
                          {Object.keys(LABELS.RELEASE_TYPE).map((type) => {
                            const item = LABELS.RELEASE_TYPE[type];
                            return (
                              <option key={item.id} value={item.id}>
                                {item.label}
                              </option>
                            );
                          })}
                        </NxFormSelect>
                      </NxFormGroup>
                    )}
                    {isFieldApplicable('lastBlobUpdated') && (
                      <CheckboxControlledWrapper
                        isChecked={Boolean(criteriaLastBlobUpdatedEnabled)}
                        onChange={setCriteriaLastBlobUpdatedEnabled}
                        id="criteria-last-blob-updated-group"
                        title={LABELS.LAST_UPDATED_CHECKBOX_TITLE(
                          criteriaLastBlobUpdatedEnabled
                        )}
                      >
                        <CleanupPoliciesNxFormGroup
                          label={LABELS.LAST_UPDATED_LABEL}
                          isRequired={criteriaLastBlobUpdatedEnabled}
                          prefix={LABELS.LAST_UPDATED_PREFIX}
                          suffix={LABELS.LAST_UPDATED_SUFFIX}
                        >
                          <NxTextInput
                            {...FormUtils.fieldProps(
                              'criteriaLastBlobUpdated',
                              state
                            )}
                            onChange={FormUtils.handleUpdate(
                              'criteriaLastBlobUpdated',
                              send
                            )}
                            disabled={!criteriaLastBlobUpdatedEnabled}
                            className="nx-text-input--short"
                          />
                        </CleanupPoliciesNxFormGroup>
                      </CheckboxControlledWrapper>
                    )}
                    {isFieldApplicable('lastDownloaded') && (
                      <CheckboxControlledWrapper
                        isChecked={Boolean(criteriaLastDownloadedEnabled)}
                        onChange={setCriteriaLastDownloadedEnabled}
                        id="criteria-last-downloaded-group"
                        title={LABELS.LAST_DOWNLOADED_CHECKBOX_TITLE(
                          criteriaLastDownloadedEnabled
                        )}
                      >
                        <CleanupPoliciesNxFormGroup
                          label={LABELS.LAST_DOWNLOADED_LABEL}
                          isRequired={criteriaLastDownloadedEnabled}
                          prefix={LABELS.LAST_DOWNLOADED_PREFIX}
                          suffix={LABELS.LAST_DOWNLOADED_SUFFIX}
                        >
                          <NxTextInput
                            {...FormUtils.fieldProps(
                              'criteriaLastDownloaded',
                              state
                            )}
                            onChange={FormUtils.handleUpdate(
                              'criteriaLastDownloaded',
                              send
                            )}
                            disabled={!criteriaLastDownloadedEnabled}
                            className="nx-text-input--short"
                          />
                        </CleanupPoliciesNxFormGroup>
                      </CheckboxControlledWrapper>
                    )}
                    {isFieldApplicable('regex') && (
                      <CheckboxControlledWrapper
                        isChecked={Boolean(criteriaAssetRegexEnabled)}
                        onChange={setCriteriaAssetRegexEnabled}
                        id="criteria-asset-name-group"
                        title={LABELS.ASSET_NAME_CHECKBOX_TITLE(
                          criteriaAssetRegexEnabled
                        )}
                      >
                        <NxFormGroup
                          label={LABELS.ASSET_NAME_LABEL}
                          sublabel={LABELS.ASSET_NAME_DESCRIPTION}
                          isRequired={criteriaAssetRegexEnabled}
                        >
                          <NxTextInput
                            {...FormUtils.fieldProps(
                              'criteriaAssetRegex',
                              state
                            )}
                            onChange={FormUtils.handleUpdate(
                              'criteriaAssetRegex',
                              send
                            )}
                            disabled={!criteriaAssetRegexEnabled}
                            className="nx-text-input--long"
                          />
                        </NxFormGroup>
                      </CheckboxControlledWrapper>
                    )}
                    {showRetainN && (
                      <>
                        <NxH3>{LABELS.EXCLUSION_CRITERIA.LABEL}</NxH3>
                        {!isReleaseType(data.criteriaReleaseType) && (
                          <NxInfoAlert>
                            {LABELS.EXCLUSION_CRITERIA.ALERT}
                          </NxInfoAlert>
                        )}
                        <CheckboxControlledWrapper
                          isChecked={Boolean(exclusionCriteriaEnabled)}
                          title={LABELS.VERSION_CHECKBOX_TITLE(
                            exclusionCriteriaEnabled
                          )}
                          onChange={setExclusionCriteriaEnabled}
                          id="criteria-version"
                          disabled={!isReleaseType(data.criteriaReleaseType)}
                        >
                          <CleanupPoliciesNxFormGroup
                            label={LABELS.EXCLUSION_CRITERIA.VERSION_LABEL}
                            isRequired={criteriaLastBlobUpdatedEnabled}
                            prefix={LABELS.EXCLUSION_CRITERIA.PREFIX}
                            suffix={suffixRetainN}
                          >
                            <NxTextInput
                              className="nx-text-input--short"
                              disabled={!exclusionCriteriaEnabled}
                              {...FormUtils.fieldProps('retain', state)}
                              onChange={FormUtils.handleUpdate('retain', send)}
                            />
                          </CleanupPoliciesNxFormGroup>
                        </CheckboxControlledWrapper>
                      </>
                    )}
                    {isPreviewEnabled && (
                      <CleanupPoliciesDryRun policyData={data} />
                    )}
                  </>
                )}
              </>
            )}
          </NxStatefulForm>
        </NxTile>

        {!isLoading && !loadError && hasData && !isPreviewEnabled && (
          <CleanupPoliciesPreview policyData={data} />
        )}
      </ContentBody>
    </Page>
  );
}
