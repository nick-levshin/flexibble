import { UserProfile } from '@/common.types';
import ProfileDetails from '@/components/ProfileDetails';
import { getUserProjects } from '@/lib/actions';
import { FC } from 'react';

interface ProfilePageProps {
  params: {
    id: string;
  };
}

const ProfilePage: FC<ProfilePageProps> = async ({ params: { id } }) => {
  const result = (await getUserProjects(id, 10)) as {
    user: UserProfile;
  };

  if (!result?.user) {
    return <p className="no-result-text">Failed to fetch user info</p>;
  }

  return <ProfileDetails user={result?.user} />;
};

export default ProfilePage;
