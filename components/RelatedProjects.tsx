import { UserProfile } from '@/common.types';
import { getUserProjects } from '@/lib/actions';
import { FC } from 'react';
import ProjectCard from './ProjectCard';
import Link from 'next/link';
import Image from 'next/image';

interface RelatedProjectsProps {
  userId: string;
  projectId: string;
}

const RelatedProjects: FC<RelatedProjectsProps> = async ({
  userId,
  projectId,
}) => {
  const result = (await getUserProjects(userId)) as { user: UserProfile };

  const filteredProjects = result?.user?.projects?.edges?.filter(
    ({ node }) => node?.id !== projectId
  );

  if (filteredProjects?.length === 0) return null;

  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <p className="text-base font-bold">More by {result?.user?.name}</p>
        <Link
          href={`/profile/${result?.user?.id}`}
          className="text-primary-purple text-base"
        >
          View All
        </Link>
      </div>

      <div className="related_projects-grid">
        {filteredProjects?.map(({ node }) => (
          <div className="flexCenter related_project-card drop-shadow-card">
            <Link
              href={`/project/${node?.id}`}
              className="flexCenter group relative w-full h-full"
            >
              <Image
                src={node?.image}
                width={414}
                height={314}
                alt={node?.title}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="opacity-0 group-hover:opacity-100 transition-opacity related_project-card_title">
                <p className="w-full">{node?.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
