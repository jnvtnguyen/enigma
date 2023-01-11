import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import WorkspaceLayout from '@/containers/Workspace/WorkspaceLayout';
import { User, WorkspaceGroup } from '@/types';
import { httpRequest } from '@/util/http-request';
import urls from '@/containers/Workspace/Groups/urls';
import { getCurrentWorkspace } from '@/selectors/workspace';
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem';
import MemberTable from './MemberTable';
import styles from './styles.module.scss';

const Group: React.FC = () => {
  const { t } = useTranslation();

  const { groupName } = useParams();

  const [group, setGroup] = useState<WorkspaceGroup>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>(null);

  const [members, setMembers] = useState<User[]>([]);
  const [membersLoading, setMembersLoading] = useState<boolean>(false);
  const [membersError, setMembersError] = useState<string>(null);

  const workspace = useSelector(getCurrentWorkspace);

  const getGroup = async (): Promise<WorkspaceGroup> => {
    const response = await httpRequest<any>().get(urls.api.group(workspace.key, groupName));
    const { group } = response;

    return group;
  };

  const getMembers = async (): Promise<User[]> => {
    const response = await httpRequest<any>().get(urls.api.members(workspace.key, groupName));
    const { members } = response;

    return members;
  };

  useEffect(() => {
    setLoading(true);
    setMembersLoading(true);
    const fetchGroup = async () => {
      try {
        const group = await getGroup();
        setGroup(group);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchMembers = async () => {
      try {
        const members = await getMembers();
        setMembers(members);
        setMembersLoading(false);
      } catch (error) {
        console.error(error);
        setMembersError(error.message);
        setMembersLoading(false);
      }
    };

    fetchGroup();
    fetchMembers();
  }, []);

  if (!group) return;

  return (
    <React.Fragment>
      <WorkspaceLayout
        header={group.name}
        workspace={workspace}
        title={group.name}
        breadcrumbs={<BreadcrumbItem text={t('User Groups')} href={`/${workspace.key}/groups`} />}
      >
        <div className={styles.content}>
          <MemberTable loading={membersLoading} error={membersError} members={members} />
        </div>
      </WorkspaceLayout>
    </React.Fragment>
  );
};

export default Group;
