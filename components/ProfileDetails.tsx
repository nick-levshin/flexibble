import { UserProfile } from '@/common.types';
import { FC } from 'react';
import ProjectCard from './ProjectCard';
import Image from 'next/image';
import Button from './Button';
import Link from 'next/link';

interface ProfileDetailsProps {
  user: UserProfile;
}

const ProfileDetails: FC<ProfileDetailsProps> = ({ user }) => {
  return (
    <section className="flexCenter flex-col max-w-10xl w-full mx-auto paddings">
      <section className="flexBetween max-lg:flex-col gap-10 w-full">
        <div className="flex items-start flex-col w-full">
          <Image
            src={user?.avatarUrl}
            width={100}
            height={100}
            className="rounded-full"
            alt={user?.name}
          />
          <p className="text-4xl font-bold mt-10">{user?.name}</p>
          <p className="md:text-2xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">
            {user?.description || 'No description yet'}
          </p>

          <div className="flex mt-8 gap-5 w-full flex-wrap">
            <Button
              type="button"
              title="Follow"
              bgColor="bg-light-white-400 !w-max"
              textColor="text-black-100"
            />
            <Link href={`mailto:${user?.email}`}>
              <Button type="button" title="Hire Me" leftIcon="/email.svg" />
            </Link>
          </div>
        </div>

        {user?.projects?.edges?.length > 0 ? (
          <Image
            src={user?.projects?.edges[0]?.node?.image}
            alt={user?.projects?.edges[0]?.node?.title}
            width={739}
            height={554}
            className="rounded-xl object-contain"
          />
        ) : (
          <Image
            src="/profile-post.png"
            width={739}
            height={554}
            className="rounded-xl object-contain"
            alt="Project Image"
          />
        )}
      </section>

      <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
        <p className="w-full text-left text-lg font-semibold">Recent Works</p>

        <div className="profile_projects">
          {user?.projects?.edges?.map(({ node }) => (
            <ProjectCard
              key={node?.id}
              id={node?.id}
              image={node?.image}
              title={node?.title}
              name={user?.name}
              avatarUrl={user?.avatarUrl}
              userId={user?.id}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default ProfileDetails;
